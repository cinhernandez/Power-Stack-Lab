import React from 'react';
import video from '../assets/video.mp4'

const Hero = () => {
    return (
        <div className="w-full h-[90vh] top-[90px]">
            <video className= 'object-cover h-full w-full absolute -z-10' src={video} autoPlay loop muted  />
            <div className='w-full h-[90%] flex flex-col justify-center items-center text-white px-4 text-center'>
                <h1>Powerlifting</h1>
                <h1 className='text-red-500 py-2'>Program Generator</h1>
                <p className='text-xl py-4'>Ignite Your Potential: Unleash Your Power with our Powerlifting Generator!</p>
                <div>
                    <button>Get Started</button>
                </div>
            </div>
        </div>
    )
       
}
export default Hero;