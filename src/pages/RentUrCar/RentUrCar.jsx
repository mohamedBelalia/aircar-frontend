import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai"
import carCategory from "../../assets/JSONs/OurNumbers.json"
import colorsNamesHex from "../../assets/JSONs/Colors.json"
import brands from "../../assets/JSONs/Brands.json"
import axios from 'axios'
import { useNavigate } from 'react-router'
import AlertError from './AlertError'
import { Navbar } from '../../layouts/Navbar'
import { UserContext } from '../../context/UserContext'
import Cookies from 'js-cookie'
import Loading from '../../layouts/Loading'



const RentUrCar = () => {
    const {agencyInfo , userInfo , loginAgency} = useContext(UserContext);
    const navigate = useNavigate();

    const [loading , setLoading] = useState(true)

    const selectedFile = useRef();

    const [imgUploaded , setImgUploaded] = useState(null)

    const [carInfo , setCarInfo] = useState({
        address : agencyInfo.address,
        city : agencyInfo.cityAgency,
        seats_number : "",
        brand : "",
        category : "",
        model : "",
        fuel_type : "",
        color : "",
        transmission : "",
        price_per_day : "",
        description : "" ,
        owner_id : agencyInfo.id
    })

    const [error , setError] = useState(null);
    
    useEffect(()=>{
        const checkAccess = async () => {
            loginAgency(Cookies.get("atokenacc"));
            try {

                if(Cookies.get("atokenacc")){
                    const response = await axios.get("http://localhost/aircar_backend/getAgencyInfo.php?token="+Cookies.get("atokenacc"))
                    console.log(response.data[0]);
                    setCarInfo({...carInfo , 
                        address : response.data[0].address ,
                        city : response.data[0].cityAgency ,
                        owner_id : response.data[0].id })

                    if(response.data.status === "unvalidUser"){
                        navigate("/Login")
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

    console.log(carInfo);


    const handleChange = (e) => {
        setCarInfo({ ...carInfo , [e.target.name] : e.target.value})
    }  

    const uploader = async() => {
        if(selectedFile.current.files.length == 0){
            console.log("choose a file");
        }
        else{
            const formData = new FormData();

            formData.append('carImg' , selectedFile.current.files[0])

            for (const key in carInfo) {
                if (carInfo.hasOwnProperty(key)) {
                  formData.append(key, carInfo[key]);
                }
              }

            axios.post("http://localhost/aircar_backend/uploadCarInfo.php" , formData)
            .then((result)=>{
                if(result.data.status == "fileUploadingError"){
                    setError("fileUploadingError");
                }
                else if(result.data.status == "extensionNotAllawed"){
                    setError("extensionNotAllawed")
                }
                else if(result.data.status == "emptyFields"){
                    setError("emptyFields")
                    console.log("emptyFields");
                }
                else if(result.data.status == "ok"){
                    console.log("Your Post Posted !");
                    navigate("/");
                }
                else{
                    console.log("else statment");
                }
            })
        }
    }


    if(loading){
        return <Loading/>;
    }



  return (
    <>
    <Navbar/>
    <div className='md:px-16 mt-7'>
        <h1 className='text-3xl md:text-start text-center font-extrabold text-sky-800 mb-4'>Fill Out Your Car Information</h1>

        <div className='flex mt-9'>

        <div className='px-8 w-[100%] py-10'>
            
            {
                error ? <AlertError errorType={error}/> : null
            }
            <form onSubmit={(e)=>e.preventDefault()}>
                <input type="text" className='hidden' name='owner_id' value={carInfo.owner_id} />
                <div className='flex md:flex-row flex-col gap-4 mb-6'>
                    
                    <div className='md:w-1/2 h-[40px] border-2 border-sky-950'>
                        <input onChange={handleChange} value={carInfo.seats_number} className='w-[100%] px-3 bg-sky-100 h-[100%] pl-5 outline-none' type="number" min={1} max={10} name="seats_number" placeholder='Seats Number'/>
                    </div>

                    <div className='md:w-1/2 h-[40px] border-2 border-sky-950'>
                        <select onChange={handleChange} value={carInfo.transmission} name="transmission" className='w-[100%] px-3 bg-sky-100 h-[100%] pl-5 outline-none'>
                            <option selected disabled>Transmission</option>
                            <option value="automatic" selected>Automatic</option>
                            <option value="manual">Manual</option>
                        </select>
                    </div>

                </div>

                <div className='flex md:flex-row flex-col gap-4 mb-6'>
                    <div className='md:w-1/2 h-[40px] border-2 border-sky-950'>
                        <select onChange={handleChange} value={carInfo.brand} name="brand" className='w-[100%] px-3 bg-sky-100 h-[100%] pl-5 outline-none'>
                            <option selected disabled>Brand</option>
                            {
                                brands.carBrands.map((value,key)=>(
                                    <option key={key} value={value}>{value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='md:w-1/2 h-[40px] border-2 border-sky-950'>
                        <select onChange={handleChange} value={carInfo.category} name="category" id="" className='w-[100%] px-3 bg-sky-100 h-[100%] pl-5 outline-none'>
                            <option selected disabled>Car Category</option>
                            {
                                carCategory.carsTypes.map((value,key)=>(
                                    <option key={key} value={value.type}>{value.type}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className='flex md:flex-row flex-col gap-4 mb-6'>
                    <div className='md:w-1/2 h-[40px] border-2 border-sky-950'>
                        <input onChange={handleChange} value={carInfo.model} className='w-[100%] px-3 bg-sky-100 h-[100%] pl-5 outline-none' type="text" name="model" placeholder='Model'/>
                    </div>
                    <div className='md:w-1/2 h-[40px] border-2 border-sky-950'>
                        <select onChange={handleChange} value={carInfo.fuel_type} name="fuel_type" className='w-[100%] px-3 bg-sky-100 h-[100%] pl-5 outline-none'>
                            <option selected disabled>Fuel Type</option>
                            <option value="petrol">Petrol</option>
                            <option value="electric">Electric</option>
                        </select>
                    </div>
                </div>

                <div className='flex md:flex-row flex-col gap-4 mb-6'>
                    <div className='md:w-1/2 h-[40px] border-2 border-sky-950'>
                        <select onChange={handleChange} value={carInfo.color} name="color" className='w-[100%] px-3 bg-sky-100 h-[100%] pl-5 outline-none'>
                            <option selected disabled>Color</option>
                            {
                                colorsNamesHex.colors.map((value,key)=>(
                                    <option key={key} value={value.hexCode}>{value.name}</option>
                                ))
                            }
                            
                        </select>
                    </div>
                    <div className='md:w-1/2 h-[40px] border-2 border-sky-950'>
                        <input onChange={handleChange} value={carInfo.price_per_day} className='w-[100%] px-3 bg-sky-100 h-[100%] pl-5 outline-none' type="number" min={1} max={9999} name="price_per_day" placeholder='Price Per Day'/>
                    </div>
                </div>

                
                <div className='flex md:flex-row flex-col gap-4 mb-6'>
                    <div className='md:w-1/2 border-2 border-sky-950'>
                        <label htmlFor="carImg">
                            <div className='md:h-[300px] h-[200px] flex justify-center items-center cursor-pointer'>
                                {
                                    imgUploaded ? <img className='w-[100%] h-[100%] ' src={imgUploaded} alt="" />
                                    :
                                <AiOutlineCloudUpload className='md:text-[200px] text-[150px] text-sky-400'/>
                                }
                            </div>
                          
                        </label>
                        <input onChange={(e)=>{
                            if(e.target.files && e.target.files.length > 0){
                                const name = URL.createObjectURL(e.target.files[0]) ;
                                setImgUploaded(name)
                            }
                        }} ref={selectedFile} type="file" accept="image/*" id='carImg' name="car_img" className='hidden' />
                    </div>
                    <div className='md:w-1/2  border-2 border-sky-950'>
                        <textarea onChange={handleChange} value={carInfo.description} name="description" cols="30" rows="10" placeholder='Write a Description' className='pt-4 w-[100%] h-full px-3 bg-sky-100  pl-5 outline-none'></textarea>
                    </div>
                </div>

                <div className='w-[100%] h-[45px] border-2 border-sky-950'>
                    <button onClick={uploader} className='w-[100%] h-[100%] bg-sky-800 text-white cursor-pointer'>Submit</button>
                </div>
            </form>
        </div>


        <div className='relative h-[700px] w-1/3 md:block hidden'>
                <img className='absolute top-0 left-0 w-[100%] h-[100%] object-cover' src="./dynamicImgs/bmwSignup.jpg" alt="BMW MY DREAM CAR" />
                <div className='absolute w-[100%] h-[100%] bg-[#0782c969]'></div>
        </div>

        </div>
    </div>
    </>
  )
}

export default RentUrCar