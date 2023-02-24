import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import LandingPage from "./Components/LandingPage/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <LandingPage/> }/>
          <Route path="/login" element={ <LoginPage/> }/>
        <Route path="/search" element={ <SearchPage/> }/>
      </Routes>
    </BrowserRouter>
  );
}