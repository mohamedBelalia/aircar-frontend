import axios from 'axios';
import React, { useRef, useState } from 'react'

const Test = () => {

    const [error , setError] = useState(null);
    const [name , setName] = useState();
    const selectedFile = useRef();

    const [userData , setUserData] = useState({
        firstName : "" ,
        lastName : "" ,
        email : "" ,
        pwd : ""
    });

    const handleChange = (e) => {
        setUserData({ ...userData , [e.target.name] : e.target.value})
        
    }  

    const uploader = async ()=>{
        if(name == ""){
            console.log("can't be empty");
        }
        if(selectedFile.current.files.length == 0){
            console.log("choose a file");
        }
        else{
            const formData = new FormData()
            formData.append('picture' , selectedFile.current.files[0])
            formData.append('name' , name)

            for (const key in userData) {
                if (userData.hasOwnProperty(key)) {
                  formData.append(key, userData[key]);
                }
              }

            axios.post("http://localhost/aircar_backend/test.php",formData)
            .then((result)=>{
                if(result.data.status == "unvalideData"){
                    console.log("bad request");
                }
                else{
                    console.log(result.data);
                }
            })

        }
        // console.log(name);
        // console.log(selectedFile.current.files);
    }

  return (
    <div className='mb-10'>
  
          <form onSubmit={(e)=>e.preventDefault()}>
          <input type="text" onChange={(e)=>setName(e.target.value)} className='border border-black'/><br/>
           
          <input onChange={handleChange} value={userData.firstName} className='my_border' type="text" placeholder='First Name' name='firstName'/>
          <input onChange={handleChange} value={userData.lastName} className='my_border' type="text" placeholder='Last Name' name='lastName'/>
          <input onChange={handleChange} value={userData.email} className='my_border' type="text" placeholder='Email' name='email'/>
          <input onChange={handleChange} value={userData.pwd} className='my_border' type="text" placeholder='Pwd' name='pwd'/>
           
            <input type="file" ref={selectedFile} />
            
            <button onClick={uploader} className='w-[200px] h-[30px] bg-sky-900 cursor-pointer'>Send</button>
        
          </form>
    </div>
  )
}

export default Test