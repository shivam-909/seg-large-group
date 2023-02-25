import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./SavedJobs.css";
import Navbar from "../Navbar/Navbar";

 
function SavedJobs() {
 return (
    <div className="SavedJobs">
    <Navbar/>

    {/* <div>
        {/* <h2>Saved Jobs</h2> */}
    {/* </div> */} 
     <Tabs className="tabs"> 
       <TabList>
         <Tab>Saved</Tab>
         <Tab>Applied</Tab>
         <Tab>Interviewed</Tab>
         <Tab>Rejected</Tab>
         <Tab>Archived</Tab>
       </TabList>
<TabPanel>
         <p>Saved Jobs</p>
       </TabPanel>
       <TabPanel>
         <p>Applied</p>
       </TabPanel>
       <TabPanel>
         <p>Interviewed</p>
       </TabPanel>
       <TabPanel>
         <p>Rejected</p>
       </TabPanel>
       <TabPanel>
         <p>Archived</p>
       </TabPanel>
     </Tabs> 
   </div>
 );
}
 
export default SavedJobs;



// const SavedJobs = () => {
//     return (
//         <div className="Tabs">
//             <div className="savedJobs-header">
//                 <h2>Saved Jobs</h2>
//             </div>
//             <ul className="nav">
//                     <div className="tabLabels">
//                         <li>Saved</li>
//                         <li>Applied</li>
//                         <li>Interviews</li> 
//                         <li>Rejected</li>
//                         <li>Archived</li>
//                     </div>
//                 </ul>
//                 <div className="outlet">

//                 </div>
//             </div>
//     );
// }
// export default SavedJobs;

