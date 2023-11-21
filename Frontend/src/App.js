import React from 'react'
import {Routes, Route ,Navigate} from 'react-router-dom';
import DetailsFillingPage from './Components/DetailsFillComponents/DetailsFillingPage';
import Home from './Components/HomePage/Home'
import NavBar from './Components/Navigation/Navbar'
import MyResume from './Components/ResumeDisplay/MyResume';
import AboutUs from './Components/AboutUs/AboutUs';
import './App.css';
import Templates from './Components/HomePage/templates';
import Contact from './Components/contactus/Contact';
import Login from './Components/Auth/login';
import Register from './Components/Auth/register';
import Mineresume from './Components/MyResume/myresume';
import FillingWeb from './Components/FillingWeb/DetailsFillingPage';
import WebResume from './Components/ResumeWeb/MyResume';
import DetailsFillingWritter from './Components/FillingContent/DetailsFillingPage';
import WritterResume from './Components/ResumeWritter/MyResume';


function App() {
  return (
    <div>
        <div> 
          <NavBar/>
        </div>
        
        <div>
            <Routes>
                  <Route exact path="/" element={<Home/>}></Route>
                  <Route exact path="/templates" element={<Templates/>}></Route>
                  <Route path="/detailsfillingpage/*" element ={<DetailsFillingPage />}></Route> 
                  <Route path="/fillingWeb/*" element ={<FillingWeb />}></Route> 
                  <Route path="/fillingWritter/*" element ={<DetailsFillingWritter />}></Route> 
                  <Route path="/WebTemplate" element={<WebResume/>}></Route>
                  <Route path="/WritterTemplate" element={<WritterResume/>}></Route>
                  <Route path="/mine" element={<Mineresume/>}></Route>
                  <Route exact path="/about" element={<AboutUs/>}></Route>
                  <Route exact path="/contact" element={<Contact/>}></Route>
                  <Route exact path="/login" element={<Login/>}></Route>
                  <Route exact path="/register" element={<Register/>}></Route>
                  <Route path="*" element={<Navigate to="/about" />}></Route>
            </Routes> 
        </div>
    </div>
  )
}


export default App