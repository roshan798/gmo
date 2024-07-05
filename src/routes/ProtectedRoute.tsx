import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import RedirectWithDelay from "../components/RedirctWithDelay";
import { User } from "../types/index";

const ProtectedRoute: React.FC = () => {
    // console.log("protected route rendered");
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser: User = JSON.parse(userData);
            setUser(parsedUser);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return <Outlet />;
    }
    else {
        return <RedirectWithDelay
            to="/login"
            loadingMessage="Please log in to continue. Redirecting to the login page shortly..."
            delay={3000} />;

    }

};

export default ProtectedRoute;
