import { Link } from "react-router-dom";

export default function Header({ authPage, setAuthPage }) {
  function handleClick() {
    setAuthPage(true);
  }

  return (
    <header className="header">
      <h2 className="header-title">Advent Translation</h2>
      {authPage ? null : (
        // <Link to="">
          <button className="login-button" onClick={handleClick}>Sign In</button>
        // </Link>
      )}
    </header>
  );
}
