import { memo, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function NavbarLinks({ mainCategories, otherCategories }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category_id");
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef();
  

  useEffect(() => {
    const handleClickOutside = (e) => {
      // close categories dropdown
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return(
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
              className="hidden md:flex items-center gap-1 px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
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
  )
}
export default memo(NavbarLinks);
