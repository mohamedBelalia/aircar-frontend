import React from 'react'
import CarsCategories from './CarsCategories'
import SearchedCars from './SearchedCars'

const CarsResults = ({carsFiltersInfo}) => {


  return (
    <>
        
        <SearchedCars searchedFilters={carsFiltersInfo}/>
    </>
  )
}

export default CarsResults