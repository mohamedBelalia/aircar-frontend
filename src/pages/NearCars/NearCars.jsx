import React, { useEffect, useState } from 'react'
import { Navbar } from '../../layouts/Navbar';
import SearchPage from '../SearchResults/SearchPage';
import Loading from '../../layouts/Loading';

const NearCars = () => {

    const [geoInfo , setGeoInfo] = useState({}) ;
    const [ipAddress , setIpAddress] = useState("")
    const [isStillSearch , setIsStillSearch] = useState(true)

    useEffect(()=>{
        getUserIp() ;
    },[ipAddress])

    const getUserIp = async ()=>{
        try {
            const response = await fetch('https://api.ipify.org/')
            const data = await response.text() ;
            setIpAddress(data)
            fetchUserGeoInfo(data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUserGeoInfo = async (ip) => {
        try {
            const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=4a9cac6afaa7456bb5c60a35a5b81ca4&ip_address=${ip}`)
            const data = await response.json() ;
            if(data.ip_address){
                setGeoInfo(data)
            }
        } catch (error) {
            console.log(error);
        }finally{
            setIsStillSearch(false)
        }
    }


  return (
    <>  
    {
        isStillSearch ? 
        <>
            <Navbar/>
            <Loading/>
        </>
        :
        <SearchPage location={geoInfo.city}/>
    }
    </>
  )
}

export default NearCars