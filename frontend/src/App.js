import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import PrivateRoutes from "./Auth/PrivateRoute";
import MyJobs from "./Components/MyJobs/MyJobs";
import UserProfilePage from "./Components/ProfilePage/UserProfilePage";
import NotificationsPage from "./Components/NotificationsPage/NotificationsPage";

export default function App() {
    return (
      <BrowserRouter>
          <Routes>
              <Route element={<PrivateRoutes/>}>
              </Route>
              <Route path="/profile" element={ <UserProfilePage/> }/>
              <Route path="/myjobs" element={ <MyJobs/> }/>
              <Route path="/" element={ <SearchPage/> }/>
              <Route path="/login" element={ <LoginPage/> }/>
              <Route path="/signup" element={ <RegisterPage/> }/>
              <Route path="/notifications" element={ <NotificationsPage/> }/>
          </Routes>
      </BrowserRouter>
  );
}