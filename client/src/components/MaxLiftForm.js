import React, { useContext } from "react";
import { AppContext } from '../AppContext';


const MaxLiftForm = () => {
    const {squatMax, setSquatMax, benchMax, setBenchMax, deadliftMax, setDeadliftMax, setMaxLifts, date, setDate} = useContext(AppContext);


    const handleCreate = () => {

        const newMaxLift = {
            squat_max: parseFloat(squatMax),
            bench_max: parseFloat(benchMax),
            deadlift_max: parseFloat(deadliftMax),
            date
    };

        fetch('/max_lifts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMaxLift),
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((createdMaxLift) => {
        setMaxLifts((prevMaxLifts) => [...prevMaxLifts, createdMaxLift]);
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleCreate();

        // Reset form fields
        setSquatMax('');
        setBenchMax('');
        setDeadliftMax('');
        setDate('');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-black animated-gradient">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg  ">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Track One Rep Max</h2>
        <div className="mb-4 space-y-4">
        <form onSubmit={handleSubmit}>
          <label htmlFor="squatMax" className="block text-sm font-medium">Squat Max:</label>
          <input
            type="text"
            id="setSquatMax"
            value={squatMax}
            onChange={(e) => setSquatMax(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
    
          <label htmlFor="benchMax" className="block text-sm font-medium">Bench Max:</label>
          <input
            type="text"
            id="setBenchMax"
            value={benchMax}
            onChange={(e) => setBenchMax(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
    
          <label htmlFor="deadliftMax" className="block text-sm font-medium">Deadlift Max:</label>
          <input
            type="text"
            id="setDeadliftMax"
            value={deadliftMax}
            onChange={(e) => setDeadliftMax(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
    
          <label htmlFor="date" className="block text-sm font-medium">Date:</label>
          <input
            type="date"
            id="setDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></input>
    
        
          <div className='w-full border-b border-white mb-4'></div>
          <button 
          type="submit" className="w-full bg-gradient-to-r from-red-500 to-black text-white font-semibold py-2 px-4 rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >Submit
          </button>
        </form>
        </div>
        </div>
        </div>
    )

}

export default MaxLiftForm