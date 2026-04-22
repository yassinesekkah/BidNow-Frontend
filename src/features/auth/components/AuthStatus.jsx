import { useContext } from "react";


import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { useAuth } from "../hooks/useAuth";

function AuthStatus() {
  const { user, loading } = useAuth();

  // loading
  if (loading || user === undefined) {
    return (
      <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-200"></div>
    );
  }

  //  not logged
  if (!user) {
    return (
      <Link
        to="/login"
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
      >
        Sign In
      </Link>
    );
  }

  //  logged
  return <UserDropdown />;
}

export default AuthStatus;