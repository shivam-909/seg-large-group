import SearchBar from "./SearchBar";
import {useState} from "react";
import Filters from "./Filters";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Loading from "../Loading/Loading";
import {distanceTo} from 'geolocation-utils';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyC0FpC_LZEQb2iyXwOEcyM57llwjE9hBOQ");

function SearchPage() {
    const [isLoading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [showJobTitleInputErrorMessage, setShowJobTitleInputErrorMessage] = useState(false);
    const [showLocationInputErrorMessage, setShowLocationInputErrorMessage] = useState(false);
    const [noJobsFound, setNoJobsFound] = useState(false);

    function showResults() {
        if (isJobTitleInputValid() & isLocationInputValid()) {
            setJobs([])
            setLoading(true);
            const formData = new FormData();
            formData.append('term', document.getElementById('jobTitleInput').value);
            axios.post('http://localhost:8000/api/jobs/search', formData)
                .then(async response => {
                    if (response.data.results.length === 0) {
                        setNoJobsFound(true);
                    }

                    const locationInput = document.getElementById("locationInput").value;
                    let locInput;
                    try {
                        locInput = await Geocode.fromAddress(locationInput).then(response => {
                            return {lat: response.results[0].geometry.location.lat, lon: response.results[0].geometry.location.lng};
                        });
                    }
                    catch (err){
                        console.log(err)
                    }

                    for (const job of response.data.results) {
                        job.age = Math.floor(((Date.now() / 1000) - job.datePosted._seconds) / 86400);

                        job.compensation[0] = job.compensation[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        await axios.get(`http://localhost:8000/api/company/${job.companyID}`).then(company => {
                            job.companyName = company.data.companyName;
                        });

                        try {
                            const jobLoc = await Geocode.fromAddress(job.location)
                                .then(res => {
                                    return {
                                        lat: res.results[0].geometry.location.lat,
                                        lon: res.results[0].geometry.location.lng
                                    };
                                })
                                .catch(err => console.log(err));
                            job.distance = distanceTo(locInput, jobLoc) * 0.000621371;
                        }
                        catch(err){
                            console.log(err)
                            job.distance=10000;
                        }
                    }
                    setLoading(false);
                    setJobs(response.data.results);
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
                    <Filters jobs={jobs}/>
                    :
                    <div className='pt-12 space-y-24'>
                        {noJobsFound ?
                            <div>
                                <p className='text-center text-2xl'>No jobs found.</p>
                            </div>
                            :
                            <div>
                                <div className='flex flex-col items-center justify-center'>
                                    {isLoading ?
                                        <Loading className='w-16 h-16 border-[6px] border-dark-theme-grey'/>
                                    :
                                        <div className='space-y-5'>
                                            <p>Looking for a job? <a className='font-bold' href='/'>Upload your CV.</a></p>
                                            <p>Looking for your next hire? <a className='font-bold' href='/'>Post a job.</a></p>
                                        </div>
                                    }
                                </div>
                                <div className='bg-darker-grey min-w-screen flex items-center justify-center mt-24'>
                                    <p>For You</p>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default SearchPage;
