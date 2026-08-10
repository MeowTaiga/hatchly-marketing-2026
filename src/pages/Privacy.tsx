import { SiteFooter } from '../components/SiteFooter';

/** Privacy + terms content ported from legacy hatchly-marketing. */
export function PrivacyPage() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <a className="brand-lockup" href="/" aria-label="Hatchly home">
          <img src="/hatchly-splash-logo.png" alt="" />
          <span>Hatchly</span>
        </a>
      </header>

      <main className="legal-main">
        <article className="legal-card">
          <h1>Privacy Policy</h1>
          <p className="legal-updated">
            <strong>Last updated:</strong> March 2026
          </p>

          <p>
            Hatchly is committed to protecting your privacy. We do not sell your data, and we do not
            use it for advertising. The information we collect is used solely to support the
            app&apos;s functionality and to help you track your progress.
          </p>

          <h2>Information We Collect</h2>
          <p>To provide and maintain Hatchly, we may collect the following types of data:</p>

          <h3>Contact Information</h3>
          <ul>
            <li>Name (if provided)</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Other contact details (if you refer or invite friends)</li>
          </ul>

          <h3>Health &amp; Fitness</h3>
          <p>Health data you authorize us to access, such as:</p>
          <ul>
            <li>Steps</li>
            <li>Water intake</li>
            <li>Calories</li>
            <li>Other data from Apple HealthKit or Google Fit</li>
          </ul>

          <h3>Location</h3>
          <p>
            Precise location data, only if enabled and required for specific features (e.g., step
            tracking with GPS).
          </p>

          <h3>Usage Data</h3>
          <ul>
            <li>App interaction metrics (e.g., screen opens, feature usage)</li>
          </ul>

          <h3>Diagnostics</h3>
          <ul>
            <li>Crash reports</li>
            <li>Performance metrics</li>
            <li>Technical diagnostics to help improve app reliability</li>
          </ul>

          <h2>What We Don&apos;t Do</h2>
          <ul>
            <li>
              We do <strong>not</strong> sell your personal data.
            </li>
            <li>
              We do <strong>not</strong> share data with advertisers.
            </li>
            <li>
              We do <strong>not</strong> use your data for third-party ad targeting.
            </li>
            <li>
              We do <strong>not</strong> track you across other apps or websites.
            </li>
          </ul>

          <p>Your data is only used internally to:</p>
          <ul>
            <li>Power Hatchly&apos;s features</li>
            <li>Improve app stability and performance</li>
            <li>Support your experience and progress tracking</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We use industry-standard encryption and data protection practices. Only necessary
            personnel have access to the minimal data required for operations and support.
          </p>

          <h2>Your Rights and Choices</h2>
          <p>You may request to:</p>
          <ul>
            <li>View your data</li>
            <li>Delete your data</li>
            <li>Close your account</li>
          </ul>
          <p>To do so, contact us at the email below.</p>

          <h2 id="terms">Terms of Service</h2>
          <p>
            By using Hatchly or joining our waitlist, you agree to use the service for personal,
            non-abusive purposes, and to respect other players in multiplayer spaces. Hatchly is
            provided as-is during beta; features may change as we hatch new updates.
          </p>
          <p>
            Questions about these terms? Email{' '}
            <a href="mailto:support@hatchly.me">support@hatchly.me</a>.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this policy or your data, reach out to us:</p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:support@hatchly.me">support@hatchly.me</a>
            <br />
            <strong>Website:</strong>{' '}
            <a href="https://hatchly.me/privacy">https://hatchly.me/privacy</a>
          </p>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
