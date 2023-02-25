import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SavedJobs from './Components/SavedJobsPage/SavedJobs';
import SearchPage from './Components/SearchPage/SearchPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LoginPage/> }/>
        <Route path="/search" element={ <SearchPage/> }/>
        <Route path="/savedjobs" element={<SavedJobs/>}/>
      </Routes>
    </BrowserRouter>
  );
}