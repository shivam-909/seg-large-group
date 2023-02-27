import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/" element={ <SearchPage/> }/>
      </Routes>
    </BrowserRouter>
  );
}