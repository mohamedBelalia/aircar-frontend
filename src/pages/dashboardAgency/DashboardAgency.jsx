import React, { useContext, useEffect, useState } from 'react'
import NavbarDashboard from './NavbarDashboard'
import { AgencyHeader } from './AgencyHeader'
import Numbers from './Numbers'
import ClientsTable from './ClientsTable'
import Charts from './Charts'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import Loading from '../../layouts/Loading'
import Cookies from 'js-cookie'


const DashboardAgency = () => {

    const {agencyInfo , loginAgency} = useContext(UserContext);
    const [agencyId , setAgencyId] = useState();
        
    const [numbers , setNumbers] = useState([])
    
    useEffect(()=>{
    
    if(Cookies.get("atokenacc")){
        loginAgency(Cookies.get("atokenacc"));
        
            axios.get("http://localhost/aircar_backend/dashboardAgency.php?idAgency="+agencyInfo.id)
            .then((response)=>{
                if(response.data.status === "ok"){
                    setNumbers(response.data)
                }
            })            
        }
        
        setAgencyId(agencyInfo.id)

    },[agencyInfo.id])


    


  return (
    <div className='w-[100%] p-5 py-8 bg-indigo-50'>

        <div className='flex flex-col md:flex-row w-[100%] h-[100%] gap-5'>

            <div className='md:w-1/5 md:h-[80vh] '>
                <NavbarDashboard/>
            </div>

            <div className='w-full p-6'>
                <div>
                    <AgencyHeader/>
                </div>
                <div>
                    <Numbers carsCount={numbers.carsCount} clientsCount={numbers.clientsCount} incomeTotal={numbers.incomeTotal} />
                </div>
                <div>
                    <Charts/>
                </div>
                <div>
                   <ClientsTable agencyId={agencyId}/>
                </div>
            </div>

        </div>

    </div>
  )
}

export default DashboardAgency