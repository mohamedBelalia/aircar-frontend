import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertLogin from './AlertLogin';
import { UserContext } from '../../context/UserContext';
import Cookies from 'js-cookie';
import { Navbar } from '../../layouts/Navbar';
import "react-phone-input-2/lib/style.css"
import PhoneInput from 'react-phone-input-2';

const LoginAgency = () => {

    const navigate = useNavigate();

    const {login , loginAgency} = useContext(UserContext);

    const [loginErrors , setLoginErrors] = useState(); 
    

    const handlePhoneNbr = (value) => {
        setAgencyData({ ...agencyData , phoneNbr : value})
    }

    const [agencyData , setAgencyData] = useState({
        email : "" ,
        pwd : "",
        phoneNbr : ""
    });

    const handleAgencyData = (e) =>{
        setAgencyData({ ...agencyData , [e.target.name] : e.target.value})
    }

    

    const submitForm = (e) =>{
        e.preventDefault();

        const sendAgencyData = {
            email : agencyData.email ,
            pwd : agencyData.pwd,
            phoneNbr : agencyData.phoneNbr
        }

        axios.post("http://localhost/aircar_backend/loginAgency.php" , sendAgencyData)
        .then((response)=>{
            if(response.data.status === "unvalideLogin" || response.data.status === "wrongData" ){
                setLoginErrors(response.data)
            }
            else if(response.data.status === "successLogin"){
                Cookies.set("atokenacc" , response.data.token , { expires: 30 })
                loginAgency(response.data.token)
                navigate("/")
            }
        })
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
            <div className='md:w-1/2 w-[100%] flex flex-col justify-center items-center'>
                <div className=' w-[100%] mb-10'>
                    <h1 className='text-center  text-3xl font-extrabold text-sky-700'>Air Car</h1>
                </div>
                <form onSubmit={submitForm} className='md:w-[70%] w-[90%] md:h-[90%] mx-auto'>
                    <div className='border border-sky-950 md:w-[80%] h-[40px] mb-8 mx-auto'>
                        <input onChange={handleAgencyData} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="email" placeholder='Email' name='email'/>
                    </div>

                    <div className='border px-2 flex justify-center items-center border-sky-950 md:w-[80%] h-[40px] mb-8 mx-auto bg-sky-100 '>
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
                    
                    <div className='border border-sky-950 md:w-[80%] h-[40px] mb-8 mx-auto'>
                        <input onChange={handleAgencyData} className='bg-sky-100 w-[100%] h-[100%] pl-5 outline-none' type="password" placeholder='Password' name='pwd'/>
                    </div>

                    <div className='flex justify-center md:w-[80%] mx-auto gap-3'>
                        <input className='w-1/2 h-[45px] bg-sky-600 hover:bg-sky-700 text-white cursor-pointer' type="submit" value="Login" />
                        <Link to={"/Login"} className='w-1/2'>  
                        <button className='w-full h-full bg-transparent hover:bg-gray-200 border-2 border-sky-700 text-sky-600'>Login as Client</button>
                        </Link>  
                    </div>

                    {
                        loginErrors ? <AlertLogin status={loginErrors.status}/> : null 
                    }
                    {
                        loginErrors ? <AlertLogin status={loginErrors.emptyFields}/> : null 
                    }

                </form>
                <p>I don't have an account <Link to={"/Signup-agency"}><span className='text-sky-600'>Signup</span></Link> </p>
            </div>
        </div>
    </div>  
        </>
  )
}

export default LoginAgency