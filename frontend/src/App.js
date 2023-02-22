import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './Components/LoginPage/Welcome';
import SearchPage from './Components/SearchPage/SearchPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Welcome/> }/>
        <Route path="/search" element={ <SearchPage/> }/>
      </Routes>
    </BrowserRouter>
  );
}
