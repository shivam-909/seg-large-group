import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import RegistrationPage from './Components/RegistrationPage/Registration';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <RegistrationPage/> }/>
        <Route path="/login" element={ <LoginPage/> }/>
        <Route path="/search" element={ <SearchPage/> }/>
      </Routes>
    </BrowserRouter>
  );
}