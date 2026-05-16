import { useContext } from "react";
import { authContext } from "../auth.context";
import { login, register } from "../services/auth.api";

export const useAuth =  ()=>{
    const context = useContext(authContext);
    
    const {user, setUser, loading, setLoading} = context;

    const handleLogin = async (username, password)=>{
        setLoading(true);
        const res = await login(username, password);
        setUser(res.user);
        setLoading(false);
        return res;
    }

    const handleRegister = async (username, email, password)=>{
        setLoading(true);
        const res = await register(username, email, password);
        setUser(res.user);
        setLoading(false);
    }

    return {
        user, loading, handleLogin, handleRegister
    }
}