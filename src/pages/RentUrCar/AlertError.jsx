import React from 'react'

const AlertError = ({errorType}) => {

    let message ;

    if(errorType == "fileUploadingError"){
        message = "Error In Uploading Your Image";
    }
    else if(errorType == "extensionNotAllawed"){
        message = "Upload an Image with Extension jpeg , jpg or png only"
    }
    else if(errorType == "emptyFields"){
        message = "fill out all the fields" ;
    }

  return (
    <div className='w-[100%] mx-auto mb-4 text-white h-[40px] flex justify-center items-center border-2 border-red-900 bg-red-400'>
        {message}
    </div>
  )
}

export default AlertError