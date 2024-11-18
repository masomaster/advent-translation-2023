import React, { useMemo } from "react";
import { Tooltip } from "react-tooltip";
import * as days from "../../days.json";

export default function DayList({ setCurrentDay, setChecked, maxDate, saveTranslation, setLanguageIsHebrew }) {
  const numOfDays = Object.keys(days).filter((key) => key !== "default").length;
  const dayList = useMemo(
    () =>
      Array.from({ length: Math.min(maxDate, numOfDays) }).map((_, i) => (
        <React.Fragment key={`d-${i}`}>
          <li
            className="day-list-entry"
            onClick={() => handleClick(i + 1)}
            data-tooltip-id={`t-${i}`}
            data-tooltip-html={`${days[i + 1].OT.citation.hebrew}<br />
            ${days[i + 1].NT.citation.english}`}
            data-tooltip-place="top"
          >
            Dec {i + 1}
          </li>
          <Tooltip id={`t-${i}`} />
        </React.Fragment>
      )),
    [maxDate, numOfDays, days, handleClick]
  );

  async function handleClick(d) {
    await saveTranslation();
    await setLanguageIsHebrew(true);
    await setCurrentDay(d);
    await setChecked(false);
  }

  return <div className="day-list">{dayList}</div>;
}
