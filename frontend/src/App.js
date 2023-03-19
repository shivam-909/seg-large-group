import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import PrivateRoutes from "./Auth/PrivateRoute";
import MyJobs from "./Components/MyJobs/MyJobs";
import UserProfilePage from "./Components/ProfilePage/UserProfilePage";
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import EmailVerification from './Components/ResetPassword/ResetPassword';
import EditJob from "./Components/MyJobs/EditJob";
import Applicants from "./Components/Applicants/Applicants";
import ViewJob from "./Components/ViewJobs/ViewJob";
import CompanyRoute from "./Auth/CompanyRoute";
import ResetPassword from './Components/ResetPassword/ResetPassword';

export default function App() {
    return (
      <BrowserRouter>
          <Routes>
              <Route element={<PrivateRoutes/>}>
                      <Route path="/jobs">
                          <Route path="" element={<MyJobs/>}/>
                          <Route element={<CompanyRoute/>}>
                              <Route path="add/" element={ <EditJob/> }/>
                              <Route path="edit/:id" element={ <EditJob/> }/>
                              <Route path="applicants/:id" element={ <Applicants/> }/>
                      </Route>
                  </Route>
                  <Route path="/profile/:id" element={ <UserProfilePage/> }/>
              </Route>
              <Route path="/" element={ <SearchPage/> }/>
              <Route path="/login" element={ <LoginPage/> }/>
              <Route path="/signup" element={ <RegisterPage/> }/>
              <Route path="/saved" element={ <MyJobs/> }/>
              <Route path="/profile" element={ <UserProfilePage/> }/>
              <Route path="/forgot" element={ <ForgotPassword/> }/>
              <Route path="/reset" element={ <ResetPassword/> }/>
              <Route path="/viewjob/:id" element={ <ViewJob/> }/>
          </Routes>
      </BrowserRouter>
  );
}