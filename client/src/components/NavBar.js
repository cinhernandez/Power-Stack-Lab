import React, {useState} from 'react';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import { NavLink, Link,  } from 'react-router-dom/cjs/react-router-dom.min';



const NavBar = () => {
    const[nav, setNav] = useState(false);
    const navLinks = [
        {path: '/', name: 'Home'},
        {path: '/programs/creation', name: 'Generate Training Program'},
        {path: '/dashboard', name: 'Dashboard'},
        {path: '/about', name: 'About'},
        {path: '/login', name: 'Login'},
        {path: '/signup', name: 'Sign Up'}
    ]

    const handleNav = () => {
        setNav(!nav)
    }

    return (
        <div className='w-full h-[90px] bg-black'>
            <div className='max-w-[1240px] mx-auto px-4 flex justify-between items-center h-full'>
            <div>
                <h1 className='text-red-500'>PWR Stack Lab</h1>
                </div>
                <div onClick={handleNav} className='hidden md:flex'>
                    <ul className='flex text-white items-center'>
                        <li>Home</li>
                        <NavLink to='/programs/creation'>
                        <li>Generate Training Program</li>
                        </NavLink>
                        <li>Dashboard</li>
                        <li>About</li>
                        <button className='ml-4'>Use PWR Stack Lab</button>
                    </ul>
                </div>

                <div onClick={handleNav} className='block md:hidden'>
                        {nav ? <AiOutlineMenu size={30} className='text-white'/> : <AiOutlineClose size={30} className='text-white'/>}
                
                </div>

                {/*mobile menu*/}
                <div className={nav ? 'w-full bg-black text-white absolute top-[90px] left-0 flex justify-center text-center' : 
                'absolute left-[-100%]'}>
                    <ul>
                        <li className='text-2xl'>Home</li>
                        <li className='text-2xl'>Generate Training Program</li>
                        <li className='text-2xl'>Dashboard</li>
                        <li className='text-2xl'>About</li>
                        <button className='m-8'>Use PWR Stack Lab</button>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
