/** Shared site footer — matches legacy hatchly-marketing links. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <img src="/hatchly-splash-logo.png" alt="Hatchly" className="site-footer-logo" />
      <p>&copy; {year} Hatchly. All rights reserved. Your fun fitness journey starts here!</p>
      <p className="site-footer-links">
        <a href="/privacy">Privacy Policy</a>
        <span aria-hidden="true"> · </span>
        <a href="/privacy#terms">Terms of Service</a>
        <span aria-hidden="true"> · </span>
        <a href="https://discord.gg/ytvfBajAhh" target="_blank" rel="noreferrer">
          Discord
        </a>
      </p>
    </footer>
  );
}
