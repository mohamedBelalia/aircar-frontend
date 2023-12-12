import React from 'react'
import { Navbar } from '../../layouts/Navbar'
import { FaLocationDot } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaStar , FaRegStar , FaStarHalfAlt  } from "react-icons/fa";

const BASEIMGSPATH = "http://localhost/aircar_backend/Images/" ;

const AgencyProfile = () => {
  return (
    <>
        <Navbar/>
        <div>
            <div className=' w-full h-[120px] '></div>
            <div className='flex justify-center bg-gray-200'>
                <div className='bg-white rounded-md border-2 border-sky-900 pb-10 w-[80%] -mt-14 z-auto mb-10'>
                    <div className='flex justify-center'>
                        <div className='md:w-[100px] md:h-[100px] w-[80px] h-[80px] rounded-full border-8 border-white bg-white md:-mt-14 -mt-10'>
                            <img className='object-cover border-2 border-sky-900 w-full h-full rounded-full' src='/dynamicImgs/bgAgency.jpg' alt="" />
                        </div>
                    </div>
                    <div className='text-center'>
                        <h1 className='font-bold md:text-3xl text-xl'>CarRol</h1>
                        <p className='text-gray-700 md:w-[60%] w-[80%] mt-4  ml-auto mr-auto'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam deleniti laborum, totam sequi excepturi corporis minima unt rem ipsam!
                        </p>
                    </div>

                    <div className='md:w-[60%] w-[80%] ml-auto mr-auto mt-6 flex md:flex-row flex-col justify-between items-center gap-4'>
                        
                        <div className='flex gap-2 items-center'>
                            <FaLocationDot className='text-gray-500 text-xl'/>
                            <h2 className='text-sm font-bold text-gray-500'>Marrakech morroco</h2>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <FaBirthdayCake className='text-gray-500 text-xl'/>
                            <h2 className='text-sm font-bold text-gray-500'>Joined on Oct 26, 2019</h2>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <MdEmail className='text-gray-500 text-xl'/>
                            <h2 className='text-sm font-bold text-gray-500'>contact@carrole.com</h2>
                        </div>

                    </div>

                    <div className='mt-10'>
                        <h1 className='text-center mb-4 text-xl font-bold text-sky-800'>Clients Ranking</h1>
                    <div className='flex justify-center items-center flex-col'>
                        <div className='w-[90px] h-[90px] border-4 border-sky-600 rounded-full flex justify-center items-center'>
                            <h1 className='text-3xl font-bold text-sky-800'>6<span className='text-sm font-normal'>/10</span></h1>
                        </div>
                        <div className='flex gap-3 mt-3'>
                        <FaStar className='text-2xl text-sky-800'/>
                        <FaStar className='text-2xl text-sky-800'/>
                        <FaStarHalfAlt className='text-2xl text-sky-800'/>
                        <FaRegStar className='text-2xl text-sky-800'/>
                        <FaRegStar className='text-2xl text-sky-800'/>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default AgencyProfile