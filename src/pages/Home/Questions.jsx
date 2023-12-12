import React, { useState } from 'react'
import questions from "../../assets/JSONs/OurNumbers.json"
import {AiOutlineMinus , AiOutlinePlus} from "react-icons/ai"
import { Collapse } from 'react-collapse'

const Questions = () => {

    const [open , setOpen] = useState(false);

    const toggel = (key) =>{
        if(open === key){
            return setOpen(null);
        }
        
        setOpen(key);
    }

  return (
    <div className='md:px-28 px-4'>
        <h1 className='text-4xl font-bold md:w-[350px] w-[100%] md:text-start text-center'>Most Clients 
        <span className='text-sky-500'> Questions</span></h1>
        
        <div className='mt-10 mb-40 flex gap-10'>

            <div className='md:block hidden w-[600px] '>
                <img className='w-[100%] border-4 rounded-md border-sky-900' src="./dynamicImgs/petite_voiture.jpg" alt="" />
            </div>

            <div className='w-[800px]'>
            {
                questions.questions.map((text,key)=>(
                    <Answers 
                        key={key} 
                        open={key === open} 
                        title={text.question} 
                        desc={text.answer} 
                        toggel={()=>toggel(key)}/>
                ))
            }
            </div>
        </div>
    </div>
    
  )
}



const Answers = ({open , toggel , title , desc}) => {
    return (
    <div className='pb-[10px]'>
        <div className='bg-sky-400 rounded-t-md py-[25px] md:px-[50px] px-[20px] flex justify-between items-center cursor-pointer'
           onClick={toggel} >
            <p className='text-xl font-semibold'>{title}</p>
            <div className='text-3xl'>
                {open ? <AiOutlineMinus/> : <AiOutlinePlus/>  }
            </div>
        </div>

        <Collapse isOpened={open}>
            <div className='bg-sky-400 px-10 pb-5 rounded-b-md'>
                {desc}
            </div>
        </Collapse>

    </div>
    )
}


export default Questions