import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import SignUpForm from "../SignUpForm/SignUpForm";

export default function Hero({ setUser, setCurrentDay }) {
  const [login, setLogin] = useState(true);
  const [emailEntered, setEmailEntered] = useState(false);
  const [error, setError] = useState("");
  const handleToggle = () => {
    setError("");
    setLogin(!login);
  };

  return (
    <section
      className={`hero ${emailEntered ? "hero-bigger" : ""} ${
        login ? "" : "hero-biggest"
      }`}
    >
      <div className="hero-content">
        <h1 className="hero-title">
          Unlock deeper biblical understanding with guided insights.
        </h1>
        <h2 className="hero-subtitle">
          Daily Hebrew and Greek translations for Advent
        </h2>
        {login ? (
          <LoginForm
            setUser={setUser}
            emailEntered={emailEntered}
            setEmailEntered={setEmailEntered}
            handleToggle={handleToggle}
            setError={setError}
          />
        ) : (
          <SignUpForm
            setUser={setUser}
            handleToggle={handleToggle}
            setError={setError}
            setCurrentDay={setCurrentDay}
          />
        )}
          <p className="error-message">&nbsp;{error}</p>
        <div className="sign-up-toggle">
          <Link className="sign-up-toggle" to="" onClick={handleToggle}>
            {login
              ? "No account? Sign up! "
              : "Already have an account? Log In!"}
          </Link>
        </div>
      </div>
    </section>
  );
}
