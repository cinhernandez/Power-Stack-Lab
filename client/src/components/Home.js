import React from 'react';
import { Link } from 'react-router-dom';
import video from '../assets/video.mp4'
import {VscComment, VscGraph, VscOrganization, VscHeartFilled  } from 'react-icons/vsc'

const Home = () => {


    return (
        <div className="w-full h-[90vh] top-[90px]">
            <video className= 'object-cover h-full w-full absolute -z-10' src={video} autoPlay loop muted  />
            <div className='w-full h-[90%] flex flex-col justify-center items-center text-white px-4 text-center'>
                <h1>Powerlifting</h1>
                <h1 className='text-red-500 py-2'>Program Generator</h1>
                <p className='text-xl py-4'>Ignite Your Potential: Unleash Your Power with our Powerlifting Generator!</p>
                <div>
                <Link to='/login'>
                    <button>Get Started</button>
                </Link>
                </div>
            </div>
        

        <div className= 'w-full  bg-black text-white text-center'>
      <div className='max-w-[1240px] mx-auto px-4 py-16'>
        <div>
            <h1 className='py-4'>Empower Your Strength:</h1>
            <p className='py-4 text-xl'> Fuel Your Powerlifting Journey</p>
        </div>

        <div className='grid sm:grid-cols-2 gap-4'>
                <div className='flex flex-col border text-left rounded-2xl py-12 px-8'>
                    <div className='bg-[red] inline-flex p-2 rounded-full'><VscComment size={40} /></div>
                    <h3 className='text-xl font-bold py-4'>Track Your Progress</h3>
                    <p>Track your daily progress</p>
                </div>
                <div className='flex flex-col border text-left rounded-2xl py-12 px-8'>
                    <div className='bg-[red] inline-flex p-2 rounded-full'><VscGraph size={40}/></div>
                    <h3 className='text-xl font-bold py-4'>Powerlifting Program</h3>
                    <p>Generate an 8 week powerlifitng program</p>
                </div>
                <div className='flex flex-col border text-left rounded-2xl py-12 px-8'>
                    <div className='bg-[red] inline-flex p-2 rounded-full'><VscOrganization size={40}/></div>
                    <h3 className='text-xl font-bold py-4'>Community Forum</h3>
                    <p>You will have access to the powerlifting community</p>
                </div>
                <div className='flex flex-col border text-left rounded-2xl py-12 px-8'>
                    <div className='bg-[red] inline-flex p-2 rounded-full'><VscHeartFilled size={40} /></div>
                    <h3 className='text-xl font-bold py-4'>Favorites</h3>
                    <p>Access to your favorite tracking tools</p>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
       
}
    export default Home;
    