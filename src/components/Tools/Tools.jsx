import { useState, useEffect } from "react";
import * as translationsAPI from "../../utilities/translations-api";
import DOMPurify from "dompurify";
import Accordion from "../Accordion/Accordion.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Tools({
  dayData,
  englishCitation,
  feedbackHtml,
  setFeedbackHtml,
  paraBibleLink,
  translation,
  officialTranslation,
  setOfficialTranslation,
  activeSections,
  setActiveSections
}) {

  const isActive = (index) => activeSections.includes(index);
  const toggleSection = (index) => {
    setActiveSections((prev) =>
      prev.includes(index)
        ? prev.filter((sectionIndex) => sectionIndex !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    if (isActive("official-translation")) {
      handleShowOfficialTranslations();
    }
    if (isActive("feedback")) {
      handleGetFeedback();
    }
  }, [isActive("official-translation"), isActive("feedback")]);

  // Get official NET translations from Parabible API
  async function handleShowOfficialTranslations() {
    try {
      if (!dayData) return;
      const response = await translationsAPI.getOfficialTranslations(
        englishCitation
      );
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
      <div className="accordion">
        <p className="heading" onClick={() => toggleSection("official-translation")}>
          <span>
            {isActive("official-translation") ? (
              <FontAwesomeIcon
                icon={faChevronUp}
                style={{ marginRight: "10px" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                style={{ marginRight: "10px" }}
              />
            )}
          </span>
          Show NET Translation
        </p>
        {isActive("official-translation") && (
          <div
            className="official-translation"
            dangerouslySetInnerHTML={{ __html: officialTranslation }}
          />
        )}
      </div>



      <div className="accordion">
        <p className="heading" onClick={() => toggleSection("feedback")}>
          <span>
            {isActive("feedback") ? (
              <FontAwesomeIcon
                icon={faChevronUp}
                style={{ marginRight: "10px" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                style={{ marginRight: "10px" }}
              />
            )}
          </span>
          Get Feedback on Your Translation
        </p>
        {isActive("feedback") && (
      <div
      className="feedback-container"
      dangerouslySetInnerHTML={{ __html: feedbackHtml }}
    />
        )}
      </div>


      {/* <Accordion
        title={"Get Feedback on Your Translation"}
        content={"Your feedback here"}
      />
      <div
        className="feedback-container"
        dangerouslySetInnerHTML={{ __html: feedbackHtml }}
      /> */}

      <p className="heading paraBibleLink">
        <a href={paraBibleLink} target="_blank" rel="noreferrer">
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            style={{ marginRight: "10px" }}
          />
          Get Language Help at Parabible{" "}
        </a>
      </p>
    </div>
  );
}
