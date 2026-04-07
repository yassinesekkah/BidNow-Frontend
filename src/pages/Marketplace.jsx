import { useEffect, useState } from "react";
import { getAuctions } from "../services/auctionService";
import AuctionCard from "../components/AuctionCard";

function Marketplace() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAuctions()
      .then((res) => {
        console.log("Api data", res.data);

        setAuctions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Something went wrong");
        setLoading(false);
        console.error("Error", err);
      });
  }, []);

    if(loading){
      return <p>Loading...</p>
    }

    if(error){
      return <p>{error}</p>
    }

  return (
    <>
      <h1>Marketplace</h1>

      {auctions.map((a) => (
        <AuctionCard key={a.id} auction={a} />
      ))}
    </>
  );
}
export default Marketplace;
