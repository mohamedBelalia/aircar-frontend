import React from 'react'
import monthNameObjs from "../../assets/JSONs/time.json"
import { useNavigate } from 'react-router';

const BASEIMGSPATH = "http://localhost/aircar_backend/Images/" ;

const OwnerInfo = ({name , email , createdDate , agenceId}) => {

    
    let dateParts = createdDate.split(" ")
    let partOne = dateParts[0].split("-")
    
    let year = partOne[0] ;
    let month = partOne[1] ;
    let day = partOne[2] ;
    
    let monthName =  monthNameObjs.months.filter((monthObj)=> monthObj.monthNbr == month)[0].monthName
    
    const navigate = useNavigate();

    const handleNavigate = () => {
        window.scrollTo(0,0);
        navigate(`/Agency/${name}/${agenceId}`)
    }   

  return (
    <div className='mt-10 mb-5 md:px-40'>
        <h1 className='font-bold text-xl mb-6'>Hosted By</h1>
        <div className='flex justify-between items-center md:flex-row flex-col gap-10'>
            <div onClick={handleNavigate} className='flex gap-5 md:w-auto w-[100%] cursor-pointer select-none'>
                <div className='w-[100px] h-[100px] border-2 border-black rounded-full p-2'>
                    <img className='w-[100%] h-[100%] object-cover rounded-full' src={BASEIMGSPATH + "userProfile.png"} alt="" />
                </div>
                <div className=' pt-3'>
                    <h1 className='font-bold text-2xl'>{name}</h1>
                    <p className='text-sm'>{email}</p>
                    <p className='text-xs font-bold text-gray-500'>Joind {monthName} {day}, {year}</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default OwnerInfo