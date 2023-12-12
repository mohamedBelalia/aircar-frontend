import React from 'react'
import {AiFillStar , AiOutlineStar} from "react-icons/ai"
import monthNameObjs from "../../assets/JSONs/time.json"

const BASEIMGSPATH = "http://localhost/aircar_backend/Images/" ;

const CommentUi = ({name , date , profilePath , starsCount , commentText}) => {


    let dateParts = date.split(" ")
    let partOne = dateParts[0].split("-")

    let year = partOne[0] ;
    let month = partOne[1] ;
    let day = partOne[2] ;

    let monthName = monthNameObjs.months.filter((monthObj)=> monthObj.monthNbr == month)[0].monthName

    let fiveStars = [1 , 2 , 3 , 4 , 5] ;


  return (
    <div className='flex gap-4'>
          <div className='md:w-[60px] md:h-[60px] w-[50px] h-[50px] border-2 border-black rounded-full p-2'>
              <img className='w-[100%] h-[100%] object-cover rounded-full' src={BASEIMGSPATH + "userProfile.png"} alt="" />
          </div>

          <div className='md:w-[400px] flex flex-col gap-2'>
              <div className='flex gap-1'>
                {
                    fiveStars.map((star , index)=>(
                        index+1 <= starsCount 
                        ? <AiFillStar key={star} className='text-xl text-sky-700'/>
                        : <AiOutlineStar key={star} className='text-xl text-sky-700'/>
                    ))
                }
              </div>
              <p className='text-sm font-bold'>{name} <span className='text-xs font-bold text-gray-500'>{monthName} {day}, {year}</span></p>

              <p>
                {commentText}
              </p>
          </div>

      </div>
  )
}

export default CommentUi