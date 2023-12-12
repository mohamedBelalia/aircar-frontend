import React from 'react'

const AlertLogin = ({status = ""}) => {

    let message;

    if(status == "wrongData"){
        message = "Email or Password is Wrong"
    }
    else if(status == "unvalideLogin"){
        message = "Please Enter Validate Information"
    }
    else if(status == "emptyFields"){
      message = "Fill Out All The Fields"
    }

  return (
    <div className='mt-5 md:w-[80%] w-[100%] mx-auto mb-4 text-white h-[40px] flex justify-center items-center border-2 border-red-900 bg-red-400'>
        {message}
    </div>
  )
}

export default AlertLogin