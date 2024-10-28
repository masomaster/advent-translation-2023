export default function SwitchLanguage({
  languageIsHebrew,
  setLanguageIsHebrew,
  setDone,
  handleSubmit,
  setFeedbackHtml,
}) {
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

  return (
    <div className="full-width-buttons other-buttons">
      <button onClick={handleLanguageSwitch}>
        {languageIsHebrew ? "On to Greek" : "Back to Hebrew"}
      </button>
      {!languageIsHebrew && (
        <button onClick={handleDone}>Done for the Day!</button>
      )}
    </div>
  );
}
