import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import JobPostCard from "./Components/SearchPage/JobPostCard";
import JobDetailsCard from "./Components/SearchPage/JobDetailsCard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LoginPage/> }/>
        <Route path="/search" element={ <SearchPage/> }/>
      </Routes>
    </BrowserRouter>
  );
}