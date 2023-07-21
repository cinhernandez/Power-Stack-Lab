import React, { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';

const ProgramGenerator = () => {
  const { squat, setSquat, bench, setBench, deadlift, setDeadlift, program, setProgram } = useContext(AppContext);
 



  useEffect(() => {
    const savedProgram = localStorage.getItem('program');
    if (savedProgram) {
      setProgram(JSON.parse(savedProgram));
    }
  }, []);
  

  const generateProgram = (squat, bench, deadlift) => {
    const program = {
      squat: [],
      bench: [],
      deadlift: []
    };
    
    // Week 1-4 (Volume Phase): 4 sets of 8 reps at 65-75% of 1RM
    // Week 5-8 (Intensity Phase): 5 sets of 3 reps at 80-90% of 1RM

    for (let week = 1; week <= 8; week++) {
      let percentage;
      let sets;
      let reps;

      if (week <= 4) {
        percentage = 0.65 + (week - 1) * 0.05;  // Increase by 5% each week
        sets = 4;
        reps = 8;
      } else {
        percentage = 0.75 + (week - 4) * 0.05;  // Increase by 5% each week
        sets = 5;
        reps = 3;
      }

      program.squat.push({ week, sets, reps, weight: squat * percentage });
      program.bench.push({ week, sets, reps, weight: bench * percentage });
      program.deadlift.push({ week, sets, reps, weight: deadlift * percentage });
    }

    setProgram(program);

    localStorage.setItem('program', JSON.stringify(program));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    generateProgram(squat, bench, deadlift);
   
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg  ">
    <h2 className="text-2xl font-bold mb-4 text-center text-black"> Generate Powerlifting Program</h2>
    <div className="mb-4 space-y-4">
    <form onSubmit={handleSubmit}>
      <label htmlFor="squat" className="block text-sm font-medium">Squat Max:</label>
      <input
        type="text"
        id="setSquat"
        value={squat}
        onChange={(e) => setSquat(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <label htmlFor="bench" className="block text-sm font-medium">Bench Max:</label>
      <input
        type="text"
        id="setBench"
        value={bench}
        onChange={(e) => setBench(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
     <label htmlFor="deadlift" className="block text-sm font-medium">Deadlift Max:</label>
      <input
        type="text"
        id="setDeadlift"
        value={deadlift}
        onChange={(e) => setDeadlift(e.target.value)}
        className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      ></input>
      <div className='w-full border-b border-white mb-4'></div>
      <div className="flex items-center justify-between mt-4">
      <button type="submit" className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-4">
      Submit
      </button>
      <button
      onClick={(e) => {
        e.preventDefault(); // prevent form submission
        setSquat('');
        setBench('');
        setDeadlift('');
        setProgram({});
        localStorage.removeItem('program');
        }}
      className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
      Reset
    </button>
    </div>
    </form>
    </div>
    </div>
    <div  className="mt-10 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      {['squat', 'bench', 'deadlift'].map(exercise => (
        <div key={exercise}>
          <h3 className="text-xl font-bold mb-4 text-center text-black">{exercise}</h3>
          {program[exercise] && program[exercise].map((week, index) => (
            <p key={index} className="text-lg text-center text-black">
              Week {week.week}: {week.sets} sets of {week.reps} reps at {week.weight.toFixed(2)} lbs
            </p>
          ))}
        </div>
      ))}
    </div>
    </div>

    
  );
}

export default ProgramGenerator;
