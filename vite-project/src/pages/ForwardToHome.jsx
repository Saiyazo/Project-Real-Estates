import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForwardToHome = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
     
        navigate('/home', { replace: true }); 
    }, [navigate])

    return  <h2>ForwardToHome page</h2>
}
 
export default ForwardToHome