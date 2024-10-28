import { useEffect, useState, useRef } from "react";
import * as translationsAPI from "../../utilities/translations-api";
import { getOfficialTranslations } from "../../utilities/translations-api";
import DOMPurify from 'dompurify';

export default function TranslationPanel({
  dayData,
  user,
  currentDay,
  languageIsHebrew,
  setLanguageIsHebrew,
  setDone,
  feedbackHtml,
  setFeedbackHtml,
}) {
  /* STATES AND VARIABLES */
  const [translation, setTranslation] = useState("");
  const [officialTranslation, setOfficialTranslation] = useState("");

  const englishCitation = dayData.citation.english;
  let hebrewCitation = "";
  if (languageIsHebrew) hebrewCitation = dayData.citation.hebrew;
  const paraBibleLink = `https://parabible.com/${
    languageIsHebrew ? hebrewCitation : englishCitation
  }`;
  const language = languageIsHebrew ? "hebrew" : "greek";

  // /* USE EFFECTS */
  // When day changes, either load any existing translations or clear the form
  useEffect(() => {
    try {
      translationsAPI.getDayTranslations(currentDay).then((translations) => {
        if (translations && translations[language])
          setTranslation(translations[language]);
        else setTranslation("");
        setOfficialTranslation("");
      });
    } catch (err) {
      console.log("Error in useEffect: ", err);
    }
  }, [language, currentDay, languageIsHebrew]);

  const textareaRef = useRef(null);

  /* HANDLE FUNCTIONS */
  // Get official NET translations from Parabible API
  async function handleShowOfficialTranslations() {
    try {
      if (!dayData) return;
      const response = await getOfficialTranslations(englishCitation);
      const cleanResponse = DOMPurify.sanitize(response);
      setOfficialTranslation(cleanResponse || "");
    } catch (err) {
      console.log("Error in handleShowOfficialTranslations:", err);
    }
  }

  function handleInput() {
    // Reset height to allow shrinkage on text deletion
    textareaRef.current.style.height = 'auto';
    // Set height to match the scroll height
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  // Saves trnslation to database
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const dayTranslation = {
        [language]: translation,
        day: currentDay,
        user: user._id,
      };
      const results = await translationsAPI.createTranslations(dayTranslation);
      if (results[language]) setTranslation(results[language]);
      else setTranslation("");
    } catch (err) {
      console.log("Error in handleSubmit: ", err);
    }
  }

  async function handleLanguageSwitch(evt) {
    evt.preventDefault();
    try {
      await handleSubmit(evt);
      setFeedbackHtml("");
      setLanguageIsHebrew(!languageIsHebrew);
    } catch (err) {
      console.log("Error in handleLanguageSwitch: ", err);
    }
  }

  async function handleDone(evt) {
    await handleSubmit(evt);
    setFeedbackHtml("");
    setDone(true);
  }

  // Gets feedback on translation from OpenAI
  async function handleGetFeedback() {
    try {
      const payload = [translation, englishCitation];
      const response = await translationsAPI.getTranslationFeedback(payload);
      const cleanResponse = DOMPurify.sanitize(response);
      setFeedbackHtml(cleanResponse || "");
    } catch (err) {
      console.log("Error in handleGetFeedback: ", err);
    }
  }

  return (
    <div>
      {/* The verse and text */}
      <div className="verse-text">
        <p className={language}>{dayData.text}</p>
        <p className={`${language}-verse`}>
          {languageIsHebrew ? `${hebrewCitation} [Heb.]` : englishCitation}
        </p>
      </div>

      {/* User's translation */}
      <div className="form-container">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="full-width-buttons"
        >
          <label className="heading" htmlFor="translation">
            Your Translation
          </label>
          <textarea
            name="translation"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            {...props}
            ref={textareaRef}
            onInput={handleInput}
            rows={1}  // Optional: Start with a single row
            style={{ overflow: 'hidden', resize: 'none' }}
            placeholder="Enter your translation here..."
          />

          {/* Official NET Translation */}
          <div
            className="official-translation"
            dangerouslySetInnerHTML={{ __html: officialTranslation }}
          />

          {/* Translation Feedback */}
          <div
            className="feedback-container"
            dangerouslySetInnerHTML={{ __html: feedbackHtml }}
          />

          {/* Buttons */}
          <div className="full-width-buttons other-buttons">
            <button
              className="officialTranslation"
              onClick={() => handleShowOfficialTranslations()}
            >
              Show NET translation
            </button>
            <a
              className="paraBibleLink"
              href={paraBibleLink}
              target="_blank"
              rel="noreferrer"
            >
              <button>Get language help at parabible</button>
            </a>
            <button
              className="translationFeedback"
              onClick={() => handleGetFeedback()}
            >
              Get Feedback on Your Translation
            </button>
          </div>
          <div className="progressButtons full-width-buttons other-buttons">
            <button onClick={handleLanguageSwitch}>
              {languageIsHebrew ? "On to Greek" : "Back to Hebrew"}
            </button>
            {!languageIsHebrew && (
              <button onClick={handleDone}>Done for the Day!</button>
            )}
          </div>

          <button type="submit" id="save">
            save
          </button>
        </form>
      </div>
    </div>
  );
}
