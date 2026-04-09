import { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BidNowLogo from "../components/BidNowLogo";

function MainLayout() {
  const { user, setUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-slate-900 transition hover:text-indigo-600 shrink-0"
          >
            <BidNowLogo size="md" variant="gradient" />
            <span className="hidden sm:inline">BidNow</span>
          </Link>

          {/* Search - Hidden on mobile */}
          <div className="hidden w-full max-w-sm md:block">
            <label htmlFor="market-search" className="sr-only">
              Search auctions
            </label>
            <input
              id="market-search"
              type="search"
              placeholder="Search auctions..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              aria-label="Search auctions"
            />
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {!loading && !user && (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition duration-200 hover:border-slate-300 hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  state={{ mode: "register" }}
                  className="hidden sm:inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/40"
                >
                  Register
                </Link>
              </>
            )}

            {!loading && user && (
              <>
                <div className="hidden md:flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-100 px-3 py-1.5">
                    <span className="text-sm font-semibold text-indigo-700">
                      {user.name || user.email || "User"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition duration-200 hover:border-slate-300 hover:bg-slate-50"
                  >
                    Logout
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:bg-slate-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 3.75a1.5 1.5 0 011.5 1.5v13.5a1.5 1.5 0 01-1.5 1.5H7.5a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5h9zm-11.25 11.25a.75.75 0 00-1.5 0v2.25H2.25a.75.75 0 000 1.5h1.5v1.5a.75.75 0 001.5 0v-1.5h1.5a.75.75 0 000-1.5h-1.5v-2.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${
          location.pathname === "/login"
            ? "flex min-h-[calc(100vh-8.5rem)] items-center justify-center max-w-md"
            : ""
        }`}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BidNowLogo size="sm" variant="gradient" />
                <span className="font-display text-lg font-bold text-slate-900">
                  BidNow
                </span>
              </div>
              <p className="text-sm text-slate-600">
                The fastest way to discover and bid on amazing items.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-indigo-600 transition"
                  >
                    Explore
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-indigo-600 transition"
                  >
                    How it works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-indigo-600 transition"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-indigo-600 transition"
                  >
                    Help center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-indigo-600 transition"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-indigo-600 transition"
                  >
                    Safety
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-indigo-600 transition"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-indigo-600 transition"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-indigo-600 transition"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 pt-8">
            <p className="text-center text-sm text-slate-600">
              © 2026 BidNow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
