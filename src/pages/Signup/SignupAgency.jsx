import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { UserContext } from '../../context/UserContext';
import { Navbar } from '../../layouts/Navbar';
import axios from 'axios';
import AlertError from './AlertError';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css"

const SignupAgency = () => {
  
    const navigate = useNavigate();

    const [signUpErrors , setSignUpErrors ] = useState({
        inputsEmpty : "" ,
        emailInvalide : "" ,
        shortPwd : "" ,
        pwdConfig : ""
    });

    const [agencyData , setAgencyData] = useState({
        agencyName : "" ,
        agencyAdresse : "" ,
        agencyCity : "" ,
        email : "" ,
        password : "",
        passwordConfig : "" ,
        phoneNbr : ""
    });

    const handlePhoneNbr = (value) => {
        setAgencyData({ ...agencyData , phoneNbr : value})
    }

    const handleChange = (e) => {
        setAgencyData({ ...agencyData , [e.target.name] : e.target.value})
    }   

    const submitForm = (e) => {
        e.preventDefault();

        const sendAgencyData = {
            agencyName : agencyData.agencyName ,
            agencyAdresse : agencyData.agencyAdresse ,
            agencyCity : agencyData.agencyCity ,
            email : agencyData.email ,
            pwd : agencyData.password ,
            phoneNbr : agencyData.phoneNbr
        }

        if(agencyData.password === agencyData.passwordConfig){

        axios.post("http://localhost/aircar_backend/signupAgency.php",sendAgencyData)
        .then((response)=>{
            if(response.data.status == "unvalideData"){
                setSignUpErrors(response.data);
            }
            else{
                navigate("/Login-agency")
            }
        })

        }
        else{
            setSignUpErrors({... signUpErrors , pwdConfig : "Password Confirmation is Wrong!"})
        }
        
    }


  return (
    <>
    <Navbar/>

        <div className='mb-[50px] mt-[50px]'>

        <div className='flex flex-row-reverse'>

            <div className='relative h-[500px] w-1/2 md:block hidden'>
                <img className='absolute top-0 left-0 w-[100%] h-[100%] object-cover' src="./dynamicImgs/bgAgency.jpg" alt="BMW MY DREAM CAR" />
                <div className='absolute w-[100%] h-[100%] bg-[#0782c969]'>

                </div>
            </div>

            <div className='w-[100%] flex flex-col justify-center items-center md:px-20 px-5'>
                <div className=' w-[100%] mb-10'>
                    <h1 className='text-center  text-3xl font-extrabold text-sky-700'>Air Car</h1>
                </div>
                <form onSubmit={submitForm} className='w-[100%] md:h-[90%] mx-auto'>
                    <div className='flex flex-col md:flex-row justify-between gap-5'>
                        <div className='border border-sky-950 md:w-1/2 w-full h-[40px] mb-8 mx-auto'>
                            <input onChange={handleChange} value={agencyData.name} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="text" placeholder='Agency Name' name='agencyName'/>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row justify-between gap-5'>
                        <div className='border border-sky-950 md:w-1/2 w-full h-[40px] mb-8 mx-auto'>
                            <input onChange={handleChange} value={agencyData.agencyCity} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="text" placeholder='Agency City' name='agencyCity'/>
                        </div>
                        
                        <div className='border border-sky-950 md:w-1/2 w-full h-[40px] mb-8 mx-auto'>
                            <input onChange={handleChange} value={agencyData.address} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="text" placeholder='Agency Adresse' name='agencyAdresse'/>
                        </div>
                    </div>
                    
                    <div className='flex flex-col md:flex-row justify-between gap-5'>
                        <div className='border border-sky-950 md:w-1/2 w-full h-[40px] mb-8 mx-auto'>
                            <input onChange={handleChange} value={agencyData.email} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="email" placeholder='Email' name='email'/>
                        </div>
                        
                        <div className='border flex justify-center items-center bg-sky-100 px-2 border-sky-950 md:w-1/2 w-full h-[40px] mb-8 mx-auto'>
                            <PhoneInput
                            country={'ma'}
                            onChange={handlePhoneNbr}
                            placeholder='Phone Number'
                            value={agencyData.phoneNbr}
                            inputStyle={{
                                background: 'transparent',
                                border : "solid transparent 0px",
                                height : '30px'
                              }}
                        />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row justify-between gap-5'>
                        <div className='border border-sky-950 md:w-1/2 w-full h-[40px] mb-8 mx-auto'>
                            <input onChange={handleChange} value={agencyData.password} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="password" placeholder='Password' name='password'/>
                        </div>
                        
                        <div className='border border-sky-950 md:w-1/2 w-full h-[40px] mb-8 mx-auto'>
                            <input onChange={handleChange} value={agencyData.passwordConfig} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="password" placeholder='Confirm Password' name='passwordConfig'/>
                        </div>
                    </div>


                    {
                        signUpErrors.inputsEmpty ?
                        <AlertError message={signUpErrors.inputsEmpty} />
                        : null
                    }

                    {
                        signUpErrors.emailInvalide ?
                        <AlertError message={signUpErrors.emailInvalide} />
                        : null
                    }

                    {
                        signUpErrors.shortPwd ?
                        <AlertError message={signUpErrors.shortPwd} />
                        : null
                    }

                    {
                        signUpErrors.pwdConfig ?
                        <AlertError message={signUpErrors.pwdConfig} />
                        : null
                    }
                    

                    <div className='flex gap-5 justify-center'>
                        <input className='md:w-[38%] w-[100%] h-[45px] bg-sky-600 hover:bg-sky-700 text-white cursor-pointer' type="submit" value="Signup" />
                    <Link to={"/Signup"} className='md:w-[38%] w-[100%] h-full'>
                       <button className='w-[100%] h-[45px] bg-transparent hover:bg-gray-200 border-2 border-sky-700 text-sky-600 cursor-pointer' >Sign up as Client</button>
                    </Link>
                    </div>
                </form>
                <p>All Ready have an account <Link to={"/Login-agency"}><span className='text-sky-600'>Login</span></Link> </p>
            </div>
    </div>

    </div>
    </>
  )

}

export default SignupAgency