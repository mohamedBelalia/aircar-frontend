import React from 'react'
import {BsLinkedin} from "react-icons/bs"
import {FaTwitterSquare , FaGithubSquare} from "react-icons/fa"

const Footer = () => {
  return (
    <div className='bg-sky-900 text-white px-10 py-20'>
        <div className='flex md:flex-row flex-col md:gap-0 gap-12 mb-10'>
            <div className='md:w-1/4 md:px-8 flex flex-col gap-5'>
            <h1 className='text-2xl font-extrabold text-sky-400'>Air Car</h1>
                <p>It's a never ending battle of making your cars better and also trying to be better yourself.</p>
                <div className='flex gap-8 text-3xl'>
                    <BsLinkedin className='cursor-pointer hover:text-[#0072b1] hover:scale-110 transition-all duration-200 ease-in'/>
                    <FaTwitterSquare className='cursor-pointer hover:text-[#00acee] hover:scale-110 transition-all duration-200 ease-in'/>
                    <FaGithubSquare className='cursor-pointer hover:text-black hover:scale-110 transition-all duration-200 ease-in'/>
                </div>
            </div>

            <div className='md:w-1/4 md:px-8 md:text-center'>
                <h1 className='mb-3 text-[20px] font-bold text-sky-300'>Account</h1>
                <ul className='flex flex-col gap-3'>
                    <li className='cursor-pointer'>Profile</li>
                    <li className='cursor-pointer'>Settings</li>
                    <li className='cursor-pointer'>Notifications</li>
                    <li className='cursor-pointer'>Log out</li>
                </ul>
            </div>

            <div className='md:w-1/4 md:px-8 md:text-center'>
                <h1 className='mb-3 text-[20px] font-bold text-sky-300'>About</h1>
                <ul className='flex flex-col gap-3'>
                    <li className='cursor-pointer'>Who we are</li>
                    <li className='cursor-pointer'>Services</li>
                    <li className='cursor-pointer'>Contact</li>
                    <li className='cursor-pointer'>Careers</li>
                </ul>
            </div>

            <div className='md:w-1/4 md:px-8 md:text-center '>
                <h1 className='mb-3 text-[20px] font-bold text-sky-300'>Company</h1>
                <ul className='flex flex-col gap-3'>
                    <li className='cursor-pointer'>Community</li>
                    <li className='cursor-pointer'>Help center</li>
                    <li className='cursor-pointer'>Support</li>
                </ul>
            </div>
        </div>

        <hr className='w-[100%] h-[1px] bg-gray-400 mb-10'/>

        <div>
            <p className='text-center'> &#169; 2023 All Rights Reserved by Mohamed Belalia</p>
        </div>

    </div>
  )
}

export default Footer