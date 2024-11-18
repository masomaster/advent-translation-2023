import { useState, useEffect } from "react";
import { onAuthChange, listenForUserData } from "../../utilities/firebase";
import * as translationsAPI from "../../utilities/translations-api";
import NavBar from "../../components/NavBar/NavBar";
import TranslationPanel from "../../components/TranslationPanel/TranslationPanel";
import HomePage from "../HomePage/HomePage";

export default function App() {
  const [user, setUser] = useState(null);
  const [maxDate, setMaxDate] = useState(returnInitialMaxDate());
  const [currentDay, setCurrentDay] = useState(maxDate);
  const [loading, setLoading] = useState(true);
  const [translation, setTranslation] = useState("");
  const [languageIsHebrew, setLanguageIsHebrew] = useState(true);
  const language = languageIsHebrew ? "hebrew" : "greek";

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
      if (firebaseUser) {
        try {
          const data = await listenForUserData();
          if (data) {
            setUser((user) => ({ ...user, ...data }));
          }
        } catch (error) {
          console.error("Error in fetchUserData:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch additional user data (e.g. name) from Firestore, add to user object
  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await listenForUserData();
        if (data) {
          setUser((user) => ({ ...user, ...data }));
        }
      } catch (error) {
        console.error("Error in fetchUserData:", error);
      }
    }
    fetchUserData();
  }, []);

  function returnInitialMaxDate() {
    const currentDate = new Date().getDate();
    const currentYear = new Date().getFullYear();
    const isDecember = new Date().getMonth() === 11;

    // If during Dec '23, set maxDate to currentDate or 25, whichever is less
    if (currentYear === 2023 && isDecember) {
      return currentDate < 26 ? currentDate : 25;
    }
    // If before Dec '23, allow only 1 day
    if (currentYear === 2023 && !isDecember) {
      return 1;
    }
    // Otherwise, allow all 25 days
    return 25;
  }

  async function saveTranslation() {
    try {
      const dayTranslation = {
        [language]: translation,
        day: currentDay,
        firebaseUID: user.uid,
      };
      const results = await translationsAPI.createTranslations(dayTranslation);
      return results;
    } catch (err) {
      console.log("Error in saveTranslation: ", err);
    }
  }

  return (
    <main className="App">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="logged-in">
          <NavBar
            user={user}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            maxDate={maxDate}
            saveTranslation={saveTranslation}
            setLanguageIsHebrew={setLanguageIsHebrew}
          />
          <TranslationPanel
            user={user}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            maxDate={maxDate}
            languageIsHebrew={languageIsHebrew}
            setLanguageIsHebrew={setLanguageIsHebrew}
            translation={translation}
            setTranslation={setTranslation}
            saveTranslation={saveTranslation}
          />
        </div>
      ) : (
        <HomePage user={user} setUser={setUser} setCurrentDay={setCurrentDay} />
      )}
    </main>
  );
}
