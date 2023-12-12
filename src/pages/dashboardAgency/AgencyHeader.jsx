import React from 'react'

const BASEIMGSPATH = "http://localhost/aircar_backend/Images/" ;
export const AgencyHeader = () => {
  return (
    <div>
        <div className='flex justify-between items-center'>
            <h1 className='md:text-2xl font-bold text-gray-600'>Dashboard</h1>
            <div className='cursor-pointer w-[35px] h-[35px] rounded-full border-2 border-green-600 flex justify-center items-center'>
                <img className='w-[70%] h-[70%]' src={BASEIMGSPATH + "userProfile.png"} alt="" />
            </div>
        </div>
    </div>
  )
}
