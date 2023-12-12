import React from 'react'
import carsTypies from "../../assets/JSONs/OurNumbers.json"
import {SiBmw , SiFerrari , SiAudi , SiHonda , SiDacia , SiLamborghini} from "react-icons/si"

const VehiclesTypes = () => {
  return (
    <>
    <div className='pt-8 mb-[60px] px-16 md:w-[90%] mx-auto'>
        <div className='flex justify-end '>
            <h1 className='text-4xl font-bold md:w-[350px] w-[100%] md:text-end text-center'>Wide Range Of
            <span className='text-sky-500'> Vehicles</span></h1>
        </div>

        <div className='flex md:flex-row flex-col my-10 flex-wrap gap-20 mb-[50px]'>
            {
                carsTypies.carsTypes.map((car,key)=>(
                    <div key={key} className='md:w-[350px] h-[200px] mb-5 cursor-pointer mx-auto'>
                        <img src={car.img} className='rounded-md w-[100%] h-[100%] object-cover' />
                        <h1 className='text-center text-xl font-bold text-gray-700 mt-2'>{car.type}</h1>
                        <p className='text-center text-xl font-medium text-gray-500 '>{car.number} Cars</p>
                    </div>
                ))
            }
        </div>

    </div>
    <div className='mt-[100px] mb-20 md:max-w-[1200px] px-8 mx-auto flex gap-4 justify-between'>

            <SiBmw className='md:text-[70px] text-[40px] text-sky-900 cursor-pointer hover:text-sky-700'/>
            <SiFerrari className='md:text-[70px] text-[40px] text-sky-900 cursor-pointer hover:text-sky-700'/>
            <SiAudi className='md:text-[70px] text-[40px] text-sky-900 cursor-pointer hover:text-sky-700'/>
            <SiHonda className='md:text-[70px] text-[40px] text-sky-900 cursor-pointer hover:text-sky-700'/>
            <SiDacia className='md:text-[70px] text-[40px] text-sky-900 cursor-pointer hover:text-sky-700'/>
            <SiLamborghini className='md:text-[70px] text-[40px] text-sky-900 cursor-pointer hover:text-sky-700'/>

        </div>
    </>
  )
}

export default VehiclesTypes