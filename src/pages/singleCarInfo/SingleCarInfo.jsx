import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {MdAirlineSeatReclineExtra} from "react-icons/md"
import {TbManualGearbox} from "react-icons/tb"
import {BsEvStationFill} from "react-icons/bs"
import RentingDateForm from './RentingDateForm'
import OwnerInfo from './OwnerInfo'
import Reviews from './Reviews'
import axios from 'axios'
import AddReview from './AddReview'
import { Navbar } from '../../layouts/Navbar'
import { UserContext } from '../../context/UserContext'
import Cookies from 'js-cookie'
import Loading from '../../layouts/Loading'


const BASEIMGSPATH = "http://localhost/aircar_backend/Images/" ;

const SingleCarInfo = () => {

    const navigate = useNavigate();

    const [loading , setLoading] = useState(true)

    
    
    useEffect(()=>{
        const checkAccess = async () => {
            try {

                if(Cookies.get("utokenacc") || Cookies.get("atokenacc")){
                    if(Cookies.get("atokenacc")){
                        const response = await axios.get("http://localhost/aircar_backend/getAgencyInfo.php?token="+Cookies.get("atokenacc"))
                        
                        if(response.data.status === "unvalidUser"){
                            navigate("/Login")
                        }
                        }

                    if(Cookies.get("utokenacc")){
                    const response = await axios.get("http://localhost/aircar_backend/getUserInfo.php?token="+Cookies.get("utokenacc"))
                    
                    if(response.data.status === "unvalidUser"){
                        navigate("/Login")
                    }
                    }
                }
                else{
                    navigate("/Login")
                }
                
            } catch (error) {
                console.log("Error during execution : " + error);
            }
            finally {
                setLoading(false)
            }

        }

        checkAccess();

    },[navigate])

    const {userInfo , agencyInfo} = useContext(UserContext);

    const { id } = useParams() ;
    const [carInfo , setCarInfo] = useState();
   
    const [changedState , setChangedState] = useState(0);
    
    const getInfo = () => {
        axios.get("http://localhost/aircar_backend/carInformation.php?id="+id)
        .then((response)=> {
            if(response.data.status == "noData"){
                console.log("no data");
            }
            else{
                setCarInfo(response.data)
                console.log(response.data);
            }
        })
    }

    useEffect(()=>{
       getInfo();
    },[changedState])


    const btnRender = (changedData) => {
        setChangedState(changedData)
    }

    if(loading){
        return <Loading/>;
    }
    
  return (
    <>
    <Navbar/>
    <div className='md:px-16 px-0 py-8 w-[90%] mx-auto'>
        {
            carInfo ? 
       
        <>
            <div className='flex md:flex-row flex-col justify-between gap-8 md:h-[500px] '>
            <div className='md:w-1/2 w-[100%] h-[100%]'>
                <img className='w-[100%] h-[100%] object-cover' src={BASEIMGSPATH + carInfo[0].img_path} alt="" />
            </div>
            <div className='md:w-1/2 w-[100%] h-[100%]'>
                <div className='flex justify-between items-center md:p-0 p-3'>
                    <h1 className='text-3xl font-bold w-1/2 '>{carInfo[0].model} <span className='text-gray-600 text-sm'>({carInfo[0].brand})</span></h1>
                    <h1 className='font-bold text-green-700 md:text-2xl text-xl'>{carInfo[0].price_per_day}DH/Day</h1>
                </div>
                <p className='mb-5 text-xs'>{carInfo[0].category}</p>
                <h2 className='font-bold'>DESCRIPTION</h2>
                <p className=' text-gray-700 mb-5'>
                    {carInfo[0].description}
                </p>
                <p className='font-bold text-sky-800 text-lg'>8.5/<span className='text-sm'>45 review</span></p>

                <h1 className='mt-8 font-bold'>FEATURES</h1>
                <div className='flex justify-between items-center mx-auto md:w-[80%] w-[100%] mb-8 mt-4'>
                    <div className='flex justify-between gap-5 items-center'>
                        <MdAirlineSeatReclineExtra className='text-2xl'/>
                        <p className='font-bold'>{carInfo[0].seats_nbr} Seats</p>
                    </div>

                    <div className='flex justify-between gap-5 items-center'>
                        <TbManualGearbox className='text-2xl'/>
                        <p className='font-bold'>{carInfo[0].transmission}</p>
                    </div>

                    <div className='flex justify-between gap-5 items-center'>
                        <BsEvStationFill className='text-2xl'/>
                        <p className='font-bold'>{carInfo[0].fuel_type}</p>
                    </div>

                </div>

                <div className='flex justify-between items-center w-[100px] my-7'>
                    <h1 className='font-bold'>Color : </h1>
                    <div className="w-[25px] h-[25px] rounded-full" style={{backgroundColor: carInfo[0].color}}></div>
                </div>

                <div>
              </div>
            </div>
        </div>




        {
            agencyInfo.id ? 
            <OwnerInfo name={carInfo[0].name}
                   email={carInfo[0].email} createdDate={carInfo[0].created_at} 
                   profilePath={carInfo[0].logoImg}/> 
            : 

            (carInfo[0].owner_id != userInfo.id ?
             
                <>
                <RentingDateForm carId={id} carPrice={carInfo[0].price_per_day}/>
                <OwnerInfo name={carInfo[0].name}
                   email={carInfo[0].email} createdDate={carInfo[0].created_at} 
                   profilePath={carInfo[0].logoImg} agenceId={carInfo[0].agency_ref}/> 
   
                   <AddReview changedData={changedState} onDataChanged={btnRender}  idCar={id} clientId={userInfo.id}/> 
                </>
                
                : null )

        }

        


        <Reviews changedData={changedState} idCar={id}/>
        </>
  :
    <div>
        <Loading/>
    </div>
    }


    </div>
    </>
  )
}

export default SingleCarInfo