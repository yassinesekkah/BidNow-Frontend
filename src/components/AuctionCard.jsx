import { Link } from "react-router-dom";

function AuctionCard({ auction }) {
  const currentPrice = auction.current_highest_bid ?? auction.starting_price;
  const status = auction.status?.toLowerCase() || "ended";

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount || 0);

  return (
    <Link
      to={`/auctions/${auction.id}`}
      className="group block animate-fade-in-up"
      aria-label={`View ${auction.product?.title || "auction"}`}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-cyan-100">
          {auction.product?.image_url ? (
            <img
              src={auction.product.image_url}
              alt={auction.product?.title || "Auction product"}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-4xl font-semibold text-indigo-500/70">
                {(auction.product?.title || "B").charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <span
            className={`status-pill absolute right-3 top-3 ${
              status === "active"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="space-y-3 p-5 text-left">
          <h2 className="truncate font-display text-lg font-semibold text-slate-900">
            {auction.product?.title || "Untitled Auction"}
          </h2>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Current price
            </p>
            <p className="text-2xl font-bold text-indigo-600">
              {formatPrice(currentPrice)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default AuctionCard;
