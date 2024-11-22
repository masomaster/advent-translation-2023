export default function Header({ authPage, setAuthPage }) {
  
  function handleClick() {
    setAuthPage(true);
  }

  function goHome() {
    setAuthPage(false);
  }

  return (
    <header className="header">
      <h2 className="header-title" onClick={goHome}>
        Advent Translation
      </h2>
      {authPage ? null : (
        <button className="login-button" onClick={handleClick}>
          Sign In
        </button>
      )}
    </header>
  );
}
