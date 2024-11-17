import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOutUser } from "../../utilities/firebase";
import DayList from "../DayList/DayList";

export default function NavBar({ user, setUser, setCurrentDay, maxDate }) {
  const [checked, setChecked] = useState(false);
  const [behind, setBehind] = useState("behind");

  // UseEffect to handle setting behind to true 0.5sec after "checked" state is set to false
  useEffect(() => {
    if (!checked) {
      setTimeout(() => {
        setBehind("behind");
      }, 500);
    } else {
      setBehind("");
    }
  }, [checked]);

  function handleLogOut() {
    signOutUser();
  }

  return (
    <nav className="navbar">
      <div className={`overlay ${checked ? "opaque" : ""} ${behind}`}></div>
      <div className="ham-container nav-container">
        <input
          className="checkbox"
          name="checkbox"
          type="checkbox"
          checked={checked}
          onChange={() => {}} // Dummy onChange handler to avoid React warning
          onClick={() => setChecked(!checked)}
        />
        <div className="hamburger-lines" onClick={() => setChecked(false)}>
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <div className="logo">
          <h3>Advent Translation</h3>
        </div>
        <div className="menu-items">
          <li id="welcome" onClick={() => setChecked(false)}>
            Welcome, {user.firstName}
          </li>
          <li id="logout">
            <Link to="../" onClick={handleLogOut}>
              Log Out
            </Link>
          </li>
          {checked && (
            <DayList
              setCurrentDay={setCurrentDay}
              setChecked={setChecked}
              checked={checked}
              maxDate={maxDate}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
