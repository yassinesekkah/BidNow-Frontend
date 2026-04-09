import { createContext, useContext, useState } from "react";


const CounterContext = createContext();

export function CounterProvider({ children }){  

    const [count, setCount] = useState(0);

    //increment function
    const increment = () => setCount( count + 1);

    return (
        <CounterContext.Provider values={{ count, increment }}> //khas tefham 3lach 2 a9wass
            { children }
        </CounterContext.Provider>
    )

}
export const useCounter = () => useContext(CounterContext)