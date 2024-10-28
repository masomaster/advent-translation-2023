import { useState } from "react";
import * as translationsAPI from "../../utilities/translations-api";
import UsersTranslation from "../UsersTranslation/UsersTranslation.jsx";
import Tools from "../Tools/Tools.jsx";
import SwitchLanguage from "../SwitchLanguage/SwitchLanguage.jsx";

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
  const language = languageIsHebrew ? "hebrew" : "greek";
  const paraBibleLink = `https://parabible.com/${
    languageIsHebrew ? hebrewCitation : englishCitation
  }`;

  /* HANDLE FUNCTIONS */
  // Saves translation to database
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

  return (
    <div>
      {/* The verse and text */}
      <div className="verse-text">
        <p className={language}>{dayData.text}</p>
        <p className={`${language}-verse`}>
          {languageIsHebrew ? `${hebrewCitation} [Heb.]` : englishCitation}
        </p>
      </div>

      <UsersTranslation
        user={user}
        currentDay={currentDay}
        language={language}
        languageIsHebrew={languageIsHebrew}
        translation={translation}
        setTranslation={setTranslation}
        setOfficialTranslation={setOfficialTranslation}
        handleSubmit={handleSubmit}
      />

      <Tools
        dayData={dayData}
        englishCitation={englishCitation}
        officialTranslation={officialTranslation}
        setOfficialTranslation={setOfficialTranslation}
        translation={translation}
        feedbackHtml={feedbackHtml}
        setFeedbackHtml={setFeedbackHtml}
        paraBibleLink={paraBibleLink}
      />

      <SwitchLanguage
        languageIsHebrew={languageIsHebrew}
        setLanguageIsHebrew={setLanguageIsHebrew}
        setDone={setDone}
        handleSubmit={handleSubmit}
        setFeedbackHtml={setFeedbackHtml}
      />
    </div>
  );
}
