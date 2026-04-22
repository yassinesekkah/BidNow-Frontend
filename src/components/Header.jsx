import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BidNowLogo from "./BidNowLogo";
import { getCategories } from "../services/categoryService";

import NotificationBell from "./notifications/NotificationBell";
import NavbarLinks from "./layout/NavbarLinks";
import { AuthStatus } from "../features/auth";

function Header() {
  const [categories, setCategories] = useState([]);

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
      const res = await getCategories();
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   navigate("/login");
  // };

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

        <NavbarLinks
          mainCategories={mainCategories}
          otherCategories={otherCategories}
        />

        <div className="flex gap-2">
          <div className="flex items-center gap-3">
            {/*UserDropdown call*/}
            <AuthStatus />
          </div>

          {/*notification component call*/}
          <div className="flex items-center gap-4">
            <NotificationBell />
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
