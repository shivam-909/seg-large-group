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
        <Route path='/test' element={ <JobPostCard
            title='Web Developer' age={2} location='London' types={['Full-time', 'Part-time']}
            companyName='Expedia' salary='30,000/year' urgent={true} requirements={['C#: 2 years']}
            benefits={['Free transport']}
        /> }/>
        <Route path='/details' element={ <JobDetailsCard
            title='Web Developer' location='London' companyName='Expedia' salary='30,000/year'
            types={['Full-time', 'Part-time']} schedule={['Flexitime','Monday to Friday','8 hour shift']}
            qualifications={['A-Level or equivalent (Preferred)', 'Bachelors Degree']}
            benefits={['Free transport', 'Free lunch']}
            description='GENERAL DESCRIPTION ESSENTIAL DUTIES AND RESPONSIBILITIES · Work together with the other members of the team (both internal and external) and understand their day-to-day work in order to develop the necessary tools for the business, including but not limited to, writing, testing, correcting, and updating its software applications; · Keep up-to-date with the latest developments of all the IT tolls and services required to develop and maintain the business IT infrastructure; · Running regular checks on our network and data to identify possible failures (including security) and act to correct them; · Develop strong relationships with the other members of the team. SKILL REQUIREMENTS · Communication and writing skills in English (essential) · Team-player attitude (essential) · The ability to problem-solve and critically think, able to work under pressure and meet difficult deadlines (essential) · Excellent computer skills, including: · Windows, Office 365 (essential) · Hight level of Python, Django Framework (essential) · GitHub, SQL Database (essential) · Good understanding of REST APIs (desirable) · Knowledge of front-end languages and tools: · Intermediary Html, CSS (essential) · JavaScript, Bootstrap (desirable) · Mathematical and scientific calculation programming (essential). WORK EXPERIENCE REQUIREMENTS · Proof of work experience; · Proof of a portfolio of completed project(s). OTHER REQUIREMENTS · UK national or permanent UK resident with a valid working permit/settled status (essential) · Located in London or willing to relocate immediately (essential) · Relevant degree or equivalent experience (not essential but highly desirable) · Two letters of reference (required) Job Types: Full-time, Permanent, Graduate Salary: £28,000.00-£32,000.00 per year Schedule: Flexitime Monday to Friday Ability to commute/relocate: London, EC4N 6AE: reliably commute or plan to relocate before starting work (required) Education: A-Level or equivalent (preferred)'
        /> }/>
      </Routes>
    </BrowserRouter>
  );
}