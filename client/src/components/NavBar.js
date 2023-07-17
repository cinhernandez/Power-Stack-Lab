import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import {  NavLink, Link, useHistory  } from 'react-router-dom';

 

const NavBar = () => {
    const {nav, setNav, isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AppContext);
    const history = useHistory();


    const handleLogoutClick = (history) => {
        fetch('/logout', {
            method: 'POST',
            credentials: 'include',  // Send cookies
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => Promise.reject(data.message));
            }
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            setIsLoggedIn(false);
            setUser(null);
            history.push('/');
        })
        .catch(error => {
            console.error('Failed to log out: ', error);
        });

    };

    const handleNav = () => {
        setNav(!nav)
    }

    return (
        <div className='w-full h-[90px] bg-black'>
            <div className='max-w-[1240px] mx-auto px-4 flex justify-between items-center h-full'>
            <div>
            <Link to='/'>
                <h1 className='text-red-500'>PWR Stack Lab</h1>
            </Link>
                </div>
                <nav>
                    <div className= 'navigation'>
                    <ul className='flex text-white items-center'>
                    <NavLink exact to='/exercises'>
                        <li>Exercises</li>
                    </NavLink>
                    <NavLink className='button' exact to='/lift_sets'>
                        <li>Track Powerlifting Progress</li>
                    </NavLink>
                    <NavLink className='button' exact to='/max_lifts'>
                        <li>Track Max Lifts</li>
                    </NavLink>
                    <NavLink className='button' exact to='/dashboard'>
                        <li>Dashboard</li>
                    </NavLink>
                    <NavLink className='button' exact to='/posts'>
                        <li>Community Posts</li>
                    </NavLink>
                    {!isLoggedIn && (
                        <>
                    <NavLink className='button' to='/signup'>
                        <li>Sign Up</li>
                    </NavLink>
                    <NavLink className='button' to='/login'>
                        <li>Login</li>
                    </NavLink>
                    </>
                    )}
                    {isLoggedIn && (
                        <>
                    <button
                        onClick={handleLogoutClick}
                        className='ml-4'
                    >
                        Logout
                    </button>
                    <Link to='/signup'>
                        <button className='ml-4'  onClick={handleNav}>Use PWR Stack Lab</button>
                    </Link>
                    </>
                    )}
                    </ul>
                    </div>
                </nav>
                </div>
            </div>
            
            
      
    );
}

export default NavBar;
