import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./Accordion.css";

export default function Accordion({
  title,
  id,
  content,
  isActive,
    toggleSection,
    handleShowOfficialTranslations
}) {

    useEffect(() => {
        if (isActive("official-translation")) {
          handleShowOfficialTranslations();
        }
        if (isActive("feedback")) {
          handleGetFeedback();
        }
      }, [isActive("official-translation"), isActive("feedback")]);

  function test(id) {
    console.log("id: ", id);
    if (isActive(id)) {
      console.log("is active");
    }
    else {
      console.log("is not active");
    }
  }

  return (
    <div className="accordion">
      <p className="heading" onClick={() => toggleSection("official-translation")}>
        <span>
          {isActive({ id }) ? (
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
        {title}
      </p>
      {isActive({ id }) && (
        <div
          className={id}
          dangerouslySetInnerHTML={{ __html: { content } }}
        />
      )}
    </div>
  );
}
