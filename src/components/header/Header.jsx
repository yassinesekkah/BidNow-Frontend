import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BidNowLogo from "../BidNowLogo";
import { getCategories } from "../../services/categoryService";
import NavbarLinks from "./NavbarLinks";
import { AuthStatus } from "../../features/auth";
import { NotificationBell } from "../../features/notifications";
import MobileMenu from "./MobileMenu";

function Header() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const fetchedRef = useRef(false);

  const mainCategories = useMemo(() => {
    return categories.slice(0, 4);
  }, [categories]);

  const otherCategories = useMemo(() => {
    return categories.slice(4);
  }, [categories]);

  //fetch categories
  useEffect(() => {
    if (fetchedRef.current) return;

    fetchedRef.current = true;

    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   navigate("/login");
  // };

  return (
    <>
      <header className=" relative z-50 sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-slate-900 transition hover:text-indigo-600 shrink-0"
          >
            <BidNowLogo size="md" variant="gradient" />
            <span className="hidden sm:inline">BidNow</span>
          </Link>

          {!loadingCategories && (
            <NavbarLinks
              mainCategories={mainCategories}
              otherCategories={otherCategories}
            />
          )}

          <div className="flex gap-2">
            <div className="flex items-center gap-3">
              {/*UserDropdown call*/}
              <AuthStatus />
            </div>

            {/*notification component call*/}
            <div className="flex items-center gap-4">
              <NotificationBell />
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg border bg-white hover:bg-slate-50 transition shadow-sm"
            >
              {mobileOpen ? (
                //  Icon X
                <svg
                  className="w-6 h-6 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // ☰ Hamburger
                <svg
                  className="w-6 h-6 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          <MobileMenu
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            categories={categories}
          />
        </>
      )}
    </>
  );
}

export default memo(Header);
