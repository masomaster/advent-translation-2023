import { useState, useEffect } from "react";
import * as days from "../../days.json";
import TranslationPanel from "../../components/TranslationPanel/TranslationPanel";
import DoneForDay from "../../components/DoneForDay/DoneForDay";

export default function Home({ user, currentDay, setCurrentDay, maxDate }) {
  const [languageIsHebrew, setLanguageIsHebrew] = useState(true);
  // Return verse info for the current day and language
  const dayData = languageIsHebrew ? days[currentDay].OT : days[currentDay].NT;
  const numOfDays = Object.keys(days).filter((key) => key !== "default").length;
  const [feedbackHtml, setFeedbackHtml] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [user, currentDay]);

  // Moves current day up or down and resets to Hebrew
  function handleIncrement() {
    if (currentDay < numOfDays) {
      setCurrentDay(currentDay + 1);
      setLanguageIsHebrew(true);
      setFeedbackHtml("");
    }
  }
  function handleDecrement() {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      setLanguageIsHebrew(true);
      setFeedbackHtml("");
    }
  }

  return (
    <div id="home">
      {done ? (
        <DoneForDay />
      ) : (
        <>
          <div>
            <h4>December {currentDay}:</h4>
          </div>
          <div>
            <TranslationPanel
              user={user}
              currentDay={currentDay}
              languageIsHebrew={languageIsHebrew}
              setLanguageIsHebrew={setLanguageIsHebrew}
              dayData={dayData}
              setDone={setDone}
              feedbackHtml={feedbackHtml}
              setFeedbackHtml={setFeedbackHtml}
            />
            <div className="day-buttons">
              {currentDay !== 1 && (
                <button onClick={() => handleDecrement()}>previous day</button>
              )}
              {currentDay !== numOfDays && currentDay < maxDate && (
                <button onClick={() => handleIncrement()}>next day</button>
              )}
            </div>
          </div>
          <div className="footer">
            <div>
              <a
                href="http://eepurl.com/iFf576"
                target="_blank"
                rel="noreferrer"
              >
                Sign up for daily emails
              </a>
            </div>
            <div>
              Created with ♡ by{" "}
              <a
                href="https://masonlancaster.com/"
                target="_blank"
                rel="noreferrer"
              >
                Mason Lancaster
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
