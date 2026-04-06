import { useEffect, useState } from "react";
import { getAuctions } from "../services/auctionService";
import { useCounter } from "../context/CounterContext";

function MarketPlace() {
  ///fin ghadi nhato data dyal api
  const [auctions, setAuctions] = useState([]);

  //kayekhdam mnin teftah lpage
  useEffect(() => {
    //api call mn service
    getAuctions()
      .then((res) => {
        //save data on state wghadi y3awed render
        setAuctions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    console.log(auctions);

    const { count, increment } = useCounter();

  return (
    <div>
        <h1>MarketPlace</h1>
        {auctions.map((auction) => (
            <div key={auction.id}>
                <h2>{auction.product.title}</h2>
                <p>{auction.winner_id}</p>
            </div>
        ))}
        <p>{count}</p>
        <button onClick={increment}>+</button>
    </div>
  )
}
export default MarketPlace;
