import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import MyJobs from "./Components/MyJobs/MyJobs";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <SearchPage/> }/>
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/signup" element={ <RegisterPage/> }/>
          <Route path="/saved" element={ <MyJobs/> }/>
      </Routes>
    </BrowserRouter>
  );
}