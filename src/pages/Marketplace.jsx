import { useEffect, useState } from "react";
import { getAuctions } from "../services/auctionService";
import AuctionCard from "../components/AuctionCard";

function Marketplace(){
  
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    getAuctions()
      .then((res) => {
        console.log("Api data", res.data);

        setAuctions(res.data);
      })
      .catch((err) => {
        console.error("Error", err);
      })
  }, []);

  return (
    <>
      <h1>Marketplace</h1>

      {auctions.map((a) => (
        <AuctionCard key={a.id} auction={a} />
      ))}
    </>
  )
}
export default Marketplace;
