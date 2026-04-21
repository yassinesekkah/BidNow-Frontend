import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UserDropdown from "../components/layout/UserDropdown";
import { Link } from "react-router-dom";


function UserSection() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
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
    );
  }

  return <UserDropdown />;
}

export default UserSection;