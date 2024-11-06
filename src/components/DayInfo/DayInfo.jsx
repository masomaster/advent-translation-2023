import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SwitchLanguage from "../SwitchLanguage/SwitchLanguage";
import "./DayInfo.css";

export default function DayInfo({
  numOfDays,
  maxDate,
  currentDay,
  handleDecrement,
  handleIncrement,
  languageIsHebrew,
  setLanguageIsHebrew,
  setDone,
  handleSubmit,
  setFeedbackHtml,
  setActiveSections,
}) {
  return (
    <div className="day-info">
      <div className="center-button">
        <SwitchLanguage
          languageIsHebrew={languageIsHebrew}
          setLanguageIsHebrew={setLanguageIsHebrew}
          setDone={setDone}
          handleSubmit={handleSubmit}
          setFeedbackHtml={setFeedbackHtml}
          setActiveSections={setActiveSections}
        />
      </div>
      <div className="day-buttons">
        {currentDay !== 1 ? (
          <div className="left-button" onClick={() => handleDecrement()}>
            <FontAwesomeIcon icon={faArrowLeft} />
            {/* <span> previous day</span> */}
          </div>
        ) : (
          <div className="left-button"></div>
        )}

        <div className="date">
          <h4>December {currentDay}</h4>
        </div>
        {currentDay !== numOfDays && currentDay < maxDate ? (
          <div className="right-button" onClick={() => handleIncrement()}>
            {/* <span>next day </span> */}
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        ) : (
          <div className="right-button"></div>
        )}
      </div>
    </div>
  );
}
