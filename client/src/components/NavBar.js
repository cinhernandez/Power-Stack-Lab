import React, {useState} from 'react';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';



const NavBar = () => {
    const[nav, setNav] = useState(false);
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
                        <li>Generate Training Program</li>
                        <li>Dashboard</li>
                        <li>About</li>
                        <button className='ml-4'>Use PWR Stack Lab</button>
                    </ul>
                </div>

                <div onClick={handleNav} className='block md:hidden'>
                        {nav ? <AiOutlineMenu size={30} className='text-white'/> : <AiOutlineClose size={30} className='text-white'/>}
                
                </div>

                {/*mobile menu*/}
                <div className='w-full bg-black text-white absolute top-[90px] left-0 flex justify-center text-center'>
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
