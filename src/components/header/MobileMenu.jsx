import { Link, useNavigate } from "react-router-dom";

function MobileMenu({ mobileOpen, setMobileOpen, categories }) {
  const navigate = useNavigate();

  if (!mobileOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={() => setMobileOpen(false)}
      />

      {/* 📱 Mobile Menu */}
      <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow-lg border-t p-4 space-y-2 z-50">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              navigate(`/?category=${cat.id}`);
              setMobileOpen(false);
            }}
            className="block w-full text-left text-sm text-slate-700 hover:bg-slate-50 px-2 py-1 rounded"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default MobileMenu;
