import React from 'react'
import rentingNumbers from "../../assets/JSONs/OurNumbers.json"

const Numbers = () => {

  return (
    <div className='py-20 px-16 w-[90%] mx-auto'>
        <h1 className='text-4xl font-bold md:w-[350px] w-[100%] md:text-start text-center'>Why you should 
        <span className='text-sky-500'> Rent a car</span> with us ?</h1>

        <div className='flex justify-around lg:mt-20 mt-10 lg:flex-row flex-col overflow-hidden'>
            {
              rentingNumbers.ourNumbers.map((number,key)=>(
                <div key={key} className='flex gap-4 lg:flex-row flex-col text-center items-center lg:border-r lg:border-l border-sky-500 px-6 lg:mb-0 mb-10'>
                    <h1 className='text-5xl font-bold text-sky-600'>{number.number}</h1>
                    <p className='text-2xl font-bold text-gray-600'>{number.title}</p>
                </div>
              ))
            }
        </div>

    </div>
  )
}

export default Numbers