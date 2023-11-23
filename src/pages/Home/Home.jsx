import { useState, useEffect } from "react";
import * as days from "../../days.json";
import TranslationPanel from "../../components/TranslationPanel/TranslationPanel";

export default function Home({
  user,
  currentDay,
  setCurrentDay,
  isProduction,
}) {
  const [languageIsHebrew, setLanguageIsHebrew] = useState(true);
  // Return verse info for the current day and language
  const dayData = languageIsHebrew ? days[currentDay].OT : days[currentDay].NT;
  const numOfDays = Object.keys(days).filter((key) => key !== "default").length;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [user, currentDay]);

  // Moves current day up or down and resets to Hebrew
  function handleIncrement() {
    if (currentDay < numOfDays) {
      setCurrentDay(currentDay + 1);
      setLanguageIsHebrew(true);
    }
  }
  function handleDecrement() {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      setLanguageIsHebrew(true);
    }
  }

  // If it's December 2023, don't allow the user to go past the current day.
  // If after that date, or not in production, allow user to see any day.
  function dontExceedDecDate() {
    let maxDate = 100;
    if (isProduction) {
      if (new Date().getMonth() === 11 && new Date().getFullYear === 2023) {
        maxDate = new Date().getDate();
      }
    }
    return maxDate;
  }

  return (
    <div id="home">
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
          isProduction={isProduction}
        />
        <div className="day-buttons">
          {currentDay !== 1 && (
            <button onClick={() => handleDecrement()}>previous day</button>
          )}
          {currentDay !== numOfDays && currentDay < dontExceedDecDate() && (
            <button onClick={() => handleIncrement()}>next day</button>
          )}
        </div>
      </div>
    </div>
  );
}
