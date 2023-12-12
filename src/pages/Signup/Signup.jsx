import axios from 'axios';
import React, { useState , useContext } from 'react'
import AlertError from './AlertError';
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from '../../context/UserContext';
import { Navbar } from '../../layouts/Navbar';


const Signup = () => {

    const {login} = useContext(UserContext);

    const navigate = useNavigate();

    const [signUpErrors , setSignUpErrors ] = useState({
        allFieldsRequired : "" ,
        unValideEmail : "" ,
        unValidePwd : ""
    });
    const [userData , setUserData] = useState({
        firstName : "" ,
        lastName : "" ,
        email : "" ,
        pwd : ""
    });


    const handleChange = (e) => {
        setUserData({ ...userData , [e.target.name] : e.target.value})
    }   

    const submitForm = (e) => {
        e.preventDefault();

        const sendUserData = {
            first_name : userData.firstName,
            last_name : userData.lastName,
            email : userData.email,
            pwd : userData.pwd
        }

        axios.post("http://localhost/aircar_backend/signup.php",sendUserData)
        .then((result)=>{
            if(result.data.status == "unvalideData"){
                setSignUpErrors(result.data);
            }
            else{
                login();
                navigate("/Login")
            }
        })
    }


  return (
    <>
    <Navbar/>
        <div className='mb-[50px] mt-[50px]'>
        <div className='flex'>
            <div className='relative h-[500px] w-1/2 md:block hidden'>
                <img className='absolute top-0 left-0 w-[100%] h-[100%] object-cover' src="./dynamicImgs/bmwSignup.jpg" alt="BMW MY DREAM CAR" />
                <div className='absolute w-[100%] h-[100%] bg-[#0782c969]'>

                </div>
            </div>
            <div className='md:w-1/2 w-[100%] flex flex-col justify-center items-center'>
                <div className=' w-[100%] mb-10'>
                    <h1 className='text-center  text-3xl font-extrabold text-sky-700'>Air Car</h1>
                </div>
                <form onSubmit={submitForm} className='md:w-[70%] w-[90%] md:h-[90%] mx-auto'>
                    <div className='border border-sky-950 md:w-[80%] h-[40px] mb-8 mx-auto'>
                        <input onChange={handleChange} value={userData.firstName} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="text" placeholder='First Name' name='firstName'/>
                    </div>
                    
                    <div className='border border-sky-950 md:w-[80%] h-[40px] mb-8 mx-auto'>
                        <input onChange={handleChange} value={userData.lastName} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="text" placeholder='Last Name' name='lastName'/>
                    </div>
                    <div className='border border-sky-950 md:w-[80%] h-[40px] mb-8 mx-auto'>
                        <input onChange={handleChange} value={userData.email} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="text" placeholder='Email' name='email'/>
                    </div>
                    {
                        signUpErrors.unValideEmail ? <AlertError message={signUpErrors.unValideEmail}/> : null
                    }
                    <div className='border border-sky-950 md:w-[80%] h-[40px] mb-8 mx-auto'>
                        <input onChange={handleChange} value={userData.pwd} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="password" placeholder='Password' name='pwd'/>
                    </div>

                    {
                        signUpErrors.unValidePwd ? <AlertError message={signUpErrors.unValidePwd}/> : null
                    }

                    {
                        signUpErrors.allFieldsRequired ? <AlertError message={signUpErrors.allFieldsRequired}/> : null
                    }

                    

                    <div className='flex gap-5 justify-center'>
                        <input className='md:w-[38%] w-[100%] h-[45px] bg-sky-600 hover:bg-sky-700 text-white cursor-pointer' type="submit" value="Signup" />
                    <Link to={"/Signup-agency"} className='md:w-[38%] w-[100%] h-full'>
                       <button className='w-[100%] h-[45px] bg-transparent hover:bg-gray-200 border-2 border-sky-700 text-sky-600 cursor-pointer' >Sign up as agency</button>
                    </Link>
                    </div>
                </form>
                <p>All Ready have an account <Link to={"/Login"}><span className='text-sky-600'>Login</span></Link> </p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup