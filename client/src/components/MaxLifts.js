import React, {useEffect, useContext} from 'react';
import { AppContext } from '../AppContext';
import UpdateMaxLifts from './UpdateMaxLifts';

const MaxLifts = () => {
    const { maxLifts, setMaxLifts, isEditing, setEditingMaxLift, setIsEditing } = useContext(AppContext);

    useEffect(() => {
        fetch('/max_lifts')
        .then(res => res.json())
        .then((data) => setMaxLifts(data))
        .catch(err => console.log(err));
    }, []);

    const handleDelete = (maxLiftId) => {
        fetch(`/max_lifts/${maxLiftId}`, {
            method: 'DELETE',
        })
        .then((res) => res.json())
        .then((data) => {
            setMaxLifts((prevMaxLifts) => {
                const updatedMaxLifts = prevMaxLifts.filter((maxLift) => maxLift.id !== maxLiftId);
                return updatedMaxLifts;
            });
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="bg-gradient-animation min-h-screen flex flex-col justify-start items-center">
        <div className="mt-8 text-center">
       
          <div className="mb-4">
          </div>

          {maxLifts.map((maxLift) => (
          <div key={maxLift.id} className="flex flex-col items-center mt-10 p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Max Lifts</h2>
            <p className="text-xl font-bold mb-4 text-center text-black">Squat Max: {maxLift.squat_max} lbs</p>
            <p className="text-xl font-bold mb-4 text-center text-black">Bench Max: {maxLift.bench_max} lbs</p>
            <p className="text-xl font-bold mb-4 text-center text-black">Deadlift Max: {maxLift.deadlift_max} lbs</p>
            <p className="text-xl font-bold mb-4 text-center text-black">Date: {maxLift.date}</p>
            <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => handleDelete(maxLift.id)}
              className="bg-gradient-to-r from-red-500 to-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Delete
            </button>
            <button
              onClick={() => {
              setEditingMaxLift(maxLift);
              setIsEditing(true);
            }}
              className="bg-gradient-to-r from-red-500 to-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Edit
            </button>
          
         
            </div>
          </div>
        ))}
        {isEditing && <UpdateMaxLifts onClose={() => setIsEditing(false)} />}

          </div>
          </div>
    )
}

export default MaxLifts