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
            id='jbsdjgbsdjgb' age={0} urgent={true}
            title='Web Developer' location='London' companyName='Expedia' salary='30,000/year'
            types={['Full-time', 'Part-time']} schedule={['Flexitime','Monday to Friday','8 hour shift']}
            qualifications={['A-Level or equivalent (Preferred)', 'Bachelors Degree']}
            benefits={['Free transport', 'Free lunch']}
            description='About the Role Working across our whole warehouse estate, you’ll help develop and support systems that ensure our Warehouse & Distribution operation continues to remain unrivalled. This will involve everything from developing cutting-edge technology features and practices, to playing a major role in the analysis, design, and development of various high profile projects. Our plans for the department and current ways of working are huge. You’ll work on high profile projects to optimise how we pick, pack and deliver our customer’s orders to continually improve our customer service. In other projects you’ll work on a range of applications for web, desktop and mobile devices that improve how we receive, refurbish and store products from our suppliers in order to improve our relationships with them and have an ever increasing range of products available for sale and delivered to our customers as fast as possible. You’ll help provide development support to internal users, as well as offering occasional out-of-hours cover. You’ll also use your expertise and experience to help us continually improve our processes and working practices, actively enabling the department to become as efficient and effective as it can be. There are flexible working options available for this role, including hybrid solutions Essential Criteria A passion for IT, and a keen desire to be involved in the latest development tools and technologies Strong understanding of Microsoft C# / .NET Framework / .NET Core SQL Server / Entity Framework Javascript and Angular Source Control (Git, TFvC) Experience with TDD Desirable Criteria Strong Agile/Scrum experience Experience with RESTful APIs, and/or microservices would be highly beneficial Azure Devops (or CI/CD Build tools) Event Streaming Kafka Azure Service Bus Containerisation e.g. Docker No-SQL Databases Exposure to Cloud technologies (Azure or AWS) ABOUT US You know Next, but did you know we’re a FTSE-100 retail company employing over 35,000 people across the UK and Ireland. We’re the UK’s 2nd largest fashion retailer and for Kidswear we’re the market leader. At the last count we have over 500 stores, plus the Next Online and it’s now possible to buy on-line from over 70 countries around the world! So we’ve gone global! OUR BENEFITS ​25% off a huge selection of Next, Lipsy & VictoriSecret products Company performance based bonus Next private pension Sharesave scheme On-site Nursery available; OFSTED outstanding in all areas 10% off most partner brands & up to 15% off Branded Beauty Early VIP access to sale stock Access to fantastic discounts at our Staff Shops Subsidised restaurant, coffee shop and juice bar Access a 24/7 digital GP and other free health and wellbeing services Free on-site parking Job Types: Full-time, Permanent Salary: £25,719.00 per year Schedule: Monday to Friday Work Location: One location'/> }/>
      </Routes>
    </BrowserRouter>
  );
}