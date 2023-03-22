import SearchBar from "./SearchBar";
import {useState} from "react";
import Filters from "./Filters";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import JobList from "./JobList";

function SearchPage() {
    const [jobs, setJobs] = useState([]);
    const [showJobTitleInputErrorMessage, setShowJobTitleInputErrorMessage] = useState(false);
    const [showLocationInputErrorMessage, setShowLocationInputErrorMessage] = useState(false);

    // TODO: Do filter system

    function showResults() {
        if (isJobTitleInputValid() & isLocationInputValid()) {
            const formData = new FormData();
            formData.append('companyID', '5b834bee-a840-4d01-a21c-712e1474b97d');
            axios.post('http://localhost:8000/api/jobs/filter', formData)
                .then(async response => {
                    for (const job of response.data) {
                        job.age = Math.floor(((Date.now() / 1000) - job.datePosted._seconds) / 86400);
                        job.compensation[0] = job.compensation[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        await axios.get(`http://localhost:8000/api/company/${job.companyID}`).then(company => {
                            job.companyName = company.data.companyName;
                        });
                    }
                    setJobs(response.data);
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
                        <JobList jobs={jobs}/>
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
