import "./SwitchLanguage.css";

export default function SwitchLanguage({
  languageIsHebrew,
  setLanguageIsHebrew,
  setDone,
  handleSubmit,
  setFeedbackHtml,
  setActiveSections,
}) {
  async function handleLanguageSwitch(evt) {
    try {
      await handleSubmit(evt);
      setFeedbackHtml("");
      setActiveSections([]);
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

  return (
    <div className="toggle-panel">
      <div
        className={`toggle-option ${languageIsHebrew ? "selected" : ""}`}
        onClick={handleLanguageSwitch}
      >
        Hebrew
      </div>
      <div
        className={`toggle-option ${!languageIsHebrew ? "selected" : ""}`}
        onClick={handleLanguageSwitch}
      >
        Greek
      </div>
    </div>
  );
}
