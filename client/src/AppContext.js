import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authError, setAuthError] = useState(null);

    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [weightLifted, setWeightLifted] = useState('');
    const [setNumber, setSetNumber] = useState('');
    const [reps, setReps] = useState('');
    const [notes, setNotes] = useState('');

    const [lifts, setLifts] = useState([]);

    const history = useHistory();





    
    

return(
    <AppContext.Provider value={{
        isLoggedIn, authError, setAuthError, setIsLoggedIn, user, setUser, name, setName, date, setDate, weightLifted, setWeightLifted, setNumber, setSetNumber, reps, setReps, notes, setNotes, lifts, setLifts, history, errors, setErrors, isSubmitting, setIsSubmitting, email, setEmail, password, setPassword
    }}>
        {children}
    </AppContext.Provider>
)

}

