import { useState } from "react";
import "./ToolsButtons.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function ToolsButtons({
  handleShowOfficialTranslations,
  handleGetFeedback,
  paraBibleLink,
}) {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfoPanel = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="full-width-buttons other-buttons">
      <button
        className="officialTranslation"
        onClick={() => handleShowOfficialTranslations()}
      >
        Show NET translation
      </button>

      <div>
      <a
        className="paraBibleLink"
        href={paraBibleLink}
        target="_blank"
        rel="noreferrer"
      >
        <button>Get language help at parabible</button>
      </a>
      </div>
      
      <div className="info-button">
        <button
          className="translationFeedback"
          onClick={() => handleGetFeedback()}
        >
          Get Feedback on Your Translation
        </button>
      <span onClick={toggleInfoPanel} title="More info">
        <FontAwesomeIcon icon={faInfoCircle} />
      </span>
      </div>
      {/* Info Panel */}
      {showInfo && (
        <div className="info-panel">
          We use OpenAI's ChatGPT to generate feedback striclty on word choice, grammar, and syntax. No personal data is shared or stored.
        </div>
      )}
    </div>
  );
}
