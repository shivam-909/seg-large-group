import SearchBar from "./SearchBar";
import {useState} from "react";
import Filters from "./Filters";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import JobList from "./JobList";
import Loading from "../Loading/Loading";

function SearchPage() {
    const [isLoading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [showJobTitleInputErrorMessage, setShowJobTitleInputErrorMessage] = useState(false);
    const [showLocationInputErrorMessage, setShowLocationInputErrorMessage] = useState(false);

    // TODO: Accommodate for navbar
    // TODO: Do filter system

    function showResults() {
        if (isJobTitleInputValid() & isLocationInputValid()) {
            setLoading(true);
            const formData = new FormData();
            formData.append('companyID', '848082c4-e679-44a3-bcfa-f7854a9a8c59');
            axios.post('http://localhost:8000/api/jobs/filter', formData)
                .then(async response => {
                    for (const job of response.data) {
                        job.age = Math.floor(((Date.now() / 1000) - job.datePosted._seconds) / 86400);
                        job.compensation[0] = job.compensation[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        await axios.get(`http://localhost:8000/api/company/${job.companyID}`).then(company => {
                            job.companyName = company.data.companyName;
                        });
                    }
                    setLoading(false);
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
            <div className='mt-36 space-y-5 flex-col mb-12'>
                <SearchBar onclick={showResults} onJobTitleInputChange={() => setShowJobTitleInputErrorMessage(false)} onLocationInputChange={() => setShowLocationInputErrorMessage(false)} displayJobTitleInputErrorMessage={showJobTitleInputErrorMessage} displayLocationInputErrorMessage={showLocationInputErrorMessage}/>
                {jobs.length > 0 ?
                    <div className='space-y-12'>
                        <Filters jobs={jobs}/>
                        <JobList jobs={jobs}/>
                    </div>
                    :
                    <div className='pt-12 space-y-24'>
                        <div className='flex flex-col items-center justify-center space-y-5'>
                            {isLoading ?
                                <Loading className={"w-16 h-16 border-[6px] border-dark-theme-grey"}/>
                            :
                                <div>
                                    <p>Looking for a job? <a className='font-bold' href='/'>Upload your CV.</a></p>
                                    <p>Looking for your next hire? <a className='font-bold' href='/'>Post a job.</a></p>
                                </div>
                            }
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
