import { BrowserRouter, Route, Routes } from 'react-router-dom';

import UserProfilePage from './Components/ProfilePage/UserProfilePage';
import SearchPage from './Components/SearchPage/SearchPage';
import EmployerProfilePage from "./Components/ProfilePage/EmployerProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={ <UserProfilePage/> }/>
        <Route path="/search" element={ <SearchPage/> }/>
      </Routes>
    </BrowserRouter>
  );
}
