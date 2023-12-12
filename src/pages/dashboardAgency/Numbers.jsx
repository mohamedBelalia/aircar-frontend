import React from 'react'
import { IoCarSport } from "react-icons/io5";
import { FaUserGroup , FaMoneyBillTrendUp } from "react-icons/fa6";

const Numbers = ({carsCount , clientsCount , incomeTotal}) => {
  return (
    <div className='my-5 bg-white p-5'>
        <div className='w-full py-2 pl-5 h-[60px] flex items-center border-b border-b-gray-500 mb-10'>
            <h1 className='font-medium text-gray-600 text-lg'>Analytics Performance</h1>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-10'>

            <div className='flex items-center gap-4 md:px-4'>
                <div className='w-[50px] h-[50px] bg-yellow-500 rounded-full flex justify-center items-center'>
                    <IoCarSport className='text-2xl'/>
                </div>
                <div>
                    <p className='font-semibold text-sm text-gray-600'>Cars Count</p>
                    <h1 className='md:text-4xl font-bold text-gray-800'>{carsCount} CARS</h1>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <div className='w-[50px] h-[50px] bg-red-500 rounded-full flex justify-center items-center'>
                    <FaUserGroup className='text-2xl'/>
                </div>
                <div>
                    <p className='font-semibold text-sm text-gray-600'>Clients Count</p>
                    <h1 className='md:text-4xl font-bold text-gray-800'>{clientsCount} Clients</h1>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <div className='w-[50px] h-[50px] bg-green-500 rounded-full flex justify-center items-center'>
                    <FaMoneyBillTrendUp className='text-2xl'/>
                </div>
                <div>
                    <p className='font-semibold text-sm text-gray-600'>Total income</p>
                    <h1 className='md:text-4xl font-bold text-gray-800'>{incomeTotal} $</h1>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Numbers