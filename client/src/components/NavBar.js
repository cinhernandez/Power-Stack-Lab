import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import {  NavLink, Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

 

const NavBar = () => {
    const {isLoggedIn, setIsLoggedIn, setUser,  } = useContext(AppContext);
  


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
            
        })


    };



    return (
        <div className='w-full h-[95px] bg-black'>
            <div className='max-w-[1500px] mx-auto px-22 flex justify-between items-center h-full'>
            <div>
            <Link to='/'>
                <img src={Logo} alt='logo' className='h-[110px] w-[150px]' />
            </Link>
                </div>
                <nav>
                    <div className= 'navigation'>
                    <ul className='flex text-white items-center '>
                {isLoggedIn && (
                    <>
                    <NavLink exact to='/generate_program'>
                        <li >Generate Powerlifting Program</li>
                    </NavLink>
                    
                    <NavLink className='button' exact to='/lift_sets'>
                        <li>Track Powerlifting Progress</li>
                    </NavLink>
                    <NavLink className='button' exact to='/max_lifts'>
                        <li>Track Max Lifts</li>
                    </NavLink>
                    </>
                )}
                    <NavLink className='button' exact to='/dashboard'>
                        <li>Dashboard</li>
                    </NavLink>
                    <NavLink className='button' exact to='/posts'>
                        <li>Community Forum</li>
                    </NavLink>
                    {!isLoggedIn && (
                        <>
                   
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
