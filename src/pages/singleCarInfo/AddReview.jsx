import axios from 'axios'
import React, { useState } from 'react'
import {AiFillStar , AiOutlineStar} from "react-icons/ai"

const AddReview = ({idCar , changedData , onDataChanged , clientId}) => {

    const [commentAdded , setCommentAdded] = useState(false)
    const [commentEmpty , setCommentEmpty] = useState(false)
    const [selectedStarts , setSelectedStarts] = useState(0)

    const [commentInfo , setCommentInfo] = useState({
        userId : clientId ,
        carId : idCar ,
        commentText : "" ,
        starsCount : ""
    })


    const handleChange = (e) => {
        setCommentInfo({... commentInfo , [e.target.name] : e.target.value} )
    }

    const submitForm = (e) => {

        e.preventDefault();

        const sendedCommetInfo = {
            userId : commentInfo.userId ,
            carId : commentInfo.carId ,
            commentText : commentInfo.commentText ,
            starsCount :selectedStarts
        }

        axios.post("http://localhost/aircar_backend/addComment.php", sendedCommetInfo)
        .then((result)=>{
            if(result.data.status == "dataNotComplated"){
                setCommentEmpty(true)
            }
            else{
                setCommentAdded(true)
                setCommentInfo({... commentInfo , ["commentText"] : ""} )
                setSelectedStarts(0)
                onDataChanged(changedData+1);
            }
            
        })

    }

  return (
    <div className='mt-16 mb-5 md:px-40'>
        <h1 className='font-bold text-xl mb-6'>Add a Review</h1>

        {
            commentAdded ? 
            <>
                <div className='my-5 w-[100%] h-[50px] rounded-md bg-green-500 text-sky-950 flex justify-center items-center font-bold'>
                    <p>Your Comment Added Successfully !</p>
                </div>
                {
                  setTimeout(()=>{setCommentAdded(false)} , 5000)
                }
            </>
            : null
        }

{
            commentEmpty ? 
            <>
                <div className='my-5 w-[100%] h-[50px] rounded-md bg-red-500 text-white flex justify-center items-center font-bold'>
                    <p>Write a Valide Comment with the Stars Rating !</p>
                </div>
                {
                  setTimeout(()=>{setCommentEmpty(false)} , 4000)
                }
            </>
            : null
        }
        

        <div>
            <form>
                <div>
                    <textarea onChange={handleChange} value={commentInfo.commentText} placeholder='Add Your Review' className='border-2 border-sky-950 w-[100%] h-[150px] px-5 py-5 font-semibold' name="commentText" cols="30" rows="10"></textarea>
                </div>

                <div className='flex gap-2 mt-5'>
                    {
                        [...Array(5)].map((star , index)=>{
                            return <div key={index}
                            onClick={()=>{
                                setSelectedStarts(index+1)
                            }}
                            >
                               {index < selectedStarts 
                               ? <AiFillStar className='text-3xl cursor-pointer text-sky-900'/>
                               : <AiOutlineStar className='text-3xl cursor-pointer text-sky-900'/>} 
                            </div> 
                        })

                    }
                </div>

                    

                <div className='w-[100%] md:my-0 my-5 flex justify-center md:justify-end'>
                    <button onClick={submitForm} className='md:w-[100px] w-[100%] h-[40px] rounded-md text-white bg-sky-600 font-semibold'>Add</button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default AddReview