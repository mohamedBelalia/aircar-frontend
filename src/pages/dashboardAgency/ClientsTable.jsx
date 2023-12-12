import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ClientsTable = ({agencyId}) => {

    const [tableData , setTableData] = useState([]);

  useEffect(()=>{
        
    axios.get("http://localhost/aircar_backend/dashboardAgencyTable.php?idAgency="+agencyId)
    .then((response)=>{
    if(response.data.status !== "noId"){
        setTableData(response.data);
    }
  })            

    },[agencyId])


  return (
    <div className="flex flex-col md:p-3 bg-white">

      {
        tableData.length > 0 ? 
      

    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 font-bold py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Car Model</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Pick Up Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Drop Off Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Price</th>
              </tr>
            </thead>
            <tbody className="bg-white">

            {
              tableData.map((client , key)=>(
                <tr key={key} className='bg-gray-100'>
                      <td className='py-2 px-4 text-center border border-gray-500'>{client.first_name}</td> 
                      <td className='py-2 px-4 text-center border border-gray-500'>{client.email}</td>
                      <td className='py-2 px-4 text-center border border-gray-500'>{client.model}</td>
                      <td className='py-2 px-4 text-center border border-gray-500'>{client.startDate} {client.pickUpTime}</td>
                      <td className='py-2 px-4 text-center border border-gray-500'>{client.endDate} {client.dropOffTime}</td>
                      <td className='py-2 px-4 text-center border border-gray-500'>{client.daysPrice} $</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>

    : <div>Without Clients !</div>
    }
  </div>
  )
}

export default ClientsTable