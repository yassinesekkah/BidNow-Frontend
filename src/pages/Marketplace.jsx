import { useEffect, useState } from "react";
import { getAuctions } from "../services/auctionService";
import AuctionCard from "../components/AuctionCard";
import { useSearchParams } from "react-router-dom";

function Marketplace() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id");
  const searchQuery = searchParams.get("search");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);
  useEffect(() => {
    setLoading(true);
    setError(null);

    getAuctions(categoryId, debouncedSearch)
      .then((res) => {
        setAuctions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Something went wrong");
        setLoading(false);
        console.error(err);
      });
  }, [categoryId, debouncedSearch]);

  useEffect(() => {
    const params = {};

    if (categoryId) params.category_id = categoryId;
    if (debouncedSearch) params.search = debouncedSearch;

    setSearchParams(params);
  }, [debouncedSearch, categoryId]);

  // if (loading) {
  //   return (
  //     <div className="space-y-8 w-full">
  //       {/* Header skeleton */}
  //       <div className="space-y-3">
  //         <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-200" />
  //         <div className="h-6 w-96 animate-pulse rounded-lg bg-slate-200" />
  //       </div>
  //       {/* Grid skeleton */}
  //       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  //         {[...Array(8)].map((_, i) => (
  //           <div
  //             key={i}
  //             className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md"
  //           >
  //             <div className="aspect-[4/3] animate-pulse bg-slate-200" />
  //             <div className="space-y-3 p-5">
  //               <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
  //               <div className="space-y-2">
  //                 <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
  //                 <div className="h-6 w-1/2 animate-pulse rounded bg-slate-200" />
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 shadow-sm">
        {error}
      </div>
    );
  }

  return (
    <section className="w-full space-y-8">
      {/* Header */}
      <div className="space-y-3 animate-fade-in-up">
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Explore Live Auctions
        </h1>
        <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
          Discover unique items, track active bidding, and jump into auctions
          that match your interests.
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-md px-4 py-3 flex items-center gap-3">
          {/* Icon */}
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
            />
          </svg>

          {/* Input */}
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="search"
              placeholder="Search auctions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 pr-10 outline-none"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Auctions Grid */}
      {auctions.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-16 text-center shadow-md">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-slate-600">
              No auctions available right now
            </p>
            <p className="text-sm text-slate-500">
              Check back soon for new opportunities
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 rounded-xl bg-slate-200 animate-pulse"
                />
              ))
            : auctions.map((a) => <AuctionCard key={a.id} auction={a} />)}
        </div>
      )}
    </section>
  );
}
export default Marketplace;
