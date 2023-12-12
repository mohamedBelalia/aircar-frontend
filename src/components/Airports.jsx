import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Airports = ({airportName}) => {

    const [airport , setAirport] = useState([])

    const name = airportName ?? "Rabat";
    const apiKey = '+dcHnXyTLIF2n/BosGqSdw==VvuOnNHRefYPu4TT';

    useEffect(() => {
        axios
      .get(`https://api.api-ninjas.com/v1/airports?name=${name}`, {
        headers: {
          'X-Api-Key': apiKey,
        },
      })
      .then((response) => {
        setAirport(response.data)
      })
      .catch((error) => {
        console.error('Request failed:', error);
      });
    }, [name]);


    const airPortClicked = (name) => {
      console.log(name);
      setAirport("");
    }


  return (
    <div>
        {
            airport ? 
            <div className='w-[100%] absolute top-[100px] left-0 px-5 bg-transparent py-6'>
            {
                airport.map((air,key)=>key<10&&(
                    air.city =="" ? null :
                    <div key={key} onClick={()=>airPortClicked(air.name)} className='flex justify-between items-center mb-5 p-4 bg-slate-300 rounded-md cursor-pointer'>
                        <div>
                            <p className='text-sm p-1 bg-sky-900 text-white rounded-lg mb-3'>{air.city}</p>
                            <p className='text-xs p-1 bg-sky-100 text-black rounded-lg'>{air.region}</p>
                        </div>
                        <div className=''>{air.name}</div>
                    </div>
                ))
            }
        </div>
        : null
        }
    </div>
  )
}

export default Airports