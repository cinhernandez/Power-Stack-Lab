import React from 'react';
import 'tailwindcss/tailwind.css';
import FitnessForm from './FitnessForm';

import { useHistory } from 'react-router-dom';
import LiftProgress from './LiftProgress';
import MaxLifts from './MaxLifts';



const Dashboard = ({user, isLoggedIn, setIsLoggedIn}) => {

    
   
    
    const programData = [
    
    ];

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="uppercase text-3xl font-bold mb-8 text-center text-red-500"> 
            Welcome to your Dashboard</h1>
            
            
            <div className="w-full max-w-l">
            <MaxLifts />
            </div>
            <div className="flex flex-col items-center mt-10">
            <LiftProgress />
            </div>

        </div>
        
    )
}

export default Dashboard