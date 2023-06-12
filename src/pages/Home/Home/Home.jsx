import React from 'react';
import Header from './Header';
import JoinTeam from './JoinTeam';
import PopularInstructor from './PopularInstructor';
import PopularClasses from './PopularClasses';



const Home = () => {
  
    return (
        <div>
            
            <Header></Header>
            <PopularInstructor></PopularInstructor>
            <PopularClasses></PopularClasses>
            <JoinTeam></JoinTeam>
        </div>
    );
};

export default Home;