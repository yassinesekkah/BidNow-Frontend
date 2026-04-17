import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BidNowLogo from "./BidNowLogo";
import { getCategories } from "../services/categoryService";

function Header() {
  const [categories, setCategories] = useState([]);
  const mainCategories = categories.slice(0, 4);
  const otherCategories = categories.slice(4);

  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef();

  const { user, setUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category_id");

  //fetch categories
  useEffect(() => {
    const fetchCategories = async (e) => {
      const res = await getCategories();
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // close user dropdown
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }

      // close categories dropdown
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
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
        {/* <div className="hidden w-full max-w-sm md:block">
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
        </div> */}

        <div className="flex">
          <div className="hidden md:flex items-center gap-2">
            {mainCategories.map((cat) => {
              const isActive = activeCategory == cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/?category_id=${cat.id}`)}
                  className={`px-3 py-2 text-sm rounded-lg transition ${
                    isActive
                      ? "bg-indigo-100 text-indigo-600 font-semibold"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div ref={catRef} className="relative">
            {/* Button */}
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
            >
              More
              {/* Arrow */}
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  catOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown */}
            <div
              className={`
      absolute left-0 mt-2 w-48 rounded-xl border bg-white shadow-lg overflow-hidden transition-all
      ${
        catOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible translate-y-1"
      }
    `}
            >
              {otherCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    navigate(`/?category_id=${cat.id}`);
                    setCatOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!loading && !user && (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Get started
              </Link>
            </>
          )}

          {!loading && user && (
            <div ref={menuRef} className="relative inline-block">
              {/* Button */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 bg-white hover:bg-slate-50 transition"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="hidden sm:block text-sm font-medium">
                  {user.name || "User"}
                </span>

                {/* Arrow */}
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown */}
              <div
                className={`
    absolute right-0 top-full min-w-full
    rounded-b-xl border border-t-0 bg-white shadow-lg overflow-hidden
    transition-all duration-200 ease-out
    ${
      open
        ? "opacity-100 visible translate-y-0 scale-100"
        : "opacity-0 invisible translate-y-1 scale-95"
    }
  `}
              >
                <Link
                  to="/my-products"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  My Products
                </Link>

                <Link
                  to="/create-product"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  Sell Product
                </Link>

                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}

                <div className="border-t"></div>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
