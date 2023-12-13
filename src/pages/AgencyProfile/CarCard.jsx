import React from 'react'
import { FaStar , FaRegStar , FaStarHalfAlt  } from "react-icons/fa";
import { useNavigate } from 'react-router';

const BASEIMGSPATH = "http://localhost/aircar_backend/Images/" ;

const CarCard = ({carInfo}) => {

    const navigate = useNavigate();

    const carClicked = (id) => {
        window.scrollTo(0, 0);
        navigate("/Car_Information/" + id)
    }

  return (
    <div className='sm:mx-auto border border-1 border-black bg-white rounded-md p-5 md:w-[450px] h-auto pb-5'>
        <div className='flex justify-between mb-6 gap-5'>
            <img className='w-1/2 rounded-md object-cover' src={BASEIMGSPATH + carInfo.img_path} />
            <div className='w-1/2 flex flex-col gap-3'>
                <h1 className='font-semibold md:text-2xl'>{carInfo.model}</h1>
                <div className='flex flex-col'>
                    <small>{carInfo.brand}</small>
                    <small>({carInfo.category})</small>
                </div>
            </div>
        </div>
        <div className='flex justify-between items-center text-xl md:w-[90%] mx-auto mb-6'>
            <p>{carInfo.seats_nbr} Seats</p>
            <p>{carInfo.transmission}</p>
            <p>{carInfo.fuel_type}</p>
        </div>
        <div className='flex flex-col md:flex-row md:gap-0 gap-3 justify-between items-center  mb-6'>
            <p>Published at <span className='text-sky-700 font-bold'>27-06-2023</span></p>
            <div className='flex gap-2 text-2xl text-sky-800'>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaRegStar/>
                <FaRegStar/>
            </div>
        </div>

        <div className='flex justify-between items-center md:w-[90%] mx-auto mt-10'>
            <h1 className='text-2xl text-green-700 font-bold'>{carInfo.price_per_day} DH</h1>
            <button onClick={()=>carClicked(carInfo.id)} className='bg-sky-700 w-[100px] h-[30px] rounded-md text-white'>Details</button>
        </div>
    </div>
  )
}


export default CarCard