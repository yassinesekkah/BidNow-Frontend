import { useEffect, useState } from "react";
import { getMyBids } from "../services/auctionService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function MyBids() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getMyBids()
      .then((res) => {
        setAuctions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getAction = (auction) => {
    const highestBid = auction.bids[0];
    const isWinner = highestBid?.user_id === user.id;

    if (auction.status === "ended") {
      return isWinner ? "pay" : "view";
    }

    return isWinner ? "view" : "bid";
  };

  //function status
  const getStatus = (auction) => {
    const highestBid = auction.bids[0];
    const isWinner = highestBid?.user_id === user.id;

    // ended auction
    if (auction.status === "ended") {
      return isWinner ? "won" : "lost";
    }

    //active
    return isWinner ? "winning" : "outbid";
  };

  const getProgress = (auction) => {
    if (!auction.start_date || !auction.end_date) return 0;

    const start = new Date(auction.start_date);
    const end = new Date(auction.end_date);
    const now = new Date();

    const total = end - start;
    const passed = now - start;

    const percent = (passed / total) * 100;

    return Math.min(Math.max(percent, 0), 100);
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Bids</h1>

      {auctions.length === 0 ? (
        <p className="text-slate-500">You haven't placed any bids yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 ">
          {auctions.map((auction) => {
            const highestBid = auction.bids[0];
            const myBid = auction.bids.find((b) => b.user_id === user.id);
            const action = getAction(auction);

            const status = getStatus(auction);

            // time left
            const timeLeft = () => {
              if (!auction.end_date) return null;

              const diff = new Date(auction.end_date) - new Date();

              if (diff <= 0) return "Ended";

              const totalMinutes = Math.floor(diff / (1000 * 60));

              const days = Math.floor(totalMinutes / (60 * 24));
              const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
              const minutes = totalMinutes % 60;

              //
              if (days > 0) {
                return `${days}d ${hours}h`;
              }

              if (hours > 0) {
                return `${hours}h ${minutes}m`;
              }

              return `${minutes}m`;
            };

            return (
              <div
                key={auction.id}
                className={`
  group relative flex flex-col sm:flex-row gap-4 p-4 rounded-2xl
  transition-all duration-300 overflow-hidden
  ${
    status === "won"
      ? "bg-green-50 border border-green-200 ring-inset ring-green-300 shadow-green-100 shadow-lg"
      : "bg-white border border-slate-200 shadow-md hover:shadow-xl"
  }
`}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-transparent to-green-500/10 opacity-0 group-hover:opacity-100 transition" />

                {/* Image */}
                <div className="overflow-hidden rounded-xl w-full sm:w-40 h-40">
                  <img
                    src={auction.product?.image_url}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between flex-1 relative z-10">
                  {/* Top */}
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      {auction.product?.title}
                    </h2>

                    {/* Status Badge */}
                    <div className="mt-2">
                      {status === "winning" && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 shadow-sm">
                          Winning
                        </span>
                      )}

                      {status === "outbid" && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600 shadow-sm">
                          Outbid
                        </span>
                      )}

                      {status === "won" && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-600 shadow-sm">
                          Won
                        </span>
                      )}

                      {status === "lost" && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-500">
                          Lost
                        </span>
                      )}
                    </div>

                    {/* Prices */}
                    <div className="mt-3 text-sm text-slate-600 space-y-1">
                      <p>
                        <span className="font-medium">Highest:</span>{" "}
                        {highestBid?.amount} MAD
                      </p>
                      <p>
                        <span className="font-medium">Your bid:</span>{" "}
                        {myBid?.amount} MAD
                      </p>
                    </div>

                    {/*  Time */}
                    {auction.status === "active" && (
                      <p className="text-xs text-slate-500 mt-2">
                        ⏱️ Ends in {timeLeft()}
                      </p>
                    )}

                    {auction.status === "active" && (
                      <div className="mt-2">
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 transition-all duration-500"
                            style={{ width: `${getProgress(auction)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 🎯 Buttons */}
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {/* View */}
                    <button
                      onClick={() =>
                        navigate(`/auctions/${auction.id}`, {
                          state: { focusBid: true },
                        })
                      }
                      className="
    flex items-center gap-2
    px-4 py-2 text-sm font-medium
    rounded-lg border border-slate-300 text-slate-700
    bg-white hover:bg-slate-50
    hover:border-slate-400
    transition-all duration-200 hover:scale-105 active:scale-95
  "
                    >
                      {/* Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12H9m12 0c0 1.657-3.582 6-9 6s-9-4.343-9-6 3.582-6 9-6 9 4.343 9 6z"
                        />
                      </svg>
                      View
                    </button>

                    {/* Bid */}
                    {status === "outbid" && (
                      <button
                        onClick={() => navigate(`/auctions/${auction.id}`)}
                        className="
    flex items-center gap-2
    px-4 py-2 text-sm font-medium
    rounded-lg border border-red-400 text-red-600
    bg-white hover:bg-red-50 hover:border-red-500
    transition-all duration-200 hover:scale-105 active:scale-95
  "
                      >
                        {/* 💰 Icon */}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeWidth="2"
                            d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-12v12"
                          />
                        </svg>
                        Bid Again
                      </button>
                    )}

                    {/* Payment */}
                    {status === "won" && (
                      <button
                        // onClick={() => navigate(`/payment/${auction.id}`)}
                        className="
    flex items-center gap-2
    px-4 py-2 text-sm font-semibold
    rounded-lg
    bg-green-600 text-white
    hover:bg-green-700
    shadow-sm hover:shadow-md
    transition-all duration-200 hover:scale-105 active:scale-95
  "
                      >
                        {/* 💳 Icon */}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeWidth="2"
                            d="M3 10h18M7 15h1m4 0h5M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                          />
                        </svg>
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
