import React, { useContext, useEffect, useRef, useState } from 'react'
import {HiChevronLeft, HiChevronRight} from "react-icons/hi";
import {MdAirlineSeatReclineExtra} from "react-icons/md"
import {TbManualGearbox} from "react-icons/tb"
import {BsEvStationFill} from "react-icons/bs"
import axios from 'axios';
import { useNavigate } from 'react-router';
import { UserContext } from '../../context/UserContext';

const screenWidth = 510 ;
const BASEIMGSPATH = "http://localhost/aircar_backend/Images/" ;

const ListningCars = () => {

    const {userInfo , agencyInfo} = useContext(UserContext);

    const cardRef = useRef();
    const [carsInfo , setCarsInfo] = useState(null);

    const sliderRight = (element) =>{
        element.scrollLeft += screenWidth
    }
    const sliderLeft = (element) =>{
        element.scrollLeft -= screenWidth
    }
    
    const navigate = useNavigate();

    useEffect(()=>{
    axios.get("http://localhost/aircar_backend/getCarsInfo.php")
        .then((response)=> {
            if(response.data.status == "noData"){
                console.log("no data");
            }
            else{
                setCarsInfo(response.data)
            }
        }).catch((err)=>{
            console.log(err);
        })
    },[])


    const carClicked = (id) => {
        window.scrollTo(0, 0);
        if(userInfo.id || agencyInfo.id){
            navigate("/Car_Information/" + id)
        }
        else{
            navigate("/Login")
        }
    }
    


  return (
    <>
    {
        Array.isArray(carsInfo) ? 
   
    <div className='md:px-16 mb-[100px]'>

        <div className='flex justify-between'>
            <h1 className='text-4xl font-bold md:w-[350px] w-[100%] md:text-start text-center mb-9'>Book Your 
            <span className='text-sky-500'> Suitable Car</span></h1>

            <div className='flex gap-5'>
            <HiChevronLeft className='hidden md:block text-sky-900  cursor-pointer rounded-md w-[50px] text-center h-[50px] bg-sky-500'
           onClick={()=>sliderLeft(cardRef.current)}/>
            <HiChevronRight className='hidden md:block text-sky-900  cursor-pointer rounded-md w-[50px] text-center h-[50px] bg-sky-500'
           onClick={()=>sliderRight(cardRef.current)}/>
            </div>

        </div>

        

        <div className='py-10 mx-auto w-full scroll-smooth flex overflow-x-auto px-16 scrollbar-none' ref={cardRef}>
            {
            
                carsInfo.map((item,key)=>key<=15&&(
                    
                    <div onClick={()=>carClicked(item.id)} key={key} className='md:min-w-[300px] pb-10 min-w-full md:h-[300px] h-[320px] object-cover object-left-top md:mr-14 mr-6 rounded-lg 
                    border border-gray-400  cursor-pointer hover:scale-105 transition-all duration-200 ease-in'>
                        <img className='w-[100%] h-[70%] object-cover rounded-t-md' src={BASEIMGSPATH + item.img_path} alt="" />

                        <div className='px-4 py-5'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-[12px]'><span className='text-xl font-bold text-sky-800'>{item.price_per_day}</span>/day</h1>
                                <h1 className='text-[12px]'><span className='font-bold text-[15px] text-green-700'>8.7</span>/ 39 reviews</h1>
                            </div>
                            <div className='flex justify-between mt-3'>
                                <div className='flex flex-col gap-1 items-center'>
                                    <MdAirlineSeatReclineExtra className='text-xl'/>
                                    <h1 className='text-[14px]'>{item.seats_nbr} Seats</h1>
                                </div>
                                <div className='flex flex-col gap-1 items-center'>
                                    <TbManualGearbox className='text-xl'/>
                                    <h1 className='text-[14px]'>{item.transmission}</h1>
                                </div>
                                <div className='flex flex-col gap-1 items-center'>
                                    <BsEvStationFill className='text-xl'/>
                                    <h1 className='text-[14px]'>{item.fuel_type}</h1>
                                </div>
                            </div>
                        </div>

                       
                    </div>
                ))
                
            }
        </div>
        <div className='flex justify-center'>
            <a href="/Search-Results">
            <button className='flex gap-2 justify-center items-center rounded-md bg-sky-500 hover:bg-sky-600 h-[40px] w-[100px]'>More <HiChevronRight/></button>
            </a>
        </div>
    </div>
        :  // ELES CONDITON
        <div className='md:px-16 mb-[100px] flex flex-col items-center gap-3 justify-center'>
            <div class="loading"></div>
            <p className='font-bold text-[#3fa0d4]'>Loading Cars</p>
        </div>
     }
    </>
  )
}

export default ListningCars