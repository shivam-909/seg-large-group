import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import PrivateRoutes from "./Auth/PrivateRoute";
import MyJobs from "./Components/MyJobs/MyJobs";
import UserProfilePage from "./Components/ProfilePage/UserProfilePage";
import EditJob from "./Components/MyJobs/EditJob";

export default function App() {
    return (
      <BrowserRouter>
          <Routes>
              <Route element={<PrivateRoutes/>}>
              </Route>
              <Route path="/" element={ <SearchPage/> }/>
              <Route path="/login" element={ <LoginPage/> }/>
              <Route path="/signup" element={ <RegisterPage/> }/>
              <Route path="/jobs">
                  <Route path="" element={<MyJobs/>}/>
                  <Route path="edit/:id" element={ <EditJob/> }/>
                  <Route path="add/" element={ <EditJob/> }/>
              </Route>
              <Route path="/profile" element={ <UserProfilePage/> }/>
          </Routes>
      </BrowserRouter>
  );
}