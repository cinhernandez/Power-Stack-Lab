import React from 'react';
import 'tailwindcss/tailwind.css';


import LiftProgress from './LiftProgress';
import MaxLifts from './MaxLifts';



const Dashboard = () => {



    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="uppercase text-3xl font-bold mb-8 text-center text-red-500"> 
            Welcome to your Dashboard</h1>

            <div className="gap-10 colums-2 flex justify-center space-x-12"> 
                <div className=" shadow-inner w-full max-w-l">
                    <MaxLifts />
                </div>
                <div className=" shadow-inner w-full max-w-l flex flex-col items-center mt-10 ">
               
                    <LiftProgress  />
           
                </div>
            </div>
        </div>
        
    )
}

export default Dashboard