import React from 'react';

import {
  BriefcaseBusiness,
  CalendarDays,
  Menu,
  UserRound,
  X
} from 'lucide-react';

export default function Navbar({
  user,
  isWorker,
  menu,
  setMenu,
  onDashboard,
  onRoleAction,
  onGetStarted
}) {
  return (
    <header className="header">

      <div className="container nav">

        <a
          className="brand"
          href="#top"
          onClick={() => setMenu(false)}
        >
          <span className="brandMark">
            W
          </span>

          <span>
            Hire
            <span className="accent">
              me
            </span>
          </span>
        </a>

        <nav
          className={
            menu
              ? 'navLinks open'
              : 'navLinks'
          }
        >
          <a
            href="#services"
            onClick={() => setMenu(false)}
          >
            Services
          </a>

          <a
            href="#workers"
            onClick={() => setMenu(false)}
          >
            Find workers
          </a>

          <a
            href="#how"
            onClick={() => setMenu(false)}
          >
            How it works
          </a>

          <a
            href="#safety"
            onClick={() => setMenu(false)}
          >
            Safety
          </a>
        </nav>

        <div className="navActions">

          {user && (
            <button
              className="ghostBtn desktopOnly"
              onClick={onDashboard}
            >
              {isWorker ? (
                <BriefcaseBusiness size={16} />
              ) : (
                <CalendarDays size={16} />
              )}

              Dashboard
            </button>
          )}

          <button
            className="roleBtn desktopOnly"
            onClick={onRoleAction}
          >
            {isWorker
              ? 'My profile'
              : 'Become a worker'}
          </button>

          <button
            className="iconBtn mobileMenu"
            onClick={() =>
              setMenu((v) => !v)
            }
          >
            {menu ? <X /> : <Menu />}
          </button>

          {user ? (
            <button
              className="userChip"
              onClick={onDashboard}
            >
              <UserRound size={15} />

              <span>
                {user.name}
              </span>
            </button>
          ) : (
            <button
              className="primary small desktopOnly"
              onClick={onGetStarted}
            >
              Get started
            </button>
          )}

        </div>

      </div>

    </header>
  );
}