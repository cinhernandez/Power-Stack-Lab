import React, {useEffect, useState} from 'react';


function TrainingPrograms() {

    const [trainingPrograms, setTrainingPrograms] = useState([]);
    // const signedInUserId = 'your-user-id-here'

    useEffect(() => {
    
        fetch('/programs')
            .then((response) => response.json())
            .then((data) => setTrainingPrograms(data));
    }, []);


    const handleDelete = (programId) => {
        fetch(`/programs/${programId}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setTrainingPrograms((prevtrainingPrograms) => prevtrainingPrograms.filter((trainingPrograms) => trainingPrograms.id !== programId));
            } else {
              console.log('Failed to delete training program.');
            }
          })
          .catch((error) => {
            console.log('Error deleting the training program:', error);
          });
      };

    return (
      <div className="bg-gradient-animation min-h-screen flex flex-col justify-start items-center">
      <div className="mt-8 text-center">
          <div className="mb-4">
            <h1>Training Programs</h1>
            
            <div>
                {trainingPrograms.map(trainingProgram => (
                    <div key={trainingProgram.id} className="bg-white rounded shadow p-4 m-4" >
                        <h2 className="text-xl font-bold">{trainingProgram.name}</h2>
                        <p className="text-gray-600 mb-2">{trainingProgram.duration}</p>
                        <p className="text-gray-600 mb-2">{trainingProgram.frequency}</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
        </div>
    )
}

export default TrainingPrograms