import React, {useState} from 'react';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import {  NavLink, Link  } from 'react-router-dom';



const NavBar = ({isLoggedIn, HandleLogout}) => {
    const[nav, setNav] = useState(false);
  


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
                    <NavLink className='button' exact to='/programs/creation'>
                        <li>Generate Training Program</li>
                    </NavLink>
                    <NavLink className='button' exact to='/dashboard'>
                        <li>Dashboard</li>
                    </NavLink>
                    <NavLink className='button' to='/max_lifts'>
                        <li>Max Lifts</li>
                    </NavLink>
                    <NavLink className='button' to='/signup'>
                        <li>Sign Up</li>
                    </NavLink>
                    <NavLink className='button' to='/login'>
                        <li>Login</li>
                    </NavLink>
                    <Link to='/signup'>
                        <button className='ml-4'  onClick={handleNav}>Use PWR Stack Lab</button>
                    </Link>
                    </ul>
                    </div>
                </nav>
                </div>
            </div>
            
            
      
    );
}

export default NavBar;
