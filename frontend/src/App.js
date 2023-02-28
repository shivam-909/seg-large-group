import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
<<<<<<< HEAD
import RegistrationPage from './Components/RegistrationPage/Registration';
=======
import RegisterPage from "./Components/RegisterPage/RegisterPage";
>>>>>>> 656d78f499637d8ec3791e9452ee72068f8bc9e2

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={ <RegistrationPage/> }/>
        <Route path="/login" element={ <LoginPage/> }/>
        <Route path="/search" element={ <SearchPage/> }/>
=======
          <Route path="/" element={ <SearchPage/> }/>
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/signup" element={ <RegisterPage/> }/>
>>>>>>> 656d78f499637d8ec3791e9452ee72068f8bc9e2
      </Routes>
    </BrowserRouter>
  );
}