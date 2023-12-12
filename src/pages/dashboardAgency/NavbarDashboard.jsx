import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';

const NavbarDashboard = () => {

  const {logOut} = useContext(UserContext);

  const navigate = useNavigate();
    
  const logoutHandle = () => {
      logOut();
      navigate("/Login")
  }

  return (
    <div className='p-6 shadow-lg shadow-gray-400 bg-white border rounded-md border-sky-900 flex flex-col justify-between h-[100%]'>
        <div className=''>
            <h1 className='text-2xl font-extrabold text-sky-700 md:mb-4'>Air Car</h1>
            <ul>
                <Link to={"/"}><li className='my-2 text-gray-600 cursor-pointer hover:text-gray-800 font-bold'>Home</li></Link>
                <Link to={"/Car_infromation"}><li className='my-2 text-gray-600 cursor-pointer hover:text-gray-800 font-bold'>Rent New Car</li></Link>
                <Link to={"/Search-Results"}><li className='my-2 text-gray-600 cursor-pointer hover:text-gray-800 font-bold'>Search</li></Link>
                <li className='my-2 text-gray-600 cursor-pointer hover:text-gray-800 font-bold'>Account</li>
            </ul>
        </div>
        <div className='flex justify-center items-center'>
            <button onClick={logoutHandle} className='md:w-[80%] w-full bg-sky-900 text-white h-[35px] rounded-md hover:bg-sky-800'>Logout</button>
        </div>
    </div>
  )
}

export default NavbarDashboard