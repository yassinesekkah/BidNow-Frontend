import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: ""});
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await login(form);

            //store token
            localStorage.setItem("token", res.data.token);

            //getUser
            setUser(res.data.user);

            navigate("/");
        }catch(err){
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email"
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value})} 
            />

            <input 
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value})}
             />

             <button type="submit">
                Login
             </button>
        </form>
    );
}