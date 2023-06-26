import React, {useState} from 'react';

function CreateProgram() {
    const[name, setName] = useState('');
    const[duration, setDuration] = useState('');
    const[frequency, setFrequency] = useState('');
    const[squatMax, setSquatMax] = useState('');
    const[benchMax, setBenchMax] = useState('');
    const[deadliftMax, setDeadliftMax] = useState('');
  

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleFrequencyChange = (e) => {
    setFrequency(e.target.value);
  };

  const handleSquatChange = (e) => {
    setSquatMax(e.target.value);
  };
  const handleDeadliftChange = (e) => {
    setDeadliftMax(e.target.value);
  };
  const handleBenchChange = (e) => {
    setBenchMax(e.target.value);
  };

  const handleCreateProgram = () => {
    const newProgram = {
      name,
      duration,
      frequency,
      squatMax,
      benchMax,
      deadliftMax,
    };

    // Validation logic
    for (const field in newProgram) {
      if (!newProgram[field]) {
        alert(`Please fill in the ${field}.`);
        return;
      }
    }
 
  
  // if (typeof squatMax !== 'number' || squatMax <= 0) {
  //     alert('Please enter a valid squatMax.');
  //     return;
  //   }
  
  // if (typeof benchMax !== 'number' || benchMax <= 0) {
  //     alert('Please enter a valid benchMax.');
  //     return;
  //   }
  
  // if (typeof deadliftMax !== 'number' || deadliftMax <= 0) {
  //     alert('Please enter a valid deadliftMax.');
  //     return;
  //   }

    const program = [];
    const initialIntensity = 60;  // Initial intensity as percentage of max
    const finalIntensity = 50;  // Final intensity as percentage of max
    const intensityIncrease = (initialIntensity - finalIntensity) / (duration - 2);  // Amount to increase intensity each week
  
    const initialVolume = [5, 8];  // Initial volume as [sets, reps]
    const finalVolume = [3, 2];  // Final volume as [sets, reps]
    const volumeDecrease = [(initialVolume[0] - finalVolume[0]) / (duration - 2), (initialVolume[1] - finalVolume[1]) / (duration - 2)];  // Amount to decrease volume each week
  
    for (let week = 1; week <= duration; week++) {
      const weekIntensity = week < duration ? initialIntensity + intensityIncrease * (week - 1) : finalIntensity;
      const weekVolume = week < duration ? [Math.ceil(initialVolume[0] - volumeDecrease[0] * (week - 1)), Math.ceil(initialVolume[1] - volumeDecrease[1] * (week - 1))] : [3, 5];
  
      program.push({
        week,
        workouts: Array(frequency).fill({
          squat: { weight: squatMax * weekIntensity / 100, sets: weekVolume[0], reps: weekVolume[1] },
          bench: { weight: benchMax * weekIntensity / 100, sets: weekVolume[0], reps: weekVolume[1] },
          deadlift: { weight: deadliftMax * weekIntensity / 100, sets: weekVolume[0], reps: weekVolume[1] },
        }),
      });
    }
  
    newProgram.program = program;
  

    const event = new CustomEvent('programCreated', { detail: newProgram });
    document.dispatchEvent(event);

    setName('');
    setDuration('');
    setFrequency('');
    setSquatMax('');
    setDeadliftMax('');
    setBenchMax('');
  };




  
return (
  <div className="w-full h-[90vh] top-[90px] bg-black ">
  <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg  ">
  
    <h2 className="text-2xl font-bold mb-4 text-center text-indigo-500">Create Training Program</h2>
    <div className="mb-4 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Program Name:</label>
        <select
          id="name"
          value={name}
          onChange={handleNameChange}
          className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
        <option value="">Select a program</option>
        <option value="Powerlifting">Powerlifting</option>
        </select>
      </div>
      <div>
        <label htmlFor="duration" className="block text-sm font-medium">Duration:</label>
        <select
          id="duration"
          value={duration}
          onChange={handleDurationChange}
          className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a duration</option>
          <option value="8">8 weeks</option>
          <option value="10">10 weeks</option>
        </select>
      </div>
      <div>
        <label htmlFor="frequency" className="block text-sm font-medium">Frequency:</label>
        <select
          id="frequency"
          value={frequency}
          onChange={handleFrequencyChange}
          className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a frequency</option>
          <option value="4">4 days per week</option>
          <option value="5">5 days per week</option>
          <option value="6">6 days per week</option>
        </select>
      </div>
      <div>
        <label htmlFor="squat_max" className="block text-sm font-medium">Squat Max:</label>
        <input
          type="text"
          id="squat_max"
          value={squatMax}
          onChange={handleSquatChange}
          className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="deadlift_max" className="block text-sm font-medium">Deadlift Max:</label>
        <input
          type="text"
          id="deadlift_max"
          value={deadliftMax}
          onChange={handleDeadliftChange}
          className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="bench_max" className="block text-sm font-medium">Bench Max:</label>
        <input
          type="text"
          id="bench_max"
          value={benchMax}
          onChange={handleBenchChange}
          className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
    <button
      onClick={handleCreateProgram}
      className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Create Training Program
    </button>
  </div>
  </div>
);
}


export default CreateProgram;