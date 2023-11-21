import { useEffect, useState } from "react";
import * as translationsAPI from "../../utilities/translations-api";
import { getOfficialTranslations } from "../../utilities/translations-api";

export default function TranslationPanel({
  dayData,
  user,
  currentDay,
  languageIsHebrew,
  setLanguageIsHebrew,
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

  /* HANDLE FUNCTIONS */
  // Get official translations of Hebrew (this is definitely something that could be made DRY-er)
  async function handleShowOfficialTranslations() {
    try {
      if (!dayData) return;
      const officialTranslationResponse = await getOfficialTranslations(
        englishCitation
      );
      if (officialTranslationResponse) {
        setOfficialTranslation(officialTranslationResponse);
      } else {
        setOfficialTranslation("");
      }
    } catch (err) {
      console.log("Error in handleShowOfficialTranslations: ", err);
    }
  }

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
      setLanguageIsHebrew(!languageIsHebrew);
    } catch (err) {
      console.log("Error in handleLanguageSwitch: ", err);
    }
  }

  return (
    <div>
      <div className="verse-text">
        <p className={language}>{dayData.text}</p>
        <p className={`${language}-verse`}>
          {languageIsHebrew ? `${hebrewCitation} [Heb.]` : englishCitation}
        </p>
        <p>{officialTranslation} </p>
      </div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="translation">Your translation:</label>
          <textarea
            name="translation"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
          />
          <button type="submit" id="save">
            save
          </button>
        </form>
        <div className="officialTranslation">
          <button onClick={() => handleShowOfficialTranslations()}>
            Show NET translation
          </button>
        </div>
        <div className="paraBibleLink">
          <a href={paraBibleLink} target="_blank" rel="noreferrer">
            <button>Get language help at parabible</button>
          </a>
        </div>
        <div className="progressButtons">
          {languageIsHebrew ? (
            <button onClick={handleLanguageSwitch}>On to Greek</button>
          ) : (
            <div>
              <button onClick={handleLanguageSwitch}>Back to Hebrew</button>
              <button onSubmit={handleSubmit}>Done for the Day!</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
