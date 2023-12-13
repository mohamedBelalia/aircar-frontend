import React, { useEffect, useState } from 'react'
import { Navbar } from '../../layouts/Navbar'
import { FaLocationDot } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaStar , FaRegStar , FaStarHalfAlt  } from "react-icons/fa";
import AgencyCars from './AgencyCars';
import { useParams } from 'react-router';
import axios from 'axios';
import StarsAgency from './StarsAgency';

const BASEIMGSPATH = "http://localhost/aircar_backend/Images/" ;

const AgencyProfile = () => {

    const { agenceName , id } = useParams();
    const [agencyData , setAgencyData] = useState([]);
    const [wrongData , setWrongData] = useState(false)
  
    useEffect(()=>{
  
        const fetchAgencyData = () => {
          axios.get(`http://localhost/aircar_backend/agencyProfile.php?agencyName=${agenceName}&agencyId=${id}`)
          .then((response)=>{
              if(response.data.status === "wrongData"){
                setWrongData(true)
              }
              else{
                setAgencyData(response.data)
              }
          })
        }
  
        fetchAgencyData()
    },[])
  
    function formatDate(inputDate) {
        const dateObject = new Date(inputDate);
      
        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
      
        const day = dateObject.getDate();
        const monthIndex = dateObject.getMonth();
        const year = dateObject.getFullYear();
      
        return `${monthNames[monthIndex]} ${day}, ${year}`;
      }

  return (
    <>
        <Navbar/>
        {
             wrongData ? <div>Error</div> :
        <div>
            <div className=' w-full h-[120px] '></div>
            <div className='flex flex-col items-center justify-center bg-gray-200 pb-9'>
                <div className='bg-white rounded-md border-2 border-sky-900 pb-10 w-[80%] -mt-14 z-auto mb-10'>
                    <div className='flex justify-center'>
                        <div className='md:w-[100px] md:h-[100px] w-[80px] h-[80px] rounded-full border-8 border-white bg-white md:-mt-14 -mt-10'>
                            <img className='object-cover border-2 border-sky-900 w-full h-full rounded-full' src={`${BASEIMGSPATH}${agencyData.logoImg}`} alt="" />
                        </div>
                    </div>
                    <div className='text-center'>
                        <h1 className='font-bold md:text-3xl text-xl'>{agencyData.name}</h1>
                        <p className='text-gray-700 md:w-[60%] w-[80%] mt-4  ml-auto mr-auto'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam deleniti laborum, totam sequi excepturi corporis minima unt rem ipsam!
                        </p>
                    </div>

                    <div className='md:w-[60%] w-[80%] ml-auto mr-auto mt-6 flex md:flex-row flex-col justify-between items-center gap-4'>
                        
                        <div className='flex gap-2 items-center'>
                            <FaLocationDot className='text-gray-500 text-xl'/>
                            <h2 className='text-sm font-bold text-gray-500'>{agencyData.address}</h2>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <FaBirthdayCake className='text-gray-500 text-xl'/>
                            <h2 className='text-sm font-bold text-gray-500'>Joined on {formatDate(agencyData.created_at?.split(" ")[0])}</h2>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <MdEmail className='text-gray-500 text-xl'/>
                            <h2 className='text-sm font-bold text-gray-500'>{agencyData.email}</h2>
                        </div>

                    </div>

                    <StarsAgency agencyId={agencyData.id}/>

                </div>

                <AgencyCars agencyRef={agencyData.id}/>

            </div>
        </div>

        }
    </>
  )
}

export default AgencyProfile