import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useState } from "react";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [login, setLogin] = useState(true);

  const splash = (
    <div className="splash background">
      <p>
        Translate one Hebrew and one Greek verse each day of Advent.
      </p>
      <div>
        <h6>Help with Hebrew and Greek</h6>
        <p>Access parsing information and word definitions through Parabible.</p>
        <h6>Compare Translations</h6>
        <p>View original text and modern translation side by side to catch every nuance.</p>
        <h6>Real-Time Feedback</h6>
        <p>Receive detailed, language-specific feedback on word choice, grammar, and syntax.</p>
        <h6>Personalized Learning </h6>
        <p>Track your progress and dive deeper into the areas that interest you most.</p>
      </div>
    </div>
  );

  function handleToggle() {
    setLogin(!login);
  }

  return (
    <main className="auth-page">
      {/* <div className="text-container"> */}
      <div className="title-section">
      <h1>Advent Translation</h1>
      <p className="tagline">
        Unlock deeper biblical understanding with guided insights.
      </p>
      </div>
      {splash}
      <div className="auth-container background">
        {login ? (
          <LoginForm setUser={setUser} handleToggle={handleToggle} />
        ) : (
          <SignUpForm setUser={setUser} handleToggle={handleToggle} />
        )}
      </div>
      {/* </div> */}
    </main>
  );
}
