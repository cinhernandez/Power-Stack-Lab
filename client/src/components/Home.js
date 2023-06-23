import React from 'react';

function Home() {

      return (
        <div className="font-sans min-h-screen antialiased bg-gray-200 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl mx-auto text-center">
            <span className="text-2xl font-light">Welcome to our website!</span>
            <div className="mt-4 bg-white shadow-md rounded-lg text-center">
              <div className="container mx-auto flex justify-center">
                <div className="px-6 py-4 bg-white rounded-md text-center">
                  <h2 className="text-2xl font-semibold text-gray-800">About Us</h2>
                  <p className="mt-2 text-gray-600">
                    PWR.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    export default Home;
    