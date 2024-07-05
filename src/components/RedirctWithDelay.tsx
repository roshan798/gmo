import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { RedirecPropType } from "../types/index";

const RedirectWithDelay: React.FC<RedirecPropType> = ({ to, delay, loadingMessage }) => {
    const [loading, setLoading] = useState(true);
    const [seconds, setSeconds] = useState(delay / 1000);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, delay);

        const countdown = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdown);
        };
    }, [delay]);

    if (loading) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                padding={2}
            >
                <Typography variant="h6" gutterBottom>
                    {loadingMessage}
                </Typography>
                <CircularProgress />
                <Typography variant="body1" marginTop={2}>
                    Redirecting in {seconds} seconds...
                </Typography>
            </Box>
        );
    }

    return <Navigate to={to} />;
};

export default RedirectWithDelay;
