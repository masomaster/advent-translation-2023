import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useState } from "react";

export default function AuthPage({ setUser }) {
  const [login, setLogin] = useState(true);
  const splash = (
    <div>
      <h1>Advent Translation</h1>
      <div className="tagline">
        One Hebrew and one Greek verse for you to translate each day of Advent.
      </div>
      <p>
        Come back each day until Christmas for a new set of verses. Feel free to
        skip days or do just one verse. The first day is unlocked before
        December to give you a sample. This is an early release, so I'd
        appreciate your feedback (click "give feedback" once logged in).{" "}
      </p>
    </div>
  );
  function handleToggle() {
    setLogin(!login);
  }

  return (
    <main className="auth-page">
      {login ? (
        <>
          {splash}
          <h3>Log In</h3>
          <LoginForm setUser={setUser} handleToggle={handleToggle} />
        </>
      ) : (
        <>
          {splash}
          <h3>Sign Up</h3>
          <SignUpForm setUser={setUser} handleToggle={handleToggle} />
        </>
      )}
    </main>
  );
}
