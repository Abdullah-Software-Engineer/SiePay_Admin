import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { useGetUser } from "../api/queries";

function ProtectedRoute({
    children,
    redirectUrl = "/",
}: {
    children: ReactNode;
    redirectUrl?: string;
}) {
    const { token, clearAuth } = useAuth();
    const { data: user, isLoading, isError, error } = useGetUser();

    // If no token, redirect immediately
    if (!token) {
        return <Navigate to={redirectUrl} replace={true} />;
    }

    // Show loading state while fetching user data
    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with your loading component
    }

    // If there's an error (like 401 Unauthorized), clear auth and redirect
    if (isError) {
        // Check if it's an authentication error
        if (error && 'status' in error && (error.status === 401 || error.status === 403)) {
            clearAuth();
            return <Navigate to={redirectUrl} replace={true} />;
        }
        // For other errors, you might want to show an error page or retry
        return <div>Something went wrong. Please try again.</div>;
    }

    // If we have user data, render the protected content
    if (user) {
        return children;
    }

    // Fallback - if we have token but no user data (shouldn't happen normally)
    return <Navigate to={redirectUrl} replace={true} />;
}

export default ProtectedRoute;
