import { useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { userContext } from "../ContextApi/UserContext";
import Loader from "./Loader";

function ProtectedRoute({ children, artistOnly = false }) {
    const { user, loading } = useContext(userContext);

    if (loading) return <Loader />;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (artistOnly && user?.role !== "artist") {
        return <Navigate to="/" replace />;
    }

    return children;
}



export default ProtectedRoute;