import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/authService";

//hna kandiro l creation dyal context
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem("token");

        if(!token){
            setLoading(false);
            return;
        }

        try{
            const res = await getUser();
            setUser(res.data);
        }catch(err){
            console.log(err);
            localStorage.removeItem("token");
            setUser(null);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
};