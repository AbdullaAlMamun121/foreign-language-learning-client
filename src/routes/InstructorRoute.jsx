import React from 'react';
import { useLocation } from 'react-router-dom';
import useInstructor from '../hooks/useInstructor';
import useAuth from '../hooks/useAuth';

const InstructorRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();

    if (loading || isInstructorLoading) {
        return <div>Loading...</div>
    }
    if (user && isInstructor) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default InstructorRoute;