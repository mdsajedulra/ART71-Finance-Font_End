
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";


const PrivateRoutes = ({Component}) => {

    const dispatch = useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

dispatch()

    return isAuthenticated?<Component/>:<Navigate to="/login" />
};

export default PrivateRoutes;