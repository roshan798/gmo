import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../types/index";
import RedirectWithDelay from "../components/RedirctWithDelay";

const PublicRoute: React.FC = () => {
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
        return (
            <RedirectWithDelay
                to="/"
                delay={2000}
                loadingMessage="You are already logged in. Redirecting to the home page..."
            />
        );
    }

    return <Outlet />;
};

export default PublicRoute;
