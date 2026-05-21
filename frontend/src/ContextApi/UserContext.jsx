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
                "http://localhost:3000/api/auth/user",
                { withCredentials: true }
            );

            setUser(res.data.user);

        } catch (err) {
            setUser(null);
            console.log(err.response?.data || err.message);

        } finally {
            setLoading(false); // 🔥 MUST
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
        <userContext.Provider value={{ user, setUser, loading, FetchCurrentUser }}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;