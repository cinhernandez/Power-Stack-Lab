import React from 'react';

import CreateProgram from './CreateProgram';
import TrainingPrograms from './TrainingPrograms';
import 'tailwindcss/tailwind.css';
import Exercises from './Exercises';



const Dashboard = ({user, isLoggedIn, setIsLoggedIn}) => {
    const programData = [
    
    ];

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="uppercase text-3xl font-bold mb-8 text-center text-red-500"> 
            Welcome to your Dashboard</h1>
            <div className="w-full max-w-l">
                {/* <Exercises  /> */}
            </div>
            
            <div className="w-full max-w-l">
            <CreateProgram programs={programData} />
            </div>
        </div>
    )
}

export default Dashboard