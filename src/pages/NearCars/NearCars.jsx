import React, { useEffect, useState } from 'react'

const NearCars = () => {

    const [ipAddress , setIpaddress] = useState('');
    const [geoInfo , setGeoInfo] = useState({}) ;

    useEffect(()=>{
        getUserIp() ;
    },[])

    const getUserIp = async ()=>{
        try {
            const response = await fetch('https://api.ipify.org/')
            const data = await response.text() ;
            setIpaddress(data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUserGeoInfo = async () => {
        try {
            const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=4a9cac6afaa7456bb5c60a35a5b81ca4&ip_address=${ipAddress}`)
            const data = await response.json() ;
            setGeoInfo(data)
        } catch (error) {
            
        }
    }

  return (
    <div>NearCars</div>
  )
}

export default NearCars