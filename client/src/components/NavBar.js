import React, {useState} from 'react';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import {  NavLink, Link, useHistory  } from 'react-router-dom';



const NavBar = ({isLoggedIn, handleLogout}) => {
    const[nav, setNav] = useState(false);
    const history = useHistory();


    const handleLogoutClick = async () => {
       if (window.confirm('Are you sure you want to log out?')) {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
        });

        if (response.ok){
            handleLogout();
            history.push('/');
        } else {
            console.error('Logout failed');
         }
        } catch (error) {
            console.error(error);
        }
        }
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
                    
                    <NavLink className='button' exact to='/create/lift_sets'>
                        <li>Track Powerlifting Progress</li>
                    </NavLink>
                    {!isLoggedIn && (
                        <>
                    <NavLink className='button' exact to='/dashboard'>
                        <li>Dashboard</li>
                    </NavLink>
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
