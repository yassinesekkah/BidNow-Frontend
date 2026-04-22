import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuction } from "../services/auctionService";
import BidForm from "../components/BidForm";
import { placeBid } from "../services/auctionService";
import { useContext } from "react";
import { AuthContext } from "../features/auth/context/AuthContext";
import { useAuth } from "../features/auth/hooks/useAuth";

function AuctionDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount || 0);

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";
    return new Date(dateValue).toLocaleString();
  };

  useEffect(() => {
    let isMounted = true;

    const fetchAuction = async () => {
      try {
        const res = await getAuction(id);

        if (!isMounted) return;

        const newAuction = res.data.auction;
        const newBids = res.data.latest_bids;

        setAuction((prev) => {
          if (
            prev &&
            prev.current_highest_bid === newAuction.current_highest_bid &&
            prev.status === newAuction.status
          ) {
            return prev;
          }
          return newAuction;
        });

        setBids((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(newBids)) {
            return prev;
          }
          return newBids;
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Unable to load auction details.");
          setLoading(false);
        }
      }
    };

    // first load
    setLoading(true);
    setError(null);
    fetchAuction();

    // polling
    const interval = setInterval(fetchAuction, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    console.log("CLICKED BID");
    setMessage({ type: "", text: "" });

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage({ type: "error", text: "You must log in first." });
      return;
    }

    const currentPrice = auction.current_highest_bid ?? auction.starting_price;
    const numericBid = Number(bidAmount);

    if (!numericBid || numericBid <= Number(currentPrice)) {
      setMessage({
        type: "error",
        text: "Bid must be higher than current price.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await placeBid(id, { amount: numericBid });

      const newBid = res.data.bid;

      setBids((prev) => [newBid, ...prev]);

      setAuction((prev) => ({
        ...prev,
        current_highest_bid: newBid.amount,
      }));

      setBidAmount("");
      setMessage({
        type: "success",
        text: "Your bid has been placed successfully.",
      });
    } catch (err) {
      console.log(err);
      setMessage({
        type: "error",
        text: "Unable to place bid. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-6">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Main skeleton */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 space-y-6">
            <div className="space-y-4">
              <div className="h-8 w-24 animate-pulse rounded-full bg-slate-200" />
              <div className="h-10 w-96 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-6 w-full animate-pulse rounded-lg bg-slate-200" />
            </div>
            <div className="space-y-4">
              <div className="h-32 animate-pulse rounded-xl bg-slate-200" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 animate-pulse rounded-xl bg-slate-200" />
                <div className="h-24 animate-pulse rounded-xl bg-slate-200" />
              </div>
            </div>
          </div>
          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <div className="h-48 animate-pulse rounded-2xl bg-slate-200" />
            <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="max-w-md">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-12 w-12 text-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="font-semibold text-red-900">{error}</p>
            <p className="mt-2 text-sm text-red-700">
              Please try again or check back later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentPrice =
    auction?.current_highest_bid ?? auction?.starting_price ?? 0;

  const isInvalidBid = !bidAmount || Number(bidAmount) <= Number(currentPrice);

  if (!auction) return null;

  return (
    <div className="w-full space-y-6">
      <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Main Content */}
        <article className="space-y-6 rounded-2xl border border-slate-100 bg-white p-8 shadow-lg animate-fade-in-up">
          {/* Product Image */}
          <div className="w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
            {auction.product?.image_url ? (
              <img
                src={auction.product.image_url}
                alt={auction.product?.title}
                className="w-full h-[400px] object-cover transition duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex h-[400px] items-center justify-center">
                <span className="text-4xl font-bold text-slate-400">
                  {(auction.product?.title || "P").charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Status & Title */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <span
                className={`status-pill ${
                  auction.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {auction.status}
              </span>
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 mb-3">
                {auction.product?.title || "Auction details"}
              </h1>
              <p className="text-base leading-relaxed text-slate-600">
                {auction.product?.description ||
                  "No product description available."}
              </p>
            </div>
          </div>

          {/* Price Highlights */}
          <div className="grid gap-4">
            <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-100 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 mb-2">
                Current highest bid
              </p>
              <p className="text-4xl font-bold text-indigo-600">
                {formatPrice(
                  auction.current_highest_bid ?? auction.starting_price,
                )}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                  Starting price
                </p>
                <p className="text-2xl font-semibold text-slate-900">
                  {formatPrice(auction.starting_price)}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                  Reserve price
                </p>
                <p className="text-2xl font-semibold text-slate-900">
                  {formatPrice(auction.reserve_price)}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                Start date
              </p>
              <p className="text-sm font-medium text-slate-900">
                {formatDate(auction.start_date)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                End date
              </p>
              <p className="text-sm font-medium text-slate-900">
                {formatDate(auction.end_date)}
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6 animate-fade-in-up">
          <BidForm
            auction={auction}
            bidAmount={bidAmount}
            setBidAmount={setBidAmount}
            handleBid={handleBid}
            isAuthenticated={Boolean(user)}
            isInvalidBid={isInvalidBid}
            message={message}
            isSubmitting={isSubmitting}
          />

          {/* Latest Bids Section */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md">
            <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
              Latest Bids
            </h3>

            {bids.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">
                No bids yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {bids.map((bid, idx) => (
                  <li
                    key={
                      bid.id || `${bid.user_id}-${bid.amount}-${bid.created_at}`
                    }
                    className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-all ${
                      idx === 0
                        ? "border-indigo-200 bg-indigo-50"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-sm font-medium text-slate-600">
                      User #{bid.user_id || "-"}
                      {idx === 0 && (
                        <span className="ml-2 inline-block px-2 py-0.5 rounded text-xs font-semibold bg-indigo-200 text-indigo-700">
                          Latest
                        </span>
                      )}
                    </span>
                    <span className="font-semibold text-indigo-600">
                      {formatPrice(bid.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </section>
    </div>
  );
}
export default AuctionDetails;
