import React, { useState } from 'react';
import axios from 'axios';



const FitnessForm = () => {
  const [exercise, setExercise] = useState('');
  const [weightLifted, setWeightLifted] = useState('');
  const [setNumber, setSetNumber] = useState('');
  const [reps, setReps] = useState('');
  const [notes, setNotes] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create payload object with form data
    const payload = {
      exercise,
      weight_lifted: parseFloat(weightLifted),
      set_number: parseInt(setNumber),
      reps: parseInt(reps),
      notes,
    };

      // Reset form fields
      setExercise('');
      setWeightLifted('');
      setSetNumber('');
      setReps('');
      setNotes('');
  
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg  ">
    <h2 className="text-2xl font-bold mb-4 text-center text-black">Track Powerlifting Progress</h2>
    <div className="mb-4 space-y-4">
    <form onSubmit={handleSubmit}>
      <label htmlFor="exercise" className="block text-sm font-medium">Exercise:</label>
      <input
        type="text"
        id="exercise"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <label htmlFor="weightLifted" className="block text-sm font-medium">Weight Lifted:</label>
      <input
        type="text"
        id="weightLifted"
        value={weightLifted}
        onChange={(e) => setWeightLifted(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <label htmlFor="setNumber" className="block text-sm font-medium">Sets:</label>
      <input
        type="text"
        id="setNumber"
        value={setNumber}
        onChange={(e) => setSetNumber(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <label htmlFor="reps" className="block text-sm font-medium">Reps:</label>
      <input
        type="text"
        id="reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <label htmlFor="notes" className="block text-sm font-medium">Notes:</label>
      <textarea
        id="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      ></textarea>

      <button type="submit" className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Submit</button>
    </form>
    </div>
    </div>
    </div>
  );
};

export default FitnessForm;
