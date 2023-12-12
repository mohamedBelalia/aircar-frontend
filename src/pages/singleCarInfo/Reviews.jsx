import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CommentUi from './CommentUi';



const Reviews = ({idCar , changedData}) => {


  const [noComments , setNoComments] = useState(false)
  const [comments , setComments] = useState() ;

  const gettingComments = () => {
    axios.get("http://localhost/aircar_backend/commentInfo.php?carId="+idCar)
    .then((response)=>{
      if(response.data.status == "noComments"){
        setNoComments(true)
      }
      else{
        setComments(response.data)
      }
    })
  }

  useEffect(()=>{
    gettingComments()
  },[changedData])


  return (
    <div className='mt-16 mb-5 md:px-40'> 
      <h1 className='font-bold text-xl mb-6'>REVIEWS</h1>

        {
          Array.isArray(comments) ? 
          <>
            {comments.map((comment , index) => (
              
              <div key={index} >
              <CommentUi name={comment.first_name} date={comment.datePosted} 
                profilePath={comment.profilePath} starsCount={comment.starsCount} commentText={comment.comment}/>
              <hr className='my-10 font-bold'/>
              </div>
            
            ))}
          </>
          :
          null
        }

        {
          noComments ? 

          <div>
            <p className='text-center text-2xl font-bold text-gray-500'>There is no Reviews Yet On this Car</p>
          </div>

          : null

        }

      

    </div>
  )
}

export default Reviews