import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const NavBar = () => {
    const { user, logOut } = useAuth();
    const signOut = () => {
        logOut().then(() => {

        }).catch(err => console.log(err.message));
    }
    console.log(user);
    const navMenu = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/displayInstructor">Instructors</Link></li>
        <li><Link to="/displayClasses">Classes</Link></li>
        {user && <li><Link to="/dashboard">Dashboard </Link></li>}
    </>
    return (
        <>
            <div className="navbar bg-base-100">
                <Link to="/" className="btn btn-ghost normal-case text-xl">Language School</Link>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <img src={user?.photoURL} />
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navMenu}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navMenu}
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user?.photoURL} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {user ? <>
                            <li>
                                <Link className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><button onClick={signOut}>Logout</button></li>
                        </> : <>
                            <li><Link to="/login">Login</Link></li>
                        </>}

                    </ul>
                </div>
            </div>

        </>
    );
};

export default NavBar;