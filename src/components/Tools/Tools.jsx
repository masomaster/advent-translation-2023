import {  } from "react";
import * as translationsAPI from "../../utilities/translations-api";
import DOMPurify from "dompurify";
import ToolsButtons from "../ToolsButtons/ToolsButtons.jsx";

export default function Tools({
  dayData,
  englishCitation,
  feedbackHtml,
  setFeedbackHtml,
  paraBibleLink,
  translation,
  officialTranslation,
  setOfficialTranslation
}) {

  // Get official NET translations from Parabible API
  async function handleShowOfficialTranslations() {
    try {
      if (!dayData) return;
      const response = await translationsAPI.getOfficialTranslations(englishCitation);
      const cleanResponse = DOMPurify.sanitize(response);
      setOfficialTranslation(cleanResponse || "");
    } catch (err) {
      console.log("Error in handleShowOfficialTranslations:", err);
    }
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
      <div
        className="official-translation"
        dangerouslySetInnerHTML={{ __html: officialTranslation }}
      />

      <div
        className="feedback-container"
        dangerouslySetInnerHTML={{ __html: feedbackHtml }}
      />

      <ToolsButtons
        handleShowOfficialTranslations={handleShowOfficialTranslations}
        handleGetFeedback={handleGetFeedback}
        paraBibleLink={paraBibleLink}
      />
    </div>
  );
}
