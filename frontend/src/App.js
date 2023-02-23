import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import Welcome from './Components/LoginPage/Welcome';
// import LoginPage from './Components/LoginPage/LoginPage';
import EmployerProfilePage from './Components/ProfilePage/EmployerProfilePage';
import SearchPage from './Components/SearchPage/SearchPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <EmployerProfilePage/> }/>
        <Route path="/search" element={ <SearchPage/> }/>
      </Routes>
    </BrowserRouter>
  );
}
