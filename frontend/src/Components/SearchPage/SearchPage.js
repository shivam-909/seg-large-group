import SearchBar from "./SearchBar";
import {useState} from "react";
import Filters from "./Filters";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import JobPostCard from "./JobPostCard";
import JobDetailsCard from "./JobDetailsCard";

function SearchPage() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showJobTitleInputErrorMessage, setShowJobTitleInputErrorMessage] = useState(false);
    const [showLocationInputErrorMessage, setShowLocationInputErrorMessage] = useState(false);

    // TODO: Do filter system

    function showResults() {
        if (isJobTitleInputValid() & isLocationInputValid()) {
            const formData = new FormData();
            formData.append('location', 'North Darrickberg');
            axios.post('http://localhost:8000/api/jobs/filter', formData).then(response => {
                response.data.forEach(job => {
                    axios.get(`http://localhost:8000/api/company/${job.companyID}`).then(response => {
                        job.companyName = response.data.companyName;
                    });
                    job.age = Math.floor(((Date.now() / 1000) - job.datePosted._seconds) / 86400);
                });
                setJobs(response.data);
                setSelectedJob(response.data[0]);
            });
        }
     }

    function isJobTitleInputValid() {
        if (document.getElementById('jobTitleInput').value === '') {
            setShowJobTitleInputErrorMessage(true);
            return false;
        }
        return true;
    }

    function isLocationInputValid() {
        if (document.getElementById('locationInput').value === '') {
            setShowLocationInputErrorMessage(true);
            return false
        }
        return true;
    }

    return (
        <div>
            <Navbar/>
            <div className='mt-36 space-y-5 flex-col'>
                <SearchBar onclick={showResults} onJobTitleInputChange={() => setShowJobTitleInputErrorMessage(false)} onLocationInputChange={() => setShowLocationInputErrorMessage(false)} displayJobTitleInputErrorMessage={showJobTitleInputErrorMessage} displayLocationInputErrorMessage={showLocationInputErrorMessage}/>
                {jobs.length > 0 ?
                    <div className='space-y-12'>
                        <Filters/>
                        <div className='flex items-start justify-center space-x-5 mx-8'>
                            <div className='space-y-3'>
                                {jobs.map(job =>
                                    <div onClick={() => setSelectedJob(job)}>
                                        <JobPostCard
                                        id={job.id} title={job.title} age={job.age} location={job.location} types={job.schedule}
                                        companyName={job.companyName} salary={`${job.compensation[0]}/${job.compensation[1]}`} urgent={job.urgent} requirements={job.requirements}
                                        benefits={job.benefits}/>
                                    </div>
                                )}
                            </div>
                            <JobDetailsCard
                                id={selectedJob.id} age={selectedJob.age} urgent={selectedJob.urgent}
                                title={selectedJob.title} location={selectedJob.location} companyName={selectedJob.companyName} salary={`${selectedJob.compensation[0]}/${selectedJob.compensation[1]}`}
                                types={selectedJob.type} schedule={selectedJob.schedule}
                                qualifications={selectedJob.qualifications}
                                benefits={selectedJob.benefits}
                                description={selectedJob.description}/>
                        </div>
                    </div>
                    :
                    <div className='pt-12 space-y-24'>
                        <div className='flex flex-col items-center justify-center space-y-5'>
                            <p>Looking for a job? <a className='font-bold' href='/'>Upload your CV.</a></p>
                            <p>Looking for your next hire? <a className='font-bold' href='/'>Post a job.</a></p>
                        </div>
                        <div className='bg-darker-grey min-w-screen flex items-center justify-center'>
                            <p>For You</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default SearchPage;
