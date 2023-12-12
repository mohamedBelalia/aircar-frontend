import React, { useState } from 'react'
import TimeJson from "../assets/JSONs/time.json"

const SelectTime = ({name}) => {

 


  return (
    <select name={name} className='rounded-md outline-none bg-sky-600 h-[100%] py-2 px-2 mb-8 cursor-pointer text-white w-[100%]'>
        {
            TimeJson.time.map((hour,key)=>(
                <option key={key} value={hour}>{hour}</option>
            ))
        }
    </select>
  )
}

export default SelectTime