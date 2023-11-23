import { useEffect, useState } from "react";
import { getUser } from "../../utilities/users-service";

import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import Home from "../Home/Home";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [currentDay, setCurrentDay] = useState(user?.latestDay || 1);
  const [languageIsHebrew, setLanguageIsHebrew] = useState(true);

  // Toggle first boolean below to manually set it to production mode
  const isProduction =
    false || (new Date().getMonth === 1 && new Date().getFullYear === 2023)
      ? true
      : false;

  useEffect(() => {
    if (isProduction) {
      // I don't want it to check if it's actually December right now. I want to be able to test as if it were December. See below.
      const currentDate = new Date().getDate();
      setCurrentDay(currentDate);
      // If it's December, set current day to today's date
      // const isDecember = new Date().getMonth() === 11;
      // const currentDecDate = isDecember ? new Date().getDate() : 1;
      // setCurrentDay(isDecember ? currentDecDate : 1);
      // Alternative: set user to latest day for which they've submitted a translation:
      // setCurrentDay(Math.min(user?.latestDay || 1, currentDecDate));
    }
  }, [isProduction]);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar
            user={user}
            setUser={setUser}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            isProduction={isProduction}
            setLanguageIsHebrew={setLanguageIsHebrew}
          />
          <Home
            user={user}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            isProduction={isProduction}
            languageIsHebrew={languageIsHebrew}
            setLanguageIsHebrew={setLanguageIsHebrew}
          />
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
