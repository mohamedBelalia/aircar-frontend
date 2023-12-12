import React from 'react'

const Landing = () => {

  return (
    <div className='md:h-[80vh] h-[70vh]' >
        <div className='md:py-10 md:px-20 px-9 md:h-[100vh]'>
            <div className='md:w-[50%]'>
            <h1 className='md:text-start text-center md:text-5xl text-2xl font-bold text-sky-900 mt-5'>
                RENT A CAR FROM ANYWHERE WITH <span className='text-yellow-500'>AIRCAR</span>
            </h1>
            <p className='md:w-[600px] md:text-start text-center mt-10 font-medium text-gray-400'>
            Discover the freedom of the open road with AirCar, your premier destination for hassle-free 
            car rentals. Whether you're embarking on a business trip
            </p>
            <div className='mt-20 flex md:justify-start justify-center'>
                <button className='rounded-md w-[200px] h-[40px] text-white bg-sky-700 hover:bg-sky-600'>GET STARTED</button>
            </div>
            </div>
        </div>
        <div className='absolute top-0 left-0 w-[100%] h-full z-[-1]'>
            <div className='absolute md:left-[40%] md:top-[25%] top-[50%] md:w-[60%]'>
            <img className='object-cover w-[100%] h-[100%] ' src="./dynamicImgs/BG.png" alt="" />
            </div>
        </div>
        
    </div>
  )
}

export default Landing