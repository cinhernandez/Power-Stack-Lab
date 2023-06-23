import React from 'react'
import {VscComment, VscGraph, VscOrganization, VscHeartFilled  } from 'react-icons/vsc'


const About = () => {
  return (
    <div className= 'w-full  bg-black text-white text-center'>
    <div className='max-w-[1240px] mx-auto px-4 py-16'>
        <div>
            <h1 className='py-4'>Empower Your Strength:</h1>
            <p className='py-4 text-xl'> Fuel Your Powerlifting Journey</p>
        </div>

        <div className='grid sm:grid-cols-2 gap-4'>
                <div className='flex flex-col border text-left rounded-2xl py-12 px-8'>
                    <div className='bg-[red] inline-flex p-2 rounded-full'><VscComment size={40} /></div>
                    <h3 className='text-xl font-bold py-4'>Take Notes</h3>
                    <p>Track your weekly progress</p>
                </div>
                <div className='flex flex-col border text-left rounded-2xl py-12 px-8'>
                    <div className='bg-[red] inline-flex p-2 rounded-full'><VscGraph size={40}/></div>
                    <h3 className='text-xl font-bold py-4'>Weekly Chart</h3>
                    <p>Progress reimagined</p>
                </div>
                <div className='flex flex-col border text-left rounded-2xl py-12 px-8'>
                    <div className='bg-[red] inline-flex p-2 rounded-full'><VscOrganization size={40}/></div>
                    <h3 className='text-xl font-bold py-4'>Community</h3>
                    <p>You will have access to the powerlifting community</p>
                </div>
                <div className='flex flex-col border text-left rounded-2xl py-12 px-8'>
                    <div className='bg-[red] inline-flex p-2 rounded-full'><VscHeartFilled size={40} /></div>
                    <h3 className='text-xl font-bold py-4'>Favorites</h3>
                    <p>Access to all previous programs</p>
                </div>
            </div>
        </div>
        </div>
  )
}

export default About