import React from 'react'

const CarsCategories = () => {

    const arr = [1,2,3,4,5,6]

  return (
    <>
        <div className='select-none mx-auto w-full scroll-smooth flex md:justify-between overflow-x-auto px-16 scrollbar-none'>
            
            <div className='cursor-pointer rounded-md min-w-[100px] hover:bg-gray-300 flex flex-col justify-center items-center'>
                <img className='scale-x-[-1] w-[45px]' src="./dynamicImgs/imgIcons/icon1.png" alt="" />
                <h1>Lux Car</h1>
            </div>

            <div className='cursor-pointer rounded-md min-w-[100px] hover:bg-gray-300 flex flex-col justify-center items-center'>
                <img className='scale-x-[-1] w-[45px]' src="./dynamicImgs/imgIcons/icon2.png" alt="" />
                <h1>Petite Car</h1>
            </div>

            <div className='cursor-pointer rounded-md min-w-[100px] hover:bg-gray-300 flex flex-col justify-center items-center'>
                <img className='w-[45px]' src="./dynamicImgs/imgIcons/icon3.png" alt="" />
                <h1>SUV Car</h1>
            </div>

            <div className='cursor-pointer rounded-md min-w-[100px] hover:bg-gray-300 flex flex-col justify-center items-center'>
                <img className='w-[45px]' src="./dynamicImgs/imgIcons/icon4.png" alt="" />
                <h1>Moyenne Car</h1>
            </div>

            <div className='cursor-pointer rounded-md min-w-[100px] hover:bg-gray-300 flex flex-col justify-center items-center'>
                <img className='scale-x-[-1] w-[45px]' src="./dynamicImgs/imgIcons/icon5.png" alt="" />
                <h1>Big Car</h1>
            </div>

            <div className='cursor-pointer rounded-md w-[100px] hover:bg-gray-300 flex flex-col justify-center items-center'>
                <img className='scale-x-[-1] w-[45px]' src="./dynamicImgs/imgIcons/icon6.png" alt="" />
                <h1>Monospace</h1>
            </div>
        </div>
    </>
  )
}

export default CarsCategories