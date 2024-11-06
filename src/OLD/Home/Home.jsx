import { useState, useEffect } from "react";
import * as days from "../../days.json";
import TranslationPanel from "../../components/TranslationPanel/TranslationPanel";
import DoneForDay from "../../components/DoneForDay/DoneForDay";
import Footer from "../../components/HomePageComponents/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Home({ user, currentDay, setCurrentDay, maxDate }) {
  const [languageIsHebrew, setLanguageIsHebrew] = useState(true);
  // Return verse info for the current day and language
  const dayData = languageIsHebrew ? days[currentDay].OT : days[currentDay].NT;
  const numOfDays = Object.keys(days).filter((key) => key !== "default").length;
  const [feedbackHtml, setFeedbackHtml] = useState("");
  const [done, setDone] = useState(false);
  const [activeSections, setActiveSections] = useState([]);
  const isActive = (index) => activeSections.includes(index);
  const toggleSection = (index) =>{
    setActiveSections((prev) =>
      prev.includes(index)
        ? prev.filter((sectionIndex) => sectionIndex !== index)
        : [...prev, index]
    );
  };

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
      setActiveSections([]);
    }
  }
  function handleDecrement() {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      setLanguageIsHebrew(true);
      setFeedbackHtml("");
      setActiveSections([]);
    }
  }

  return (
    <div id="home">
      {done ? (
        <DoneForDay />
      ) : (
        <>
         <div className="day-buttons">
              {currentDay !== 1 && (<div onClick={() => handleDecrement()} >
                <FontAwesomeIcon icon={faArrowLeft} /><span>   previous day</span></div>
              )}
              {currentDay !== numOfDays && currentDay < maxDate && (
                <div onClick={() => handleIncrement()}><span>next day   </span><FontAwesomeIcon icon={faArrowRight} /></div>
              )}
            </div>
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
              activeSections={activeSections}
              setActiveSections={setActiveSections}
              toggleSection={toggleSection}
              isActive={isActive}
            />
           
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
