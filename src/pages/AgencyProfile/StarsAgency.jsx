import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

const StarsAgency = ({agencyId}) => {

    const [rateInfo , setRateInfo] = useState([])
    let starsCount = 0 ;
    let raters = 0 ;

    useEffect(()=>{

        const fetchAgencyStars = () => {
            axios.get(`http://localhost/aircar_backend/agencyStars.php?agencyId=${agencyId}`)
            .then((response)=>{
                setRateInfo(response.data);
            })
        }
        fetchAgencyStars()
    },[agencyId])

    rateInfo.map((rate)=>{
        starsCount += rate.starsNbr ;
        raters ++ ;
    })

    let rateScore = (starsCount / raters) * 2 ;

    if(!(/^\d+$/.test(rateScore))){
        rateScore = 0
    }

    let starFull = Math.floor(starsCount / raters)
    let halfStar = 0 ;
    let starEmpty = 0 ;
    if((starsCount / raters)-starFull > 0){
        halfStar = 1
        starEmpty = starFull+1 - 5;
    }
    else{
        starEmpty = 5 - starFull ;
    }


  return (
    <div className='mt-10'>
        <h1 className='text-center mb-4 text-xl font-bold text-sky-800'>Clients Ranking</h1>
        <div className='flex justify-center items-center flex-col'>
            <div className='w-[90px] h-[90px] border-4 border-sky-600 rounded-full flex justify-center items-center'>
                <h1 className='text-3xl font-bold text-sky-800'>{rateScore}<span className='text-sm font-normal'>/10</span></h1>
            </div>
            {
                (/^\d+$/.test(starFull) 
                && /^\d+$/.test(halfStar) 
                && /^\d+$/.test(starEmpty)) && 
            
            <div className='flex gap-3 mt-3'>
                {
                    Array(starFull).fill(1).map((star,key)=>(
                        <FaStar className='text-2xl text-sky-800'/>
                    ))
                }
                {
                    Array(halfStar).fill(1).map((star,key)=>(
                        <FaStarHalfAlt className='text-2xl text-sky-800'/>
                    ))
                }
                {
                    Array(starEmpty).fill(1).map((star,key)=>(
                        <FaRegStar className='text-2xl text-sky-800'/>
                    ))
                }   
            </div>
            }
            <small className='mt-3'>{raters} Raters</small>
        </div>
    </div>
  )
}

export default StarsAgency