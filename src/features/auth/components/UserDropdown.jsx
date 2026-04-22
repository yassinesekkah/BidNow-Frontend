import { useContext, useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function UserDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);


  // click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border px-3 py-2 bg-white hover:bg-slate-50 transition"
      >
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <span className="hidden sm:block text-sm font-medium">
          {user?.name || "User"}
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
        <Link
          to="/my-bids"
          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          onClick={() => setOpen(false)}
        >
          My Bids
        </Link>
        <div className="border-t"></div>
        {/*logout button*/}
        <button
          onClick={() => {
            logout();
            setOpen(false);
          }}
          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDropdown;
