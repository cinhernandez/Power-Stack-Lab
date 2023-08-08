import React, {useEffect,  useContext } from 'react';  
import { AppContext } from '../AppContext';
import LiftProgressUpdate from './LiftProgressUpdate';


const LiftProgress = () => {
  const { lifts, setLifts, setEditingLiftProgress, setIsEditingLift, isEditingLift } = useContext(AppContext);


    useEffect(() => {
        fetch('/lift_sets')
        .then(res => res.json())
        .then((data) => setLifts(data))
        .catch(err => console.log(err));
    }, []);

    const handleDelete = (liftId) => {
        fetch(`/lift_sets/${liftId}`, {
            method: 'DELETE',
        })
        .then((res) => res.json())
        .then((data) => {
          setLifts((prevLifts) => {
            const updatedLifts = prevLifts.filter((lift) => lift.id !== liftId);
            return updatedLifts;
          });
        })
        .catch(err => console.log(err));
    };
  

    

    return(
      <div className="bg-gradient-animation min-h-screen flex flex-col justify-start items-center ">
      <div className="mt-8 text-center">
     
        <div className="mb-4">
        </div>

        {lifts.map((lift) => (
          <div key={lift.id} className="flex flex-col items-center mt-10 p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Lift Progress</h2>
            <p className="text-xl font-bold mb-4 text-center text-black">{lift.name}</p>
            <p className="text-xl font-bold mb-4 text-center text-black">Weight: {lift.weight_lifted} lbs</p>
            <p className="text-xl font-bold mb-4 text-center text-black">Sets: {lift.set_number}</p>
            <p className="text-xl font-bold mb-4 text-center text-black">Reps: {lift.reps}</p>
            <p className="text-xl font-bold mb-4 text-center text-black">Notes: {lift.notes}</p>
            <p className="text-xl font-bold mb-4 text-center text-black">Date: {lift.date}</p>
            <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => handleDelete(lift.id)}
              className="bg-gradient-to-r from-red-500 to-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Delete
            </button>
            <button
              onClick={() => {
              setEditingLiftProgress(lift)
              setIsEditingLift(true);
              }}
              className="bg-gradient-to-r from-red-500 to-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Edit
            </button>
            {isEditingLift && <LiftProgressUpdate onClose={() => setIsEditingLift(false)} />}
              
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default LiftProgress;