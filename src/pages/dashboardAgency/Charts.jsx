import React from 'react'
import { Chart } from 'chart.js/auto'
import { Bar , Doughnut , Line } from 'react-chartjs-2'

const Charts = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between gap-6'>
      <div className='md:h-[300px] my-6 bg-white p-5 md:w-1/2'>
           <Bar 
            data={{
              labels : ["A" , "B" , "C"],
              datasets : [
                {
                  label: "Cars Count",
                  data : [245 , 140 , 200 , 50],
                  borderRadius : 5                
                },
                {
                  label: "Clients Count",
                  data : [45 , 40 , 30 , 10],
                  borderRadius : 5
                },
                

              ]
            }}

           />
    </div>

      
    <div className='md:h-[300px] my-6 bg-white p-5 md:w-1/2'>
           <Doughnut className='mx-auto' 
            data={{
              labels : ["A" , "B" , "C" , "D"],
              datasets : [
                {
                  label: "Incomes",
                  data : [15 , 10 , 25 , 50],
                  borderRadius : 5                
                }
              ]
            }}

           />
    </div>
          

    </div>
  )
}

export default Charts