import React from 'react'

const AlertError = ({message}) => {
  return (
    <div className='md:w-[80%] w-[100%] mx-auto mb-4 text-white h-[40px] flex justify-center items-center border-2 border-red-900 bg-red-400'>
        {message}
    </div>
  )
}

export default AlertError