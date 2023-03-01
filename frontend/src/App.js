import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import Navbar from "./Components/Navbar/Navbar";
import NewNavbar from "./Components/Navbar/NewNavbar";
import {useState} from "react";

export default function App() {
    // const {auth} = useAuth();

    return (
      <BrowserRouter>
          {/*<NewNavbar loggedIn={loggedIn}/>*/}
          <Routes>
              <Route path="/" element={ <SearchPage/> }/>
              <Route path="/login" element={ <LoginPage/> }/>
              <Route path="/signup" element={ <RegisterPage/> }/>
              <Route path="/search" element={ <SearchPage/> }/>
          </Routes>
      </BrowserRouter>
  );
}