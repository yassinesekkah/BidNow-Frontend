function BidForm({
  auction,
  bidAmount,
  setBidAmount,
  handleBid,
  isAuthenticated,
  message,
  isSubmitting,
}) {
  const currentPrice = auction.current_highest_bid ?? auction.starting_price;

  if (auction.status !== "active") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
            Auction Ended
          </p>
          <p className="text-slate-600">This auction is no longer active</p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleBid}
      className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-md"
    >
      <div className="space-y-2">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Place Your Bid
        </h2>
        <p className="text-sm text-slate-600">
          Current price is{" "}
          <span className="font-semibold text-indigo-600">{currentPrice}</span>
        </p>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="bid-amount"
          className="block text-sm font-semibold text-slate-700"
        >
          Bid amount
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0v3h3v-3m0 6.75a.75.75 0 100-1.5.75.75 0 000 1.5m0 2.25a.75.75 0 100-1.5.75.75 0 000 1.5m0 2.25a.75.75 0 100-1.5.75.75 0 000 1.5m3-4.5a.75.75 0 100-1.5.75.75 0 000 1.5m0 2.25a.75.75 0 100-1.5.75.75 0 000 1.5m0 2.25a.75.75 0 100-1.5.75.75 0 000 1.5m0 2.25a.75.75 0 100-1.5.75.75 0 000 1.5" />
            </svg>
          </div>
          <input
            id="bid-amount"
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Enter your bid amount"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 disabled:bg-slate-100 disabled:text-slate-500"
            min={Number(currentPrice) + 1}
            disabled={!isAuthenticated || isSubmitting}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isAuthenticated || isSubmitting}
        className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-3.5 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/40 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Placing bid...
          </span>
        ) : (
          "Place Bid"
        )}
        <div className="absolute inset-0 z-[-1] bg-gradient-to-r from-indigo-700 to-cyan-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </button>

      {!isAuthenticated && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-sm font-medium text-amber-900">Sign in to bid</p>
          <p className="mt-1 text-xs text-amber-700">
            You need to log in to participate in auctions.
          </p>
        </div>
      )}

      {message?.text && (
        <div
          className={`flex items-start gap-2 rounded-xl p-4 text-sm font-medium border ${
            message.type === "error"
              ? "bg-red-50 text-red-800 border-red-100"
              : "bg-emerald-50 text-emerald-800 border-emerald-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`mt-0.5 h-5 w-5 shrink-0 ${message.type === "error" ? "text-red-500" : "text-emerald-500"}`}
          >
            {message.type === "error" ? (
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            )}
          </svg>
          <span>{message.text}</span>
        </div>
      )}
    </form>
  );
}

export default BidForm;
