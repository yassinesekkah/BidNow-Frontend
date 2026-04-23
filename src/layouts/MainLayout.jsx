import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      <main
        className={`flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${
          location.pathname === "/login"
            ? "flex min-h-[calc(100vh-8.5rem)] items-center justify-center max-w-md"
            : ""
        }`}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;

