import React, {useEffect, useState} from 'react';


function TrainingPrograms() {

    const [trainingPrograms, setTrainingPrograms] = useState([]);

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
        <div>
            <h1>Training Programs</h1>
            <p>Training Programs Page</p>
            <ul>
                {trainingPrograms.map(trainingProgram => (
                    <li key={trainingProgram.id}>
                        {trainingProgram.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TrainingPrograms