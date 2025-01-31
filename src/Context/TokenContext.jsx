import { createContext, useEffect } from 'react';
import { useState } from 'react';

 export const TokenContext = createContext();

export default function tokenContextProvider({children}){
    const [token, setToken] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    },[])

    return ( 
        <TokenContext.Provider value={{token, setToken}}>
                    {children}
            </TokenContext.Provider>
    )
       

    
}


    
