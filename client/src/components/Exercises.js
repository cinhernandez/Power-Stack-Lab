import React, { useState, useEffect } from "react";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'db2f01624amsh0fff27ac3550af1p1a9cebjsne3a4f0b94a40',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();  // changed to .json() instead of .text()
        setExercises(result);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <h1>Exercises</h1>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>
            {exercise.name} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exercises;
