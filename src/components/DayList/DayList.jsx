import React, { useMemo } from "react";
import { Tooltip } from "react-tooltip";
import * as days from "../../days.json";

export default function DayList({ setCurrentDay, setChecked, maxDate }) {
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

  // This isn't pretty, but it avoids state issues with checked being false before currentDay is set
  async function changeDay(d) {
    setCurrentDay(d);
  }
  async function changeChecked() {
    setChecked(false);
  }
  async function handleClick(d) {
    await changeDay(d);
    await changeChecked();
  }

  return <div className="day-list">{dayList}</div>;
}
