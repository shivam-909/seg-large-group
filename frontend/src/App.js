import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import Navbar from "./Components/Navbar/Navbar";
import NewNavbar from "./Components/Navbar/NewNavbar";
import PrivateRoutes from "./Components/PrivateRoute";
import {useState} from "react";

export default function App() {
    return (
      <BrowserRouter>
          <Routes>
              <Route element={<PrivateRoutes/>}>

              </Route>
              <Route path="/login" element={ <LoginPage/> }/>
              <Route path="/signup" element={ <RegisterPage/> }/>
              <Route path="/search" element={ <SearchPage/> }/>

          </Routes>
      </BrowserRouter>
  );
}