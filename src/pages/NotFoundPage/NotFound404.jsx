import React from 'react'
import { Navbar } from '../../layouts/Navbar'
import { useNavigate } from 'react-router'

const NotFound404 = () => {

  const navigate = useNavigate() ;
  
  return (
    <>
      <Navbar/>
      <div className='w-full md:h-[80vh] h-[50vh] px-7 flex justify-center flex-col items-center'>
        <div className='md:w-[60%] mb-5'>
          <img className='w-full h-full' src="./dynamicImgs/imgIcons/NotFound.png" alt="not found page" />
        </div>
        <div>
          <h1 className='md:text-2xl text-xl font-bold w-[80%] text-center mx-auto text-sky-700'>
            Sorry, The Page You Are Looking For Does Not Exist
          </h1>
        </div>
        <div>
          <button onClick={()=>navigate("/")} className='my-4 bg-red-500 w-[200px] h-[40px] rounded-md text-white'>Home</button>
        </div>
      </div>
    </>
  )
}

export default NotFound404