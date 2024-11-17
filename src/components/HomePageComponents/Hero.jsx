import { useState } from "react";
import { Link } from "react-router-dom";
import { handleGoogleSignIn } from "../../utilities/firebase";
import LoginForm from "../LoginForm/LoginForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import PasswordReset from "../passwordReset/passwordReset";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./Hero.css";

export default function Hero({ setUser, setCurrentDay }) {
  const [login, setLogin] = useState(true);
  const [emailEntered, setEmailEntered] = useState(false);
  const [error, setError] = useState("");
  const [pwReset, setPwReset] = useState(false);

  const handleToggle = () => {
    setError("");
    setLogin(!login);
  };

  const handleResetPw = () => {
    setError("");
    setEmailEntered(false);
    setPwReset(!pwReset);
  }

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
        {pwReset ? (<PasswordReset setError={setError} setEmailEntered={setEmailEntered} setPwReset={setPwReset}/>) : (
        login ? (
          <LoginForm
            emailEntered={emailEntered}
            setEmailEntered={setEmailEntered}
            handleToggle={handleToggle}
            setError={setError}
          />
        ) : (
          <SignUpForm
            handleToggle={handleToggle}
            setError={setError}
            setCurrentDay={setCurrentDay}
          />
        ))}
        <p className="error-message">&nbsp;{error}</p>
        <div className="pw-reset"> <Link className="reset-pw" to="" onClick={handleResetPw}>
            {pwReset
              ? "I remembered!" 
              : "Forgot password?"}
          </Link></div>
        <div className="sign-up-toggle">
          <Link className="sign-up-toggle" to="" onClick={handleToggle}>
            {login
              ? "No account? Sign up! "
              : "Already have an account? Log In!"}
          </Link>
          
        </div>
        <button onClick={handleGoogleSignIn} className="google-login-button">
          <FontAwesomeIcon icon={faGoogle} /> Sign In with Google
        </button>
      </div>
      
    </section>
  );
}
