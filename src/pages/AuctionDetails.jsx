import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuction } from "../services/auctionService";

function AuctionDetails() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  

  useEffect(() => {
    getAuction(id)
      .then((res) => {
        console.log("auction:", res.data);
        setAuction(res.data.auction);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!auction) return <p>Loading...</p>;

  return (
    <div>
      <h1> {auction.product?.title} </h1>
      <p>Price: {auction.current_price} </p>
    </div>
  );
}
export default AuctionDetails;
