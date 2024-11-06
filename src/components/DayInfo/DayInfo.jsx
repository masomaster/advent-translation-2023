import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function DayInfo({
  numOfDays,
  maxDate,
  currentDay,
  handleDecrement,
}) {
  return (
    <div className="day-buttons">
      {currentDay !== 1 && (
        <div onClick={() => handleDecrement()}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span> previous day</span>
        </div>
      )}
      {currentDay !== numOfDays && currentDay < maxDate && (
        <div onClick={() => handleIncrement()}>
          <span>next day </span>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      )}
    </div>
  );
}
