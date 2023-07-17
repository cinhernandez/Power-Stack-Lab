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
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    

    const history = useHistory();


    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (loggedIn && storedUser) {
            setIsLoggedIn(true);
            setUser(storedUser);
        }   
    }, []);
   



    
    

return(
    <AppContext.Provider value={{
        isLoggedIn, authError, setAuthError, setIsLoggedIn, user, setUser, name, setName, date, setDate, weightLifted, setWeightLifted, setNumber, 
        setSetNumber, reps, setReps, notes, setNotes, lifts, setLifts, history, errors, setErrors, isSubmitting, setIsSubmitting, email, setEmail, password, 
        setPassword, nav, setNav, maxLifts, setMaxLifts, posts, setPosts, squatMax, setSquatMax, benchMax, setBenchMax, deadliftMax, setDeadliftMax,
        title, setTitle, body, setBody,
    }}>
        {children}
    </AppContext.Provider>
)

}

