import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import SearchPage from './Components/SearchPage/SearchPage';
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import PrivateRoutes from "./Auth/PrivateRoute";
import MyJobs from "./Components/MyJobs/MyJobs";
import UserProfilePage from "./Components/ProfilePage/UserProfilePage";
import EditJob from "./Components/MyJobs/EditJob";
import Applicants from "./Components/Applicants/Applicants";
import CompanyRoute from "./Auth/CompanyRoute";
import ApplyPage from "./Components/ApplyPage/ApplyPage";
import ViewApplicationPage from "./Components/Applicants/ViewApplicationPage";
import JobPage from "./Components/JobPage/JobPage";
import NotificationsPage from "./Components/NotificationsPage/NotificationsPage";

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
                  <Route path="/apply/:id" element={ <ApplyPage/> }/>
                  <Route element={<CompanyRoute/>}>
                      <Route path="/application/:id" element={ <ViewApplicationPage/> }/>
                  </Route>
                  <Route path="/notifications" element={ <NotificationsPage/> }/>
              </Route>
              <Route path="/" element={ <SearchPage/> }/>
              <Route path="/login" element={ <LoginPage/> }/>
              <Route path="/signup" element={ <RegisterPage/> }/>
              <Route path="/viewjob/:id" element={ <JobPage/> }/>
          </Routes>
      </BrowserRouter>
  );
}