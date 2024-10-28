export default function ToolsButtons({
  handleShowOfficialTranslations,
  handleGetFeedback,
  paraBibleLink,
}) {
  return (
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
  );
}
