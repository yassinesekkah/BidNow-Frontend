function AuctionCard({ auction }) {
  return (
    <div>
      <h2>{auction.product?.title}</h2>
      <p>Price: {auction.starting_price} </p>
    </div>
  );
}
export default AuctionCard;
