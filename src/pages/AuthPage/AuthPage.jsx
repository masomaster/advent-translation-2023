import { useState } from "react";
import { Link } from "react-router-dom";
import { handleGoogleSignIn } from "../../utilities/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Header from "../../components/HomePageComponents/Header";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import PasswordReset from "../../components/PasswordReset/PasswordReset";
import Footer from "../../components/Footer/Footer";
import "./AuthPage.css";

export default function AuthPage({
  user,
  authPage,
  setAuthPage,
  setCurrentDay,
}) {
  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");
  const [pwReset, setPwReset] = useState(false);
  const [emailEntered, setEmailEntered] = useState(false);

  const handleToggle = () => {
    setError("");
    setLogin(!login);
  };

  const handleResetPw = () => {
    setError("");
    setEmailEntered(false);
    setPwReset(!pwReset);
  };

  return (
    <div className="auth-page">
      <Header authPage={authPage} setAuthPage={setAuthPage} />

      <div className="auth-panel">
        <h2>Welcome!</h2>
        {pwReset ? (
          <PasswordReset
            setError={setError}
            setEmailEntered={setEmailEntered}
            setPwReset={setPwReset}
          />
        ) : login ? (
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
        )}
        <p className="error-message">&nbsp;{error}</p>
        <div className="pw-reset">
          {" "}
          <Link className="reset-pw" to="" onClick={handleResetPw}>
            {pwReset ? "I remembered!" : "Forgot password?"}
          </Link>
        </div>
        <div className="sign-up-toggle">
          <Link className="sign-up-toggle" to="" onClick={handleToggle}>
            {login
              ? "No account? Sign up! "
              : "Already have an account? Log In!"}
          </Link>
        </div>
        <button onClick={handleGoogleSignIn} className="login-button">
          <FontAwesomeIcon icon={faGoogle} /> Sign In with Google
        </button>
      </div>
      <Footer user={user} />
    </div>
  );
}
