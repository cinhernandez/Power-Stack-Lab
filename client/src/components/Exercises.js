// import React, {useState, useEffect} from 'react';
// import axios from 'axios';



// const Exercises = () => {
//     const [exercises, setExercises] = useState([]);
  
//     useEffect(() => {
//       // Fetch exercise data from API
//       axios
//       .get('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
//         headers: {
//             'X-RapidAPI-Key': 'db2f01624amsh0fff27ac3550af1p1a9cebjsne3a4f0b94a40',
//             'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//       }
//     })
//         .then(response => {
//             const {data} = response;
//           setExercises(data.bodyPartList);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     }, []);

  
//     return (
//         <div>
//             {exercises && exercises.length === 0 ? (
//             <div>Loading...</div>
//             ) : (
//         exercises.map(exercise => (
//             <div key={exercise.id} style={{ border: '1px solid gray', padding: '16px', marginBottom: '16px' }}>
//               <h6 style={{ fontSize: '1.2rem' }}>{exercise.bodyPart}</h6>
//               <p>{exercise.description}</p>
//             </div>
//             ))
//           )}
//         </div>
//       );
//     };
    
  
//   export default Exercises;
  