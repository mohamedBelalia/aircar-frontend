import axios from 'axios';
import Cookies from 'js-cookie';
import React , { createContext , useEffect, useState } from 'react'


export const UserContext = createContext(null)

export const UserContextProvider = ({children}) => {
    
   
    const [userInfo , setUserInfo] = useState([])
    const [agencyInfo , setAgencyInfo] = useState([])
    const [isAuth , setIsAuth] = useState(false)

    const [confToggel , setConfToggle] = useState(false)

    const conf = () => {
        setConfToggle(!confToggel);
    }


    const login = (token) => {
        axios.get("http://localhost/aircar_backend/getUserInfo.php?token="+token)
        .then((response)=>{
            if(response.data.status !== "unvalidUser"){
                setUserInfo(response.data[0])
                setIsAuth(true)
            }
            else{
                setUserInfo([])
            }
        })
    }

    const loginAgency = (token) => {
        axios.get("http://localhost/aircar_backend/getAgencyInfo.php?token="+token)
        .then((response)=>{
            if(response.data.status !== "unvalidUser"){
                setAgencyInfo(response.data[0])
                setIsAuth(true)
                
            }
            else{
                setAgencyInfo([]);
            }
        })
    }

    useEffect(() => {

        if(Cookies.get("utokenacc")){
            setIsAuth(true)
        }
        else{
            setIsAuth(false)
        }
      }, []);

    const logOut = () => {
        if(Cookies.get("utokenacc")){
            Cookies.remove("utokenacc")
        }

        if(Cookies.get("atokenacc")){
            Cookies.remove("atokenacc");
        }
        
        login(0)
        loginAgency(0)
    }

    const values = {userInfo , agencyInfo , isAuth , login , loginAgency , logOut , conf , confToggel}

    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    )

}

