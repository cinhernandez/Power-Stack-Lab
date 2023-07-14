import { data } from 'autoprefixer';
import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authError, setAuthError] = useState(null);

    const [user, setUser] = useState(null);

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [weightLifted, setWeightLifted] = useState('');
    const [setNumber, setSetNumber] = useState('');
    const [reps, setReps] = useState('');
    const [notes, setNotes] = useState('');

    const [lifts, setLifts] = useState([]);

    const history = useHistory();




    const login = (values, history) => {
        return fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            credentials: 'include',
        })
        .then((res) => {
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data.message));
            }
            return response.json();
        })
        .then(userData => {
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('user', JSON.stringify(userData));
            setIsLoggedIn(true);
            setUser(userData);
            history.push('/dashboard');
        })
        .catch(err => {
            console.error(error);
            throw error;
        });
    } 
    const register = (values) => {
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data.message));
            }
            console.log('Registration successful');
            history.push('/dashboard');
        })
        .catch(err => {
            setAuthError(err);
        });
    };


    const logout = (logout) => {
        fetch('/logout', {
            method: 'POST',
            credentials: 'include',
            })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => Promise.reject(data.message));
                }
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('user');
                setIsLoggedIn(false);
                setUser(null);
                history.push('/');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('user');
        setIsLoggedIn(loggedInStatus === 'true');
        setUser(userData ? JSON.parse(userData) : null);
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            fetch('/lifts', {
                credentials: 'include',
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => Promise.reject(data.message));
                }
                return response.json();
            })
            .catch(error => {
                console.error('Failed to fetch lifts:', error);
            });
        }
    }, [isLoggedIn]);

        const handleCreate = (name, date, weightLifted, setNumber, reps, notes ) => {
            fetch('/create/lift_sets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, date, weightLifted, setNumber, reps, notes, }),
                    credentials: 'include',
                })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then(data => Promise.reject(data.message));
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Lift created successfully');
                    setLifts((prevLifts) => [...prevLifts, data]);
                })
                .catch(error => {
                    console.error('Failed to create lift:', error);
                });
        };


    
    

return(
    <AppContext.Provider value={{
        isLoggedIn, authError, setAuthError, setIsLoggedIn, user, setUser, name, setName, date, setDate, weightLifted, setWeightLifted, setNumber, setSetNumber, reps, setReps, login, register, logout, handleCreate
    }}>
        {children}
    </AppContext.Provider>
)

}

