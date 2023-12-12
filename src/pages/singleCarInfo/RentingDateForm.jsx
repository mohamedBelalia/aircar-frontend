import React, { useContext, useEffect, useState } from 'react'
import { HiClock } from "react-icons/hi";
import Datepicker from 'react-tailwindcss-datepicker';
import PopUp from './PopUp';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import TimeJson from "../../assets/JSONs/time.json"

const RentingDateForm = ({carId , carPrice}) => {

    const {conf , confToggel} = useContext(UserContext);

    const [rangeValue, setRangeValue] = useState({
        startDate: null,
        endDate: null
    });

    const [hoursAndMins , setHoursAndMins] = useState({
        pickUpTime : null ,
        dropOffTime : null
    })

    const [emptyDates , setEmptyDates] = useState(false)

    const [datesCalendar , setDatesCalendar] = useState(null);
    

    const getDatesCalendar = () => {
        axios.get("http://localhost/aircar_backend/appointmentDates.php?carId="+carId)
        .then((response)=>{
            if(response.data.status !== "noDates"){
                setDatesCalendar(response.data)
            }
        })
    }

    useEffect(()=>{
        getDatesCalendar()
    },[])

    const handleValueChange = (newValue) => {
        setRangeValue(newValue);
    }

    const handleHourChange = (e) => {
        setHoursAndMins({...hoursAndMins , [e.target.name] : e.target.value})
    }


    const dateSubmit = (e) => {
        e.preventDefault()

        if(rangeValue.startDate != null && rangeValue.endDate != null && hoursAndMins.pickUpTime != null && hoursAndMins.dropOffTime != null){ 
            conf(true) 
        }
        else{
            setEmptyDates(true)
        }
    }

        
 

  return (
    <div>

    {
        confToggel ? 
        <>
            <PopUp carId={carId} startDatePick={rangeValue.startDate}  
            endDateDrop={rangeValue.endDate}  pickUpTime={hoursAndMins.pickUpTime}  
            dropOffTime={hoursAndMins.dropOffTime} pricePerDay={carPrice}/>
        </>
        : null
    }

    {
        emptyDates ? 
            <div className='my-5 w-[100%] h-[50px] rounded-md bg-red-500 text-white flex justify-center items-center font-bold'>
                <p>Select The Dates</p>
                {
                  setTimeout(()=>{setEmptyDates(false)} , 5000)
                }
            </div>
        :  null

    }

    
        
        <form className='justify-between'>
            <div className='border border-black shadow-md w-[100%] md:h-[100px] bg-white drop-shadow-md mx-auto mt-10 md:px-2 gap-10 md:gap-0 md:py-2 py-10 flex md:flex-row flex-col items-center justify-between'>

                    <div className='py-2 md:w-1/3 w-[80%] md:h-[70%] flex flex-col justify-between border-b-2'>
                        <Datepicker
                            value={rangeValue}
                            onChange={handleValueChange}
                            primaryColor='sky'
                            minDate={new Date()}
                            containerClassName="contDatepicker relative"
                            inputClassName = "bg-sky-600 h-[50px] cursor-pointer px-4 rounded-md w-[100%] text-white"
                            toggleClassName="absolute bg-sky-600 rounded-r-lg text-white right-0 h-full px-3 text-white focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                            showFooter={true} 
                            readOnly={true}
                            configs={{
                                footer: {
                                cancel: "Cancel", 
                                apply: "Apply", 
                                }
                                }} 
                            useRange={false} 
                            placeholder='Write or Click to Select your date'
                            separator={"to"}   
                            disabledDates={datesCalendar} 
                        />
                    </div>

                    <div className='flex flex-col mb-3 md:w-1/4 w-[80%] md:h-[70%] border-b-2 '>
                        <label htmlFor="" className='flex items-center gap-3'>Pick up Time <HiClock/></label>
                        <select onChange={handleHourChange} value={hoursAndMins.pickUpTime} name="pickUpTime" className='rounded-md outline-none bg-sky-600 h-[100%] py-2 px-2 mb-8 cursor-pointer text-white w-[100%]'>
                            {
                                TimeJson.time.map((hour,key)=>(
                                    <option key={key} value={hour}>{hour}</option>
                                ))
                            }
                        </select>
                    </div>
                    
                    <div className='flex flex-col mb-3 md:w-1/4 w-[80%] md:h-[70%] '>
                        <label htmlFor="" className='flex items-center gap-3'>Drop Off Time <HiClock/></label>
                        <select onChange={handleHourChange} value={hoursAndMins.dropOffTime} name="dropOffTime" className='rounded-md outline-none bg-sky-600 h-[100%] py-2 px-2 mb-8 cursor-pointer text-white w-[100%]'>
                            {
                                TimeJson.time.map((hour,key)=>(
                                    <option key={key} value={hour}>{hour}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>
                    <div className='flex justify-end items-start '>
                        <div className='md:w-[100px]  w-[80%] md:h-[70%]'>
                            <input type="submit" value="Next" className='px-5 py-2 mt-6 bg-sky-600 md:w-auto w-[100%] rounded-md text-white cursor-pointer' onClick={dateSubmit}/>
                        </div>
                    </div>

                </form>
    </div>
  )
}


export default RentingDateForm