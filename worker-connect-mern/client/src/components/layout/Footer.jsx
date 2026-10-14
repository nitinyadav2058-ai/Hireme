import React from 'react';

export default function Footer({
  user,
  onDashboard,
  onLogout,
  onLogin,
  onRegister
}) {
  return (
    <footer className="footer">

      <div className="container footerGrid">

        <div>
          <div className="brand">
            <span className="brandMark">
              W
            </span>

            <span>
              Hire
              <span className="accent">
                me
              </span>
            </span>
          </div>

          <p>
            Trusted work. Fair prices. Nearby help.
          </p>
        </div>

        <div>
          <b>
            Platform
          </b>

          <a href="#services">
            Services
          </a>

          <a href="#workers">
            Find workers
          </a>

          <a href="#how">
            How it works
          </a>
        </div>

        <div>
          <b>
            Trust
          </b>

          <a href="#safety">
            Safety
          </a>

          <a href="mailto:support@workerconnect.local">
            Contact support
          </a>
        </div>

        <div>
          <b>
            Account
          </b>

          {user ? (
            <>
              <button onClick={onDashboard}>
                Dashboard
              </button>

              <button onClick={onLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <button onClick={onLogin}>
                Log in
              </button>

              <button onClick={onRegister}>
                Create account
              </button>
            </>
          )}
        </div>

      </div>

      <div className="container footerBottom">

        <span>
          © 2026 WorkerConnect
        </span>

        <span>
          Built for accessible local services
        </span>

      </div>

    </footer>
  );
}
