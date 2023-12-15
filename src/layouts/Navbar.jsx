import React, { useEffect, useState , useContext } from 'react'
import { HiChevronDown , HiMenu , HiOutlineX , HiHome , HiOfficeBuilding , HiLocationMarker , HiPaperAirplane} from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Cookies from 'js-cookie';

const BASEIMGSPATH = "http://localhost/aircar_backend/Images/" ;

export const Navbar = () => {

    const {userInfo , agencyInfo , login , loginAgency , logOut , isAuth} = useContext(UserContext);
    const navigate = useNavigate();

    const [open , setOpen] = useState(false)

    const logoutHandle = () => {
        logOut();
        navigate("/Login")
    }

    useEffect(()=>{

        if(Cookies.get("utokenacc")){
            login(Cookies.get("utokenacc"))
        }

        if(Cookies.get("atokenacc")){
            loginAgency(Cookies.get("atokenacc"));
        }

    },[])


  

  return (
    <nav>
        <div className='flex w-[100%] bg-sky-800 py-2 px-16 justify-end z-50'>
            <div className='md:w-[120px] w-[100%] flex justify-between'>
                <p className='flex items-center justify-between text-white cursor-pointer '>MAD <HiChevronDown/></p>
                <p className='text-white cursor-pointer'>Ar</p>
            </div>
        </div>
        <div className='bg-white px-16 hidden md:flex justify-between items-center h-[50px]'>
            <h1 className='text-2xl font-extrabold text-sky-700'>Air Car</h1>
            <div className='w-[40%]'>
                <ul className='flex justify-between items-center w-[100%]'>
                    <Link to={"/"}><li className='cursor-pointer hover:underline underline-offset-8'>Home</li></Link>
                    <Link to={"/Near-cars"}><li className='cursor-pointer hover:underline underline-offset-8'>Near Cars</li></Link>

                    {
                        agencyInfo.email ?

                        <Link to={"/Car_infromation"}><li className='cursor-pointer hover:underline underline-offset-8'>Rent Your Car</li></Link>

                        : null
                    }
                    {
                        userInfo.first_name || agencyInfo.name ?
                        <Link to={"/Search-Results"}><li className='cursor-pointer hover:underline underline-offset-8'>Search</li></Link> : null
                    }
                    
                    <li className='cursor-pointer hover:underline underline-offset-8'>Locations</li>
                    
                </ul>
            </div>

            {
                userInfo.first_name || agencyInfo.name
                ? 
                <div className='w-auto gap-10 flex justify-between'>
                    {
                        userInfo.first_name ? 
                        <div className='w-[25px] h-[25px] cursor-pointer'>
                            <img className='w-full h-full rounded-full' src={BASEIMGSPATH + userInfo.userImg} alt="" />
                        </div>
                        :     
                        <a href={`/dashboard/${agencyInfo.name}`}  className='w-[25px] h-[25px] cursor-pointer'>
                            <img className='w-full h-full rounded-full' src={BASEIMGSPATH + agencyInfo.logoImg} alt="" />
                        </a>
                    }
                    <button className='px-5 bg-sky-600 rounded-sm text-white' onClick={logoutHandle}>Logout {">"}</button>
                </div>
                :
                <div className='w-auto gap-10 flex justify-between'>
                    <Link to={"/Login"}><a href="#" className='px-4 py-1 rounded-sm hover:bg-yellow-300 transition-all ease-in duration-200'>Log in</a></Link>
                    <Link to={"/Signup"} className='px-5 bg-sky-600 rounded-sm text-white'><button className='h-[100%]'>Get Started {">"}</button></Link>
                </div>

            }
            
        </div>

        {/* Mobile Part */}

        <div className='md:hidden px-5 pt-5 flex justify-end w-full z-auto'>
            <HiMenu className='text-4xl cursor-pointer' onClick={()=>setOpen(true)}/>
            {open ? <MobileMenu agencyInfo={agencyInfo} userInfo={userInfo} close={()=>setOpen(false)}/> : null} 
        </div>

    </nav>
  )
}


export const MobileMenu = ({agencyInfo , userInfo , close}) => {

    const {logOut} = useContext(UserContext);
    const navigate = useNavigate();
    const logoutHandle = () => {
        logOut();
        navigate("/Login")
    }
    return (
        <div>
            <div className='fixed inset-0 top-0 left-0 h-screen w-full backdrop-blur-sm bg-gray-500 bg-opacity-60'>
                <div className='fixed inset-0 top-0 left-0 p-5'>
                    <div className='w-full bg-white rounded-xl p-5'>
                        <div className='flex items-center justify-between mb-6'>
                            <h1 className='text-2xl font-extrabold text-sky-700'>Air Car</h1>
                            <HiOutlineX className='text-4xl cursor-pointer' onClick={close}/>
                        </div>
                        <div>
                        <ul className='flex flex-col gap-3 font-medium text-xl text-sky-700 mb-8'>
                                <Link to={"/"}><li onClick={close}>Home</li></Link>

                                {
                                    agencyInfo.email ?

                                    <Link to={"/Car_infromation"}><li>Rent a Car</li></Link>

                                    : null
                                }
                                {
                                    userInfo.first_name || agencyInfo.name ?
                                    <Link to={"/Search-Results"}><li>Search</li></Link> : null
                                }
                                {
                                    !agencyInfo.name ? 
                                    <li>Rent a Car</li>
                                    : null
                                }
                                <li>Locations</li>
                                
                        </ul>
                        </div>
                        
                        {
                            userInfo.first_name || agencyInfo.name
                            ? 
                            <div className='flex justify-between items-center'>
                                {
                                    userInfo.first_name ? 
                                    <div>
                                        <img className='w-[40px] h-[40px] border-2 border-green-600 p-1 rounded-full' src={BASEIMGSPATH + userInfo.userImg} alt="" />
                                    </div>
                                    :     
                                    <a href={`/dashboard/${agencyInfo.name}`}>
                                        <img className='w-[40px] h-[40px] border-2 border-green-600 p-1 rounded-full' src={BASEIMGSPATH + agencyInfo.logoImg} alt="" />
                                    </a>
                                }
                                <button className='font-bold text-xl text-sky-700' onClick={logoutHandle}>Logout {">"}</button>
                            </div>
                            :
                            <div className='flex justify-between items-center'>
                                <Link to={"/Login"}><a className='font-bold text-xl text-sky-700 mb-8' href="#">Log in</a></Link>
                                <Link to={"/Signup"} ><button className='font-bold text-xl text-sky-700'>Get Started</button></Link>
                            </div>

                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
