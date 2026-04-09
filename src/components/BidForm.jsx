function BidForm({ auction, bidAmount, setBidAmount, handleBid }) {
  const currentPrice =
    auction.current_highest_bid ?? auction.starting_price;

  if (auction.status !== "active") {
    return <p>Auction is not active</p>;
  }

  return (
    <div>
      <h2>Place a Bid</h2>

      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your bid"
      />

      <button onClick={handleBid}>Bid</button>
    </div>
  );
}

export default BidForm;