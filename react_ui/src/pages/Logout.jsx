import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout=()=>{
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }
    return handleLogout;
}

export default Logout;