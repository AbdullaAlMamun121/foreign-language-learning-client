import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Shared/NavBar/NavBar';
import Footer from '../pages/Home/Home/Footer';


const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;