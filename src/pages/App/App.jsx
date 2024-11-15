import { useState, useEffect } from "react";
import { getUser } from "../../utilities/users-service";
import { onAuthChange, getUserData } from "../../utilities/firebase";
import NavBar from "../../components/NavBar/NavBar";
import TranslationPanel from "../../components/TranslationPanel/TranslationPanel";
import HomePage from "../HomePage/HomePage";

export default function App() {
  const [user, setUser] = useState(null);
  const [maxDate, setMaxDate] = useState(returnInitialMaxDate());
  const [currentDay, setCurrentDay] = useState(maxDate);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch additional user data (e.g. name) from Firestore, add to user object
  useEffect(() => {
    async function fetchUserData() {
      const data = await getUserData();
      if (data) {
        setUser((user) => ({ ...user, ...data }));
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

  return (
    <main className="App">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
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
        <HomePage user={user} setUser={setUser} setCurrentDay={setCurrentDay} />
      )}
    </main>
  );
}
