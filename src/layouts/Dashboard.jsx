import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
import useAllUsers from '../hooks/useAllUsers';
import useAuth from '../hooks/useAuth';
import { Fade } from 'react-awesome-reveal';

const Dashboard = () => {

    const [userRole, setUserRole] = useState([]);
    const [isUsers] = useAllUsers();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && isUsers && isUsers.length > 0) {
            const loggedInUserRole = isUsers.find(u => u.email === user?.email)?.role;
            setUserRole(loggedInUserRole ? [loggedInUserRole] : []);
        }
    }, [loading, isUsers, user]);

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();




    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button">Open SideBar</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        {isAdmin ? (
                            <>
                                <kbd className="kbd kbd-lg">Role: {userRole[0]}</kbd>
                                <Fade direction="right">
                                    <li><Link to="/dashboard/manageClasses">Manage Classes</Link></li>
                                    <li><Link to="/dashboard/manageUsers">Manage Users</Link></li>
                                    <li><Link to="/">Home Page</Link></li>
                                </Fade>



                            </>
                        ) : (
                            <>
                                {isInstructor ? (
                                    <>
                                        <kbd className="kbd kbd-lg">Role:{userRole[0]}</kbd>
                                        <Fade direction="right">
                                            <li><Link to="/dashboard/addClasses">Add Class</Link></li>
                                            <li><Link to="/dashboard/myClasses">My Class</Link></li>
                                            <li><Link to="/">Go Home</Link></li>
                                        </Fade>

                                    </>
                                ) : (
                                    <>
                                        <kbd className="kbd kbd-lg">Role:{userRole[0]}</kbd>
                                        <Fade direction="right">
                                            <li><Link to="/dashboard/selectedClasses">Selected Class</Link></li>
                                            <li><Link to="/">Go Home</Link></li>
                                        </Fade>

                                    </>
                                )}
                            </>
                        )}


                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;



