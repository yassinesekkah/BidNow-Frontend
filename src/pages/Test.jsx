import { useEffect, useState } from "react";
import { useCounter } from "../context/CounterContext";

function Test() {

  const {count, increment} = useCounter();

  useEffect(() => {
    console.log("🔥 useEffect run");
  });

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
    </div>
  );
}
export default Test;
