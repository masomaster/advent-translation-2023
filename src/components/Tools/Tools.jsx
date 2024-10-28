import {  } from "react";
import * as translationsAPI from "../../utilities/translations-api";
import DOMPurify from "dompurify";
import ToolsButtons from "../ToolsButtons/ToolsButtons.jsx";
import Accordion from "../Accordion/Accordion.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

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
      <Accordion title={"Show NET Translation"} content={"Net translation here"} />
      <div
        className="official-translation"
        dangerouslySetInnerHTML={{ __html: officialTranslation }}
      />

      <Accordion title={"Get Feedback on Your Translation"} content={"Your feedback here"} />
      <div
        className="feedback-container"
        dangerouslySetInnerHTML={{ __html: feedbackHtml }}
      />

      <p className="heading paraBibleLink"><a         
        // className="paraBibleLink"
        href={paraBibleLink}
        target="_blank"
        rel="noreferrer">Get Language Help at Parabible <FontAwesomeIcon icon={faExternalLinkAlt} style={{ marginLeft: '5px' }} /></a></p>
      {/* <ToolsButtons
        handleShowOfficialTranslations={handleShowOfficialTranslations}
        handleGetFeedback={handleGetFeedback}
        paraBibleLink={paraBibleLink}
      /> */}
    </div>
  );
}
