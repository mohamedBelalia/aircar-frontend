import React from 'react'
import Landing from './Landing'
import Numbers from './Numbers'
import VehiclesTypes from './VehiclesTypes'
import Questions from './Questions'
import ListningCars from './ListningCars'
import { Navbar } from '../../layouts/Navbar'

const Home = () => {
// https://www.autoscout24.it/auto/fiat/fiat-cinquecento/
  return (
    <>
    <Navbar/>
        <Landing/>
        <Numbers/>
        <VehiclesTypes/>
        <Questions/>
        <ListningCars/>
    </>
  )
}

export default Home