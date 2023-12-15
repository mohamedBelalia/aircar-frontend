import React from 'react'
import SearchedCars from './SearchedCars'

const CarsResults = ({carsFiltersInfo}) => {


  return (
    <>
        <SearchedCars searchedFilters={carsFiltersInfo}/>
    </>
  )
}

export default CarsResults