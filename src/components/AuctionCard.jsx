import { Link } from "react-router-dom";

function AuctionCard({ auction }) {
  return (
    <Link to={`/auction/${auction.id}`}>
      <div>
        <h2>{auction.product?.title}</h2>
        <p>Price: {auction.starting_price} </p>
      </div>
    </Link>
  );
}
export default AuctionCard;
