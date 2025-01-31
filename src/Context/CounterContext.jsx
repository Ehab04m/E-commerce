import { useState } from "react";
import { createContext } from "react";
export const CounterContext = createContext(0);
export default function CounterProvider(props) {
    const [counter, setCounter] = useState(10)
  return <CounterContext.Provider value={{counter}}>
    {props.children}

  </CounterContext.Provider>;
}

