import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import Navbar from "./Components/Navbar/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <SearchPage/> }/>
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/signup" element={ <RegisterPage/> }/>
      </Routes>
    </BrowserRouter>
      <div>
          <Navbar/>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={ <LoginPage/> }/>
                  <Route path="/search" element={ <SearchPage/> }/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}