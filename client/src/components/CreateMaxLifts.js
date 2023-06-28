import React, { useState } from 'react';



const CreateMaxLifts = () => {
  const [date, setDate] = useState('');
  const [squatMax, setSquatMax] = useState('');
  const [benchMax, setBenchMax] = useState('');
  const [deadliftMax, setDeadliftMax] = useState('');
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

      // Reset form fields
    const payload = {
        date,
        squatMax: parseFloat(squatMax),
        benchMax: parseFloat(benchMax),
        deadliftMax: parseFloat(deadliftMax),

    }

    
  try {
    // Make a POST request to the backend endpoint
    const response = await fetch('/create/max_lifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      // Reset form fields
      setDate('');
      setSquatMax('');
      setBenchMax('');
      setDeadliftMax('');
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    console.error(error);
  }
};
  

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg  ">
    <h2 className="text-2xl font-bold mb-4 text-center text-black">Max Lifts</h2>
    <div className="mb-4 space-y-4">
    <form onSubmit={handleSubmit}>
      <label htmlFor="exercise" className="block text-sm font-medium">Date:</label>
      <input
        type="text"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <label htmlFor="weightLifted" className="block text-sm font-medium">Squat Max:</label>
      <input
        type="text"
        id="squatMax"
        value={squatMax}
        onChange={(e) => setSquatMax(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <label htmlFor="setNumber" className="block text-sm font-medium">Bench Max:</label>
      <input
        type="text"
        id="benchMax"
        value={benchMax}
        onChange={(e) => setBenchMax(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <label htmlFor="reps" className="block text-sm font-medium">Deadlift Max:</label>
      <input
        type="text"
        id="deadliftMax"
        value={deadliftMax}
        onChange={(e) => setDeadliftMax(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />


      <button type="submit" className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Submit</button>
    </form>
    </div>
    </div>
    </div>
  );
  };

export default CreateMaxLifts;
