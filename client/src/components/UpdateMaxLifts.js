import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

function UpdateMaxLifts({ onClose }) {
    const { editingMaxLift, newSquatMax, setNewSquatMax, newBenchMax, setNewBenchMax, 
            newDeadliftMax, setNewDeadliftMax, newDate, setNewDate, setErrorMessage, updateMaxLift} = useContext(AppContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateMaxLift(newSquatMax, newBenchMax, newDeadliftMax, newDate, editingMaxLift.id)  // Update this line
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
                                    Update Max Lift
                                </h3>
                                <div className="mt-2">
                                    <input 
                                        value={newSquatMax} 
                                        onChange={(e) => setNewSquatMax(e.target.value)} 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        id="newSquatMax" 
                                        type="text" 
                                        placeholder="New Squat Max"
                                    />

                                    <input 
                                        value={newBenchMax} 
                                        onChange={(e) => setNewBenchMax(e.target.value)} 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        id="newBenchMax" 
                                        type="text" 
                                        placeholder="New Bench Max"
                                    />

                                    <input 
                                        value={newDeadliftMax} 
                                        onChange={(e) => setNewDeadliftMax(e.target.value)} 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" 
                                        id="newDeadliftMax" 
                                        type="text" 
                                        placeholder="New Deadlift Max"
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
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
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

export default UpdateMaxLifts;