import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import Navbar from "./Components/Navbar/Navbar";

export default function App() {
  return (
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