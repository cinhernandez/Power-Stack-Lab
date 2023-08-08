import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [nav, setNav] = useState(false);

    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [lifts, setLifts] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [weightLifted, setWeightLifted] = useState('');
    const [setNumber, setSetNumber] = useState('');
    const [reps, setReps] = useState('');
    const [notes, setNotes] = useState('');


    const [maxLifts, setMaxLifts] = useState([]);
    const [squatMax, setSquatMax] = useState('');
    const [benchMax, setBenchMax] = useState('');
    const [deadliftMax, setDeadliftMax] = useState('');

    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState({});
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    
    const [squat, setSquat] = useState('');
    const [bench, setBench] = useState('');
    const [deadlift, setDeadlift] = useState('');
    const [editingMaxLift, setEditingMaxLift] = useState(null);

    const [program, setProgram] = useState({ squat: [], bench: [], deadlift: [] });
    const [commentFormPostId, setCommentFormPostId] = useState(null);
    const [comment, setComment] = useState('');

    const [postToEdit, setPostToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    //Update Max Lifts Component

    const [newSquatMax, setNewSquatMax] = useState('');
    const [newBenchMax, setNewBenchMax] = useState('');
    const [newDeadliftMax, setNewDeadliftMax] = useState('');
    const [newDate, setNewDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newMaxLifts, setNewMaxLifts] = useState([]);


    //Update lift Progress Component

    const [newName, setNewName] = useState('');
    const [newWeightLifted, setNewWeightLifted] = useState('');
    const [newSetNumber, setNewSetNumber] = useState('');
    const [newReps, setNewReps] = useState('');
    const [newNotes, setNewNotes] = useState('');
    const [editingLiftProgress, setEditingLiftProgress] = useState(null);
    const [newLiftProgress, setNewLiftProgress] = useState([]);
    const [isEditingLift, setIsEditingLift] = useState(false);
    
   

    



    const history = useHistory();


    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (loggedIn && storedUser) {
            setIsLoggedIn(true);
            setUser(storedUser);
        }   
    }, []);



    useEffect(() => {
        fetch('/max_lifts')
        .then(res => res.json())
        .then((data) => setMaxLifts(data))
        .catch(err => console.log(err));
    }, []);


    const updateMaxLift = (squatMax, benchMax, deadliftMax, date, id) => {
        return fetch(`/max_lifts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ squat_max: squatMax, bench_max: benchMax, deadlift_max: deadliftMax, date: date }),
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update max lift");
            }
            return response.json();
        })
        .then(updatedMaxLift => {
            // Here is where you actually update the state
            setMaxLifts(prevMaxLifts => {
                const newMaxLifts = prevMaxLifts.map(lift => {
                    if (lift.id === updatedMaxLift.id) {
                        return updatedMaxLift;
                    } else {
                        return lift;
                    }
                });
                return newMaxLifts;
            });
            localStorage.setItem('updatedMaxLift', JSON.stringify(updatedMaxLift));
        })
        .catch(error => console.error('Error:', error));
    }





    const updateLiftProgress = (name, weightLifted, setNumber, reps, notes, date, id) => {
        return fetch(`/lift_sets/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, weight_lifted: weightLifted, set_number: setNumber, reps: reps, notes: notes, date: date }),
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(updatedLiftProgress => {
            // Here is where you actually update the state
            setLifts(prevLiftProgress => {
                const newLiftProgress = prevLiftProgress.map(lift => {
                    if (lift.id === updatedLiftProgress.id) {
                        return updatedLiftProgress;
                    } else {
                        return lift;
                    }
                });
                return newLiftProgress;
            });
            localStorage.setItem('updatedLiftProgress', JSON.stringify(updatedLiftProgress));
        })
        .catch(error => console.error('Error:', error));
    }
    

    

return(
    <AppContext.Provider value={{
        isLoggedIn, authError, setAuthError, setIsLoggedIn, user, setUser, name, setName, date, setDate, weightLifted, setWeightLifted, setNumber, 
        setSetNumber, reps, setReps, notes, setNotes, lifts, setLifts, history, errors, setErrors, isSubmitting, setIsSubmitting, email, setEmail, password, 
        setPassword, nav, setNav, maxLifts, setMaxLifts, posts, setPosts, squatMax, setSquatMax, benchMax, setBenchMax, deadliftMax, setDeadliftMax,
        title, setTitle, body, setBody, squat, setSquat, bench, setBench, deadlift, setDeadlift, likes, setLikes, program, setProgram,
        commentFormPostId, setCommentFormPostId, comment, setComment, postToEdit, setPostToEdit, editingMaxLift, setEditingMaxLift,
        isEditing, setIsEditing, updateMaxLift, newSquatMax, setNewSquatMax, newBenchMax, setNewBenchMax, newDeadliftMax, setNewDeadliftMax, newDate, setNewDate,
        errorMessage, setErrorMessage, newMaxLifts, setNewMaxLifts, newName, setNewName, newWeightLifted, setNewWeightLifted, newSetNumber, setNewSetNumber,
        newReps, setNewReps, newNotes, setNewNotes, updateLiftProgress, editingLiftProgress, setEditingLiftProgress, newLiftProgress, setNewLiftProgress,
        isEditingLift, setIsEditingLift
        
    }}>
        {children}
    </AppContext.Provider>
)

}

