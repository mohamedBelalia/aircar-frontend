import React, { useContext, useEffect, useState } from 'react'
import CarCard from './CarCard'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const AgencyCars = ({agencyRef}) => {

  const {userInfo} = useContext(UserContext);

  const [selectedStarts , setSelectedStarts] = useState(0)
  const [carsList , setCarsList] = useState([])
  const [zeroCar , setZeroCar] = useState(false) 
  const [isZeroStar , setIsZeroStars] = useState(false)
  const [isRateAdded , setIsRateAdded] = useState(false)  
  
  
  useEffect(()=>{
    const fetchAgencyData = () => {
      axios.get(`http://localhost/aircar_backend/getAgencyCars.php?agencyId=${agencyRef}`)
      .then((response)=>{
          if(response.data.status === "zeroCars"){
            setZeroCar(true)
          } 
          else{
            setCarsList(response.data)
            setZeroCar(false)
          }
      })
    }
    fetchAgencyData()
},[agencyRef])


 

  const submitRate = (e) => {
      e.preventDefault();

      if(selectedStarts > 0){
        const sendedRate = {
          userId : userInfo.id ,
          agencyId : agencyRef ,
          starsCount : selectedStarts
        }
        setIsZeroStars(false)
        setSelectedStarts(0)

        axios.post("http://localhost/aircar_backend/agencyRate.php" , sendedRate)
        .then((response)=>{
          if(response.data.status === "ok"){
            setIsRateAdded(false)
          }
          else{
            setIsRateAdded(true)
          }
        })

      }
      else{
        setIsZeroStars(true)
      }

      window.location.reload(true)
      
  } 

  if(isRateAdded){
    alert("Please Reselect Your Rate !!")
  }

  return (
   
    <div className='flex flex-col-reverse md:flex-row md:w-[80%] w-[90%]'>
      <div className='mr-8 md:w-1/2 w-[100%] bg-white h-[250px] rounded-md border border-1 border-sky-900 md:px-0 px-10 md:mt-0 mt-10 flex flex-col'>
        
          <div className='mt-6'>
            <h1 className='text-sky-950 font-semibold text-center'>Rate The Agency</h1>
            <form className='flex flex-col gap-7 mt-4'>
            <div className='flex gap-2 justify-center mt-2'>
              {
                [...Array(5)].map((star , index)=>{
                  return <div key={index}
                    onClick={()=>{
                          setSelectedStarts(index+1)
                    }}
                          >
                          {index < selectedStarts 
                              ? <FaStar className='text-3xl cursor-pointer text-sky-900'/>
                              : <FaRegStar className='text-3xl cursor-pointer text-sky-900'/>} 
                          </div> 
                          })

              }
            </div>
            <button onClick={submitRate} className='md:w-[100px] w-[100%] h-[30px] rounded-md text-white bg-sky-600 font-semibold mx-auto'>Rate</button>
              {
                isZeroStar &&
                  <small className='text-red-700 text-center font-bold'>Select at least one star</small>
              }
            </form>
          </div>
        
      </div>

      <div className='mx-auto flex flex-wrap gap-5 justify-end'>
        {
          zeroCar ? <div>There is no cars</div> :

          carsList.map((car,key)=>(
            <CarCard key={key} carInfo={car}/>
          ))

        }
      </div>
    </div>

  )
}

export default AgencyCars