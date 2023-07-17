import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

const FitnessForm = () => {
  const { name, setName, date, setDate, weightLifted, setWeightLifted, setNumber, setSetNumber, reps, setReps, notes, setNotes, setLifts } = useContext(AppContext);


  const handleCreate = () => {

    const newLift = {
      name,
      weight_lifted: parseFloat(weightLifted),
      set_number: parseInt(setNumber),
      reps: parseInt(reps),
      notes,
      date
    };

    fetch('/lift_sets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLift),
        credentials: 'include',
    })
    .then((res) => res.json())
    .then((createdLift) => {
        setLifts((prevLifts) => [...prevLifts, createdLift]);
    })
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreate();


      // Reset form fields
    setName('');
    setWeightLifted('');
    setSetNumber('');
    setReps('');
    setNotes('');
    setDate('');
  
  };

    return (
    <div className="flex items-center justify-center h-screen bg-black">
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg  ">
    <h2 className="text-2xl font-bold mb-4 text-center text-black">Track Powerlifting Progress</h2>
    <div className="mb-4 space-y-4">
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" className="block text-sm font-medium">Exercise:</label>
      <select
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select an exercise</option>
        <option value="squat">Squat</option>
        <option value="bench_press">Bench Press</option>
        <option value="deadlift">Deadlift</option>
      </select>

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
        id="setReps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <label htmlFor="notes" className="block text-sm font-medium">Notes:</label>
      <textarea
        type="text"
        id="setNotes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      ></textarea>

      <label htmlFor="date" className="block text-sm font-medium">Date:</label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
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

export default FitnessForm;
