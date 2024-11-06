import './SwitchLanguage.css';

export default function SwitchLanguage({
  languageIsHebrew,
  setLanguageIsHebrew,
  setDone,
  handleSubmit,
  setFeedbackHtml,
  setActiveSections
}) {
  async function handleLanguageSwitch(evt) {
    // evt.preventDefault();
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
    // NOTE TO SELF: I WANT TO MAKE THIS A TOGGLE PANEL, WITH HEBREW/GREEK ON EITHER SIDE.
    // <div >
    //   <button className="language-btn" onClick={handleLanguageSwitch}>
    //     {languageIsHebrew ? "α" : "א"}
    //   </button>
    //   {!languageIsHebrew && (
    //     <button onClick={handleDone}>Done for the Day!</button>
    //   )}
    // </div>

    // <div className="full-width-buttons other-buttons">
    //   <button onClick={handleLanguageSwitch}>
    //     {languageIsHebrew ? "On to Greek" : "Back to Hebrew"}
    //   </button>
    //   {!languageIsHebrew && (
    //     <button onClick={handleDone}>Done for the Day!</button>
    //   )}
    // </div>
  );
}
