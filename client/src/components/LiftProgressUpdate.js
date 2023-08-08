import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

function LiftProgressUpdate({ onClose }) {
    const { newName, setNewName, newWeightLifted, setNewWeightLifted, newSetNumber, setNewSetNumber,
        newReps, setNewReps, newNotes, setNewNotes, newDate, setNewDate, setErrorMessage, updateLiftProgress, editingLiftProgress} = useContext(AppContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateLiftProgress(newName, newWeightLifted, newSetNumber, newReps, newNotes, newDate, editingLiftProgress.id)  // Update this line
            .then(() => {
                onClose();
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage(error.message);
            });
    };    

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" onClick={onClose}>
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" onClick={e => e.stopPropagation()}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Update Lift Progress
                                </h3>
                                <div className="mt-2">
                                    <select 
                                        value={newName} 
                                        onChange={(e) => setNewName(e.target.value)} 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        id="newName" 
                                        type="text" 
                                        placeholder="New Name"
                                        >
                                        <option value="">Select an exercise</option>
                                        <option value="squat">Squat</option>
                                        <option value="bench_press">Bench Press</option>
                                        <option value="deadlift">Deadlift</option>
                                    </select>

                                    <input 
                                        value={newWeightLifted} 
                                        onChange={(e) => setNewWeightLifted(e.target.value)} 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" 
                                        id="newWeightLifted" 
                                        type="text" 
                                        placeholder="New Weight Lifted"
                                    />

                                    <input 
                                        value={newSetNumber} 
                                        onChange={(e) => setNewSetNumber(e.target.value)} 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        id="newSetNumber" 
                                        type="text" 
                                        placeholder="New Set Number"
                                    />

                                    <input 
                                        value={newReps} 
                                        onChange={(e) => setNewReps(e.target.value)} 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" 
                                        id="newReps" 
                                        type="text" 
                                        placeholder="New Reps"
                                    />
                                     <input 
                                        value={newNotes} 
                                        onChange={(e) => setNewNotes(e.target.value)} 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" 
                                        id="newNotes" 
                                        type="text" 
                                        placeholder="New Notes"
                                    />
                                     <input 
                                        value={newDate} 
                                        onChange={(e) => setNewDate(e.target.value)} 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" 
                                        id="newDate" 
                                        type="date" 
                                        placeholder="New Date"
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button 
                            type="button" 
                            onClick={handleSubmit} 
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Update
                        </button>
                        <button 
                            type="button" 
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" 
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LiftProgressUpdate;