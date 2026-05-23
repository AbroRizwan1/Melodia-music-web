import axios from "axios";
import {
    createContext,
    useEffect,
    useState
} from "react";
import { useNavigate } from "react-router";

export const userContext = createContext();

const UserContext = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const FetchCurrentUser = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/auth/user`,
                { withCredentials: true }
            );
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
            console.log(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/logout`,
                {},
                { withCredentials: true }
            );
        } catch (error) {
            console.log(error);
        } finally {
            setUser(null);
            navigate("/");
        }
    };


    useEffect(() => {
        if (!loading && user) {
            if (user.role === "artist") {
                navigate("/upload");
            } else {
                navigate("/home");
            }
        }
    }, [user, loading]);

    return (

        <userContext.Provider value={{ user, setUser, loading, FetchCurrentUser, logout }}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;