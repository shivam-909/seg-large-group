import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import ApplicationsPage from './Components/ApplicationsPage/ApplicationsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LoginPage/> }/>
        <Route path="/search" element={ <SearchPage/> }/>
        <Route path="/applications" element={ <ApplicationsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}