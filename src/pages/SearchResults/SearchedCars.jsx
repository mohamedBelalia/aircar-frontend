import React, { useEffect, useState } from 'react'
import {MdAirlineSeatReclineExtra} from "react-icons/md" 
import {TbManualGearbox} from "react-icons/tb" 
import {BsEvStationFill} from "react-icons/bs" 
import axios from 'axios'
import { useNavigate } from 'react-router'


const BASEIMGSPATH = "http://localhost/aircar_backend/Images/" ;

const SearchedCars = ({searchedFilters}) => {

    const [filtredCars , setFiltredCars] = useState([]);

    const [pagesNbr , setPagesNbr] = useState(5);
        
    const navigate = useNavigate();

    const carClicked = (id) => {
        window.scrollTo(0, 0);
        navigate("/Car_Information/" + id)
    }

    const getCars = () => {
        axios.post("http://localhost/aircar_backend/filterCars.php?" , searchedFilters)
        .then((response)=>{
            setFiltredCars(response.data)
        })
    }

    useEffect(()=>{
        setFiltredCars([])
        getCars();
    },[searchedFilters])


  return (
    <div className='my-10'>

        {  
        filtredCars.length > 0 ?  

            filtredCars.map((car,key)=>key<pagesNbr&&(
            
                <div key={key} className='flex mb-4 md:flex-row flex-col gap-5 p-4 md:mx-h-[200px] border border-sky-950 rounded-md'>
           
            <div className='md:w-1/3 w-[100%] h-[100%] '>
                <img className='rounded-md h-[100%] w-[100%] object-cover' src={BASEIMGSPATH + car.img_path}/>
            </div>

            <div className='md:w-1/3 w-[100%] h-[100%]'>
                <div className='flex items-end'>
                    <h1 className='font-bold text-xl'>{car.model} 
                    <span className='cursor-pointer text-[13px] font-normal bg-sky-500 text-white ml-2 px-4 rounded-md'>{car.brand}</span>
                    </h1>
                </div>
                <div className='flex pr-20 flex-wrap justify-between mt-3 select-none'>
                    <div className='flex flex-col gap-1 items-center'>
                        <MdAirlineSeatReclineExtra className='text-xl'/>
                        <h1 className='text-[14px]'>{car.seats_nbr} Seats</h1>
                    </div>
                    <div className='flex flex-col gap-1 items-center'>
                        <TbManualGearbox className='text-xl'/>
                        <h1 className='text-[14px]'>{car.transmission}</h1>
                    </div>
                    <div className='flex flex-col gap-1 items-center'>
                        <BsEvStationFill className='text-xl'/>
                        <h1 className='text-[14px]'>{car.fuel_type}</h1>
                    </div>
                </div>
                <div className='flex gap-3 mt-3'>
                    <p className='text-[15px] border-b border-gray-600 font-bold text-gray-600 cursor-pointer'>{car.city}</p>
                </div>
                <div className='flex gap-3 mt-3'>
                    <h1 className='text-[12px] text-center rounded-md flex justify-center items-center bg-gray-600 text-white px-1'>Hosted By</h1>
                    <p className='font-bold text-sky-900'>{car.name}</p>
                </div>
                
            </div>

            <div className='md:w-1/3 w-[100%] flex md:flex-col flex-row md:justify-normal justify-between gap-2 items-end'>
                <div>
                    <p className='text-sm'>Price Per Day</p>
                    <h1 className='font-bold text-2xl text-green-700'>{car.price_per_day} Dh</h1>
                </div>
                <button onClick={()=>carClicked(car.id)} className='w-[150px] h-[30px] bg-sky-500 rounded-md text-white'>View Details</button>
            </div>
        </div>
            ))
         : <div className='flex justify-center items-center'>
                <img src="./dynamicImgs/imgIcons/carNotFound.png" alt="cars not found" />
            </div>}

        <div className='flex justify-center'>
            <button onClick={()=>setPagesNbr(pagesNbr+5)} className='bg-sky-700 text-white w-[200px] h-[30px] rounded-md'>More</button>
        </div>

    </div>
  )
}

export default SearchedCars