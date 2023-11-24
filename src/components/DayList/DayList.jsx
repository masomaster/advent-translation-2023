import ReactHover, { Trigger, Hover } from "react-hover";
import * as days from "../../days.json";

export default function DayList({ setCurrentDay, setChecked, maxDate }) {
  const numOfDays = Object.keys(days).filter((key) => key !== "default").length;
  const hoverOptions = {
    followCursor: false,
    shiftX: 20,
    shiftY: 0,
  };

  const dayList = [];

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

  for (let i = 0; i < maxDate && i < numOfDays; i++) {
    dayList.push(
      <ReactHover options={hoverOptions} key={`react-hover-${i}`}>
        <Trigger type="trigger" key={`trigger-${i}`}>
          <li
            className="day-list-entry"
            onClick={() => handleClick(i + 1)}
            key={`day-${i}`}
          >
            Dec {i + 1}
          </li>
        </Trigger>
        <Hover type="hover" key={`hover-${i}`}>
          <div className="hover-box">
            <div className="hover-text" key={`hover-div-${i}`}>
              {days[i + 1].OT.citation.hebrew}
              <br />
              {days[i + 1].NT.citation.english}
            </div>
          </div>
        </Hover>
      </ReactHover>
    );
  }

  return <div className="day-list">{dayList}</div>;
}
