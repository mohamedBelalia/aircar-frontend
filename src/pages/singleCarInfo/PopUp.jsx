import React, { useContext, useState } from 'react'
import {FiCheckCircle} from "react-icons/fi"
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const PopUp = ({carId , startDatePick , endDateDrop , pickUpTime , dropOffTime , pricePerDay}) => {

    const {conf , userInfo} = useContext(UserContext);
    const pickupDate = startDatePick + " , " + pickUpTime ;
    const dropOffDate = endDateDrop + " , " + dropOffTime ;

    const [appointmentError , setAppointmentError] = useState()
    const [confirmBox , setConfirmBox] = useState(true)

    const appointment = async () => {

      const appointmentInfo = {
          startDate : startDatePick ,
          endDate : endDateDrop ,
          pickUpTime : pickUpTime ,
          dropOffTime : dropOffTime ,
          carId : carId ,
          priceDay : pricePerDay ,
          clientId : userInfo.id
      }    
      

      axios.post("http://localhost/aircar_backend/appointment.php" , appointmentInfo)
      .then((response)=>{
          if(response.data.status == "appointmentFaild"){
              setAppointmentError(true)
          }
          else{
              setAppointmentError(false)
          }
      })

  }


  const handleConfirm = () => {
      appointment()
      setConfirmBox(false)
  }
  return (
    <div className={`flex justify-center items-center w-[100%] h-[100%] fixed top-0 left-0 z-[99] bg-[#000000b7] overlay-content`}>
       
       {
        confirmBox ?
        <div className='flex flex-col md:gap-20 gap-10 md:justify-normal justify-center items-center md:w-[50%] w-[90%] h-[400px] bg-sky-600 md:h-[500px] rounded-md'>
            <div>
                <FiCheckCircle className='md:text-[150px] text-8xl md:mt-16 text-sky-100'/>
            </div>
           <div className='flex flex-col gap-4'>
                <button className='md:w-[300px] w-[200px] h-[50px] bg-white rounded-md text-black hover:bg-sky-300 ease-in transition-all duration-200' onClick={handleConfirm}>Confirm Your Appointment</button>
                <button onClick={()=>conf(false)} className='text-white md:w-[100px] w-[70px] h-[50px] mx-auto bg-red-600 rounded-md hover:bg-red-700 ease-in transition-all duration-200'>Cancel</button>
           </div>
        </div>
        : <>

{
        appointmentError ? 
        <div className='flex flex-col md:gap-20 gap-10 md:justify-normal justify-center items-center md:w-[50%] w-[90%] h-[400px] bg-red-100 md:h-[500px] rounded-md'>
            <div>
                <h1 className='md:text-5xl text-3xl md:mt-16 text-black'>Appointment Faild</h1>
            </div>
           <div className='flex flex-col gap-4'>
                <button className='md:w-[300px] w-[200px] h-[50px] bg-red-600 rounded-md text-white text-xl hover:bg-red-500 ease-in transition-all duration-200' onClick={()=>conf(false)}>Back</button>
           </div>
        </div> 
        : 
        <div className='flex flex-col md:gap-20 gap-10 md:justify-normal justify-center items-center md:w-[50%] w-[90%] h-[400px] bg-green-600 md:h-[500px] rounded-md'>
            <div>
                <h1 className='md:text-5xl text-3xl md:mt-16 text-sky-100'>Appointment Successful</h1>
            </div>
           <div className='flex flex-col gap-4'>
                <button onClick={()=>conf(false)} className='md:w-[300px] w-[200px] h-[50px] bg-white rounded-md text-black hover:bg-sky-300 ease-in transition-all duration-200'>
                    <a href={`http://localhost/aircar_backend/generatePdf.php?clientId=${userInfo.id}&carId=${carId}&pickupDate=${pickupDate}&dropOffDate=${dropOffDate}`}>Download Your Confirmation PDF</a>
                </button>
           </div>
        </div> 
       }
        
        </>
       }

    </div>
  )
}

export default PopUp