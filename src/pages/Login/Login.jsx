import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertLogin from './AlertLogin';
import { UserContext } from '../../context/UserContext';
import Cookies from 'js-cookie';
import { Navbar } from '../../layouts/Navbar';

const Login = () => {

    const navigate = useNavigate();

    const {login} = useContext(UserContext);

    const [loginErrors , setLoginErrors] = useState(); 

    const [userData , setUserData] = useState({
        email : "" ,
        pwd : ""
    });

    const handleUserData = (e) =>{
        setUserData({ ...userData , [e.target.name] : e.target.value})
    }

    const submitForm = (e) =>{
        e.preventDefault();

        const sendUserData = {
            email : userData.email ,
            pwd : userData.pwd
        }

        axios.post("http://localhost/aircar_backend/login.php" , sendUserData)
        .then((result)=>{
                if(result.data.status == "unvalideLogin" || result.data.status == "wrongData"){
                    setLoginErrors(result.data);
                }
                else if(result.data.status == "successLogin"){
                    Cookies.set("utokenacc" , result.data.token , { expires: 30 })
                    login(result.data.token);
                    navigate("/")
                }
        })
    }

    

  return (
        <>
        <Navbar/>
    <div className='mb-[50px] mt-[50px]'>
        <div className='flex'>
            <div className='relative h-[500px] w-1/2 md:block hidden'>
                <img className='absolute top-0 left-0 w-[100%] h-[100%] object-cover' src="./dynamicImgs/bmwLogin.jpg" alt="BMW MY DREAM CAR" />
                <div className='absolute w-[100%] h-[100%] bg-[#0782c969]'>
                </div>
            </div>
            <div className='md:w-1/2 w-[100%] flex flex-col justify-center items-center'>
                <div className=' w-[100%] mb-10'>
                    <h1 className='text-center  text-3xl font-extrabold text-sky-700'>Air Car</h1>
                </div>
                <form onSubmit={submitForm} className='md:w-[70%] w-[90%] md:h-[90%] mx-auto'>
                    <div className='border border-sky-950 md:w-[80%] h-[40px] mb-8 mx-auto'>
                        <input onChange={handleUserData} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="email" placeholder='Email' name='email'/>
                    </div>
                    
                    <div className='border border-sky-950 md:w-[80%] h-[40px] mb-8 mx-auto'>
                        <input onChange={handleUserData} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="password" placeholder='Password' name='pwd'/>
                    </div>

                    <div className='flex justify-center md:w-[80%] mx-auto gap-3'>
                        <input className='w-1/2 h-[45px] bg-sky-600 hover:bg-sky-700 text-white cursor-pointer' type="submit" value="Login" />

                        <Link to={"/Login-agency"} className='w-1/2'>  
                        <button className='w-full h-full bg-transparent hover:bg-gray-200 border-2 border-sky-700 text-sky-600'>Login as Agency</button>
                        </Link>  
                    </div>

                    {
                        loginErrors ? <AlertLogin status={loginErrors.status}/> : null 
                    }

                    {
                        loginErrors ? <AlertLogin status={loginErrors.emptyFields}/> : null 
                    }

                </form>
                <p>I don't have an account <Link to={"/Signup"}><span className='text-sky-600'>Signup</span></Link> </p>
            </div>
        </div>
    </div>  
        </>
  )
}

export default Login