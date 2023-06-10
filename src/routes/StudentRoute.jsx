import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useStudent from '../hooks/useStudent';

const StudentRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth();
    const [isStudent,isStudentLoading] = useStudent();

    if (loading || isStudentLoading) {
        return <div>Loading...</div>
    }
    if (user && isStudent) {
        return children;
    }

    return <Navigate to="/" state={{from:location}} replace></Navigate>
};

export default StudentRoute;