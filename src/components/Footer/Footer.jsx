export default function Footer({ user }) {
  return (
    <footer className="footer">
      <div>
        <a href="http://eepurl.com/iFf576" target="_blank" rel="noreferrer">
          Sign up for daily emails
        </a>
        {user && (
          <>
            <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
            <a
              href="https://forms.gle/QrqjwfmWVVzmYpPd7"
              target="_blank"
              rel="noreferrer"
            >
              Give Feedback!
            </a>
          </>
        )}
      </div>
      <div>
        Created with ♡ by{" "}
        <a href="https://masonlancaster.com/" target="_blank" rel="noreferrer">
          Mason Lancaster
        </a>
      </div>
    </footer>
  );
}
