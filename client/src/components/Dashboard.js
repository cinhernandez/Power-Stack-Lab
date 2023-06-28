import React from 'react';

import CreateProgram from './CreateProgram';
import TrainingPrograms from './FitnessForm';
import 'tailwindcss/tailwind.css';
import FitnessForm from './FitnessForm';
import MaxLift from './MaxLift';
import { useHistory } from 'react-router-dom';



const Dashboard = ({user, isLoggedIn, setIsLoggedIn}) => {

    
   
    
    const programData = [
    
    ];

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="uppercase text-3xl font-bold mb-8 text-center text-red-500"> 
            Welcome to your Dashboard</h1>
            <div className="w-full max-w-l">
               <FitnessForm programData={programData} />
            </div>
            
        <div className="flex flex-col items-center mt-10 " >
       
        <MaxLift />
            </div>
        </div>
        
    )
}

export default Dashboard