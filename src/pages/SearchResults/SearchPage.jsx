import React, { useEffect, useRef, useState } from 'react'
import { Navbar } from '../../layouts/Navbar'
import { AiOutlineRight , AiOutlineDownCircle } from "react-icons/ai"
import brands from "../../assets/JSONs/Brands.json"
import CarsResults from './CarsResults'
import { Collapse } from 'react-collapse'
import CarsCategories from './CarsCategories'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Datepicker from 'react-tailwindcss-datepicker'

// SELECT * FROM carsinformation inner join appointments ON carsinformation.id = appointments.carId 
// WHERE startDate <> '2023-11-27' AND endDate <> '2023-11-30' LIMIT 0, 25;


const SearchPage = () => {

    const navigate = useNavigate();

    const [rangeValue , setRangeValue] = useState({
        startDate : null ,
        endDate : null
    })

    const [toggelFilters , setToggelFilters] = useState(true);
    
    const [carsFilter , setCarsFilter] = useState({
        pricePerDay : "" ,
        seatsNbr : "" ,
        transmission : "" ,
        fuelType : "" ,
        brands : "" ,
        startDate : "" ,
        endDate : "" ,
        typeCar : ""
    })

    const handleFilter = (event) => {
        setCarsFilter({...carsFilter , [event.target.name] : event.target.value})
    }

    const handleValueChange = (newValue) => {
        setCarsFilter({...carsFilter , startDate : newValue.startDate , endDate : newValue.endDate})
        setRangeValue(newValue)
    }

    // console.log(carsFilter);

    const toggel = (key) =>{
        if(toggelFilters === key){
            return setToggelFilters(null);
        }
        
        setToggelFilters(key);
    }



    useEffect(()=>{
        if(Cookies.get("utokenacc") || Cookies.get("atokenacc") ){
            if(Cookies.get("utokenacc")){
                axios.get("http://localhost/aircar_backend/getUserInfo.php?token="+Cookies.get("utokenacc"))
            .then((response)=>{
                if(response.data.status === "unvalidUser"){
                    navigate("/Login")
                }
            })
            }

            if(Cookies.get("atokenacc")){
                if(Cookies.get("atokenacc")){
                    axios.get("http://localhost/aircar_backend/getAgencyInfo.php?token="+Cookies.get("atokenacc"))
                    .then((response)=>{
                        if(response.data.status === "unvalidUser"){
                            navigate("/Login")
                        }
                    })
                }
            }
        }
        else{
            navigate("/Login")
        }

        
    },[])


    /* Logic for the cars types */

    const typeRef = useRef(null)

    const typeClicked = (typeNbr) => {
        let typesLength = typeRef.current.getElementsByTagName("div").length ;
        let allTypes = typeRef.current.getElementsByTagName("div") ;
        
        for(let i=0 ; i<typesLength ; i++){
            allTypes[i].style.backgroundColor  = ""
        }
        typeRef.current.getElementsByTagName("div")[typeNbr].style.backgroundColor  = "#87ceeb"
        let type ;
        switch (typeNbr) {
            case 0:
                type = "Luxe"
                break;
            case 1:
                type = "Petite"
                break;
            case 2:
                type = "SUV"
                break;
            case 3:
                type = "Moyenne"
                break;
            case 4:
                type = "Grande"
                break;
            case 5:
                type = "Monospace"
                break;
        
            default:
                break;
        }

        setCarsFilter({...carsFilter , typeCar : type})
    }
    /* Logic for the cars types */
    
  return (
    <>
      <Navbar/>

    <div className='md:px-40 px-5 my-8'>
        
        {/* Start Editing Date */}
        <div className='date-style rounded-md w-[100%] flex justify-between items-center'>
        <Datepicker
                    value={rangeValue}
                    onChange={handleValueChange}
                    minDate={new Date()}
                    placeholder='Click to Select Your Date Range'
                    inputClassName = "border-0 font-bold bg-sky-500 h-[70px]  text-center cursor-pointer px-4 rounded-md w-[100%] text-white"
                    readOnly={true}
                    configs={{
                        footer: {
                        cancel: "Cancel", 
                        apply: "Apply", 
                        }
                    }} 
                    useRange={false} 
                    separator={"to"}   
                    
                />  
            
        </div>
        {/* End Editing Date */}

        {/* Start Filter Body */}
        
        <div className='select-none flex md:flex-row flex-col gap-4 my-10'> {/* filter Container */}

            <div className='md:w-1/3 h-min px-3 border border-[#00000067] rounded-md'> {/* filter */}

                <div className={`transition-all duration-500 ease-in flex justify-between items-center ${toggelFilters ? 'border-b border-black' : null} py-3`}>
                    <h1 className='font-bold text-xl'>Filter</h1>
                    <AiOutlineDownCircle onClick={()=>toggel(!toggelFilters)} 
                    className={`cursor-pointer text-[35px] transition-all duration-300 ease-in text-sky-900 ${toggelFilters ? 'rotate-180' : null}`}/>
                </div>
          
            <Collapse isOpened={toggelFilters}>
            <form className='scroll-smooth'>
                
                {/* Price Per Day */}
                <div className='flex flex-col gap-4 items-start py-3'>
                    <h1 className='font-bold text-[14px]'>Price Per Day</h1>
                    <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value="100-300" className='cursor-pointer w-[20px] h-[20px]' type="radio" name='pricePerDay' id='price_1'/>
                            <label className='cursor-pointer select-none' htmlFor="price_1">100 Dh - 300 Dh</label>
                        </div>
                    </div>

                    <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value="300-600" className='cursor-pointer w-[20px] h-[20px]' type="radio" name='pricePerDay' id='price_2'/>
                            <label className='cursor-pointer select-none' htmlFor="price_2">300 Dh - 600 Dh</label>
                        </div>
                    </div>

                    <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value="600-1000" className='cursor-pointer w-[20px] h-[20px]' type="radio" name='pricePerDay' id='price_3'/>
                            <label className='cursor-pointer select-none' htmlFor="price_3">600 Dh - 1000 Dh</label>
                        </div>
                    </div>

                    <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value="1000" className='cursor-pointer w-[20px] h-[20px]' type="radio" name='pricePerDay' id='price_4'/>
                            <label className='cursor-pointer select-none' htmlFor="price_4">+1000 Dh</label>
                        </div>
                    </div>
                </div>

                {/* Seats Number */}
                <div className='flex flex-col gap-4 items-start py-3'>
                    <h1 className='font-bold text-[14px]'>Seats Number</h1>
                    <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value="2-4" className='cursor-pointer w-[20px] h-[20px]' type="radio" name='seatsNbr' id='nbr_1'/>
                            <label className='cursor-pointer select-none' htmlFor="nbr_1">2 - 4 Seats</label>
                        </div>
                    </div>

                    <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value="5-6" className='cursor-pointer w-[20px] h-[20px]' type="radio" name='seatsNbr' id='nbr_2'/>
                            <label className='cursor-pointer select-none' htmlFor="nbr_2">5 - 6 Seats</label>
                        </div>
                    </div>

                    <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value="7" className='cursor-pointer w-[20px] h-[20px]' type="radio" name='seatsNbr' id='nbr_3'/>
                            <label className='cursor-pointer select-none' htmlFor="nbr_3">+7 Seats</label>
                        </div>
                    </div>
                </div>

                {/* Transmission */}
                <div className='flex flex-col gap-4 items-start py-3'>
                    <h1 className='font-bold text-[14px]'>Transmission</h1>
                    <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value="automatic" className='cursor-pointer w-[20px] h-[20px]' type="radio" name='transmission' id='automatic'/>
                            <label className='cursor-pointer select-none' htmlFor="automatic">Automatic</label>
                        </div>
                    </div>

                    <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value="manual" className='cursor-pointer w-[20px] h-[20px]' type="radio" name='transmission' id='manual'/>
                            <label className='cursor-pointer select-none' htmlFor="manual">Manual</label>
                        </div>
                    </div>
                </div>

                {/* Fuel Type */}
                <div className='flex flex-col gap-4 items-start py-3'>
                    <h1 className='font-bold text-[14px]'>Fuel Type</h1>
                    <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value="electric" className='cursor-pointer w-[20px] h-[20px]' type="radio" name='fuelType' id='electric'/>
                            <label className='cursor-pointer select-none' htmlFor="electric">Electric</label>
                        </div>
                    </div>

                    <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value="petrol" className='cursor-pointer w-[20px] h-[20px]' type="radio" name='fuelType' id='petrol'/>
                            <label className='cursor-pointer select-none' htmlFor="petrol">Petrol</label>
                        </div>
                    </div>
                </div>

                {/* Brands */}
                <div className='flex flex-col gap-4 items-start py-3'>
                    <h1 className='font-bold text-[14px]'>Brands</h1>
                    
                    {
                        brands.carBrands.map((brand , key)=>key<10&&(
                            <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value={brand} className='cursor-pointer w-[20px] h-[20px]' type="radio" name='brands' id={brand}/>
                            <label className='cursor-pointer select-none' htmlFor={brand}>{brand}</label>
                        </div>
                    </div>
                        ))
                    }
                    <div className='w-[100%]'> 
                        <div className='flex gap-4 items-center w-[100%]'>
                            <input onChange={handleFilter} value="other" className='cursor-pointer w-[20px] h-[20px]' type="radio" name='brand' id='other'/>
                            <label className='cursor-pointer select-none' htmlFor="other">Other</label>
                        </div>
                    </div>

                </div>
                

                

            </form>
            </Collapse> 
            
            </div>

            <div className='h-min w-full'> {/* Cars Type */}

         
            <div ref={typeRef} className='select-none mx-auto w-full scroll-smooth flex md:justify-between overflow-x-auto px-16 scrollbar-none'>
                
                <div onClick={()=>typeClicked(0)} className='cursor-pointer rounded-md min-w-[100px] hover:bg-gray-300 flex flex-col justify-center items-center'>
                    <img className='scale-x-[-1] w-[45px]' src="./dynamicImgs/imgIcons/icon1.png" alt="" />
                    <h1>Lux Car</h1>
                </div>

                <div onClick={()=>typeClicked(1)} className='cursor-pointer rounded-md min-w-[100px] hover:bg-gray-300 flex flex-col justify-center items-center'>
                    <img className='scale-x-[-1] w-[45px]' src="./dynamicImgs/imgIcons/icon2.png" alt="" />
                    <h1>Petite Car</h1>
                </div>

                <div onClick={()=>typeClicked(2)} className='cursor-pointer rounded-md min-w-[100px] hover:bg-gray-300 flex flex-col justify-center items-center'>
                    <img className='w-[45px]' src="./dynamicImgs/imgIcons/icon3.png" alt="" />
                    <h1>SUV Car</h1>
                </div>

                <div onClick={()=>typeClicked(3)} className='cursor-pointer rounded-md min-w-[100px] hover:bg-gray-300 flex flex-col justify-center items-center'>
                    <img className='w-[45px]' src="./dynamicImgs/imgIcons/icon4.png" alt="" />
                    <h1>Moyenne Car</h1>
                </div>

                <div onClick={()=>typeClicked(4)} className='cursor-pointer rounded-md min-w-[100px] hover:bg-gray-300 flex flex-col justify-center items-center'>
                    <img className='scale-x-[-1] w-[45px]' src="./dynamicImgs/imgIcons/icon5.png" alt="" />
                    <h1>Big Car</h1>
                </div>

                <div onClick={()=>typeClicked(5)} className='cursor-pointer rounded-md w-[100px] hover:bg-gray-300 flex flex-col justify-center items-center'>
                    <img className='scale-x-[-1] w-[45px]' src="./dynamicImgs/imgIcons/icon6.png" alt="" />
                    <h1>Monospace</h1>
                </div>
            </div>
      

                <CarsResults carsFiltersInfo={carsFilter}/>
            </div>

        </div>
        

        {/* End Filter Body */}

    </div>

    </>
  )
}

export default SearchPage