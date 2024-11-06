import { useState } from "react";
import { getUser } from "../../utilities/users-service";

import NavBar from "../../components/NavBar/NavBar";
import TranslationPanel from "../../components/TranslationPanel/TranslationPanel";
import HomePage from "../HomePage/HomePage";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [maxDate, setMaxDate] = useState(returnInitialMaxDate());
  const [currentDay, setCurrentDay] = useState(maxDate);

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
    // If after Dec '23, allow all 25 days
    if (currentYear > 2023) {
      return 25;
    } else return 25;
  }

  return (
    <main className="App">
      {user ? (
        <div className="logged-in">
          <NavBar
            user={user}
            setUser={setUser}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            maxDate={maxDate}
          />
          <TranslationPanel
            user={user}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            maxDate={maxDate}
          />
        </div>
      ) : (
        <HomePage user={user} setUser={setUser}/>
      )}
    </main>
  );
}
