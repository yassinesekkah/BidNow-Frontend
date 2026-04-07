import { useEffect, useState } from "react";
import { getAuctions } from "../services/auctionService";

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
        <div key={a.id}>
          <h2>{a.product?.title}</h2>
          <p>Price: {a.starting_price} </p>
        </div>
      ))}
    </>
  )
}
export default Marketplace;
