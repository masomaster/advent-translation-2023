import { useEffect, useState } from "react";
import { getUser } from "../../utilities/users-service";

import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import Home from "../Home/Home";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [currentDay, setCurrentDay] = useState(1);
  const [maxDate, setMaxDate] = useState(1);

  // Toggle to manually set it to production mode
  const isProduction = true;

  useEffect(() => {
    if (isProduction) {
      calculateMaxDate();
    } else {
      setMaxDate(25);
    }
  });

  // Determine how many days a user can see
  function calculateMaxDate() {
    const currentDate = new Date().getDate();
    const currentYear = new Date().getFullYear();
    const isDecember = new Date().getMonth() === 11;
    if (isProduction) {
      // If during Dec '23, set maxDate to current date or 25, whichever is less
      if (currentYear === 2023 && isDecember) {
        currentDate < 26 ? setMaxDate(currentDate) : setMaxDate(25);
      }
      // If before Dec '23, allow only 1 day
      if (currentYear === 2023 && !isDecember) {
        setMaxDate(1);
      }
      // If after Dec '23, allow all 25 days
      if (currentYear > 2023) {
        setMaxDate(25);
      }
    }
  }

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar
            user={user}
            setUser={setUser}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            maxDate={maxDate}
          />
          <Home
            user={user}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            maxDate={maxDate}
          />
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
