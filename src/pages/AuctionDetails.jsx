import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuction } from "../services/auctionService";
import BidForm from "../components/BidForm";
import { placeBid } from "../services/auctionService";

function AuctionDetails() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    getAuction(id)
      .then((res) => {
        console.log("auction:", res.data);
        setAuction(res.data.auction);
        setBids(res.data.latest_bids);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if(!token){
      alert("You must login first");
      return;
    }

    const currentPrice = auction.current_highest_bid ?? auction.starting_price;

    if (bidAmount <= currentPrice) {
      alert("Bid must be higher than current price");
      return;
    }

    try{
      const res = await placeBid(id, { amount: bidAmount});

      const NewBid = res.data.bid;

      //khasek tzid tefham 3lach ...
      setBids((prev) => [NewBid, ...prev]);

      setAuction({
        ...auction,
        current_highest_bid: NewBid.amount,
      });

      //reset input
      setBidAmount("");

    }catch(err){
      console.log(err);
      alert("Error placing bid");
    }
  };

  if (!auction) return <p>Loading...</p>;


  return (
    <div>
      <h1>{auction.product?.title}</h1>

      <p>
        <strong>Starting Price:</strong> {auction.starting_price}
      </p>
      <p>
        <strong>Reserve Price:</strong> {auction.reserve_price}
      </p>

      <p>
        <strong>Current Price:</strong>
        {auction.current_highest_bid ?? auction.starting_price}
      </p>

      <p>
        <strong>Status:</strong> {auction.status}
      </p>

      <p>
        <strong>Start Date:</strong> {auction.start_date}
      </p>
      <p>
        <strong>End Date:</strong> {auction.end_date}
      </p>

      <BidForm
        auction={auction}
        bidAmount={bidAmount}
        setBidAmount={setBidAmount}
        handleBid={handleBid}
      />
    </div>
  );
}
export default AuctionDetails;
