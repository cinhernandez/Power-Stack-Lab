import React, { useEffect, useState } from 'react';
import CreateMaxLifts from './CreateMaxLifts';


const MaxLift = () => {
  const [maxLifts, setMaxLifts] = useState([]);

  useEffect(() => {
    fetch('/max_lifts')
        .then((response) => response.json())
        .then((data) => setMaxLifts(data))
        .catch((error) => console.log(error));

    }, []);


    const handleCreateMaxLift = (newMaxLift) => {
        fetch('/create/max_lift', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMaxLift),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Max Lift created successfully:', data);
    
            setMaxLifts((prevMaxLift) => [data, ...prevMaxLift]); // Add the new job at the beginning of the jobs array
          })
          .catch((error) => {
            console.log('Error creating the Max Lift:', error);
          });
      };


  return (
    <div className="bg-gradient-animation min-h-screen flex flex-col justify-start items-center bg-red-500">
       <CreateMaxLifts handleCreateMaxLift={handleCreateMaxLift} />
        <div className="mt-8 text-center">
            <div className="mb-4">
            <h2 className="text-xl ftext-xl font-bold">Max Lifts</h2>
        <table className="w-full">
        <tbody>
          {maxLifts.map((lift) => (
            <div key={lift.id} className="bg-white rounded shadow p-4 m-4">
              <p className="py-2 bg-white rounded shadow p-4 m-4">Date: {lift.date}</p>
              <p className="py-2">Squat Max  {lift.squat_max} lbs</p>
              <p className="py-2">Bench Max: {lift.bench_max} lbs</p>
              <p className="py-2">Deadlift Max: {lift.deadlift_max} lbs</p>
            </div>
          ))}
        </tbody>
      </table>

   
    </div>
    </div>
    </div>
  );
};

export default MaxLift;
