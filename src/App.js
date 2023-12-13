import './App.css';
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Footer from './layouts/Footer';
import { Navbar } from './layouts/Navbar';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import { UserContextProvider } from './context/UserContext';
import Login from './pages/Login/Login';
import RentUrCar from './pages/RentUrCar/RentUrCar';
import NotFound404 from './pages/NotFoundPage/NotFound404';
import SingleCarInfo from './pages/singleCarInfo/SingleCarInfo';
import SearchPage from './pages/SearchResults/SearchPage';
import DashboardAgency from './pages/dashboardAgency/DashboardAgency';
import SignupAgency from './pages/Signup/SignupAgency';
import LoginAgency from './pages/Login/LoginAgency';
import AgencyProfile from './pages/AgencyProfile/AgencyProfile';



function App() {


  return (
    <div>
      <UserContextProvider>
      <Router>
          {/* <Navbar/> */}
            <Routes>
                <Route index element={<Home/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='/Signup' element={<Signup/>}/>
                <Route path='/Signup-agency' element={<SignupAgency/>}/>
                <Route path='/Login' element={<Login/>}/>
                <Route path='/Login-agency' element={<LoginAgency/>}/>
                <Route path='/Car_infromation' element={<RentUrCar/>}/> 
                <Route path='/Car_Information/:id' element={<SingleCarInfo/>}/>
                <Route path='/Search-Results' element={<SearchPage/>}/>
                <Route path='/dashboard/:agenceName' element={<DashboardAgency/>}/>
                <Route path='/Agency/:agenceName/:id' element={<AgencyProfile/>}/>
                <Route path='*' element={<NotFound404/>}/>
            </Routes>
          <Footer/>
      </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
