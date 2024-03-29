import SearchBar from "./SearchBar";
import {useEffect, useState} from "react";
import Filters from "./Filters";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Loading from "../Loading/Loading";
import {distanceTo} from 'geolocation-utils';
import Geocode from "react-geocode";
import {GetData} from "../../Auth/GetUser";
import RefreshToken from "../../Auth/RefreshToken";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

export default function SearchPage() {
    const [isLoading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [showJobTitleInputErrorMessage, setShowJobTitleInputErrorMessage] = useState(false);
    const [showLocationInputErrorMessage, setShowLocationInputErrorMessage] = useState(false);
    const [noJobsFound, setNoJobsFound] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            if (user.length === 0){
                await RefreshToken();
                await GetData().then(r => {
                    if (r !== undefined) {
                        setUser(r)
                    }
                }).catch(e => console.log(e));
            }
        };
        getUser()
    },[user]) // eslint-disable-line

    function showResults() {
        if (isJobTitleInputValid() & isLocationInputValid()) {
            setJobs([]);
            setLoading(true);
            const formData = new FormData();
            formData.append('term', document.getElementById('jobTitleInput').value);
            const config = user.userID ? {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}} : {};
            axios.post(`${process.env.REACT_APP_BACKEND_URL}api/jobs/search`, formData, config)
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
                    catch (err) {
                        console.log(err)
                    }

                    for (const job of response.data.results) {
                        job.age = Math.floor(((Date.now() / 1000) - job.datePosted._seconds) / 86400);

                        job.compensation[0] = job.compensation[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/company/${job.companyID}`).then(company => {
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
                        catch(err) {
                            job.distance = 10000;
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
                                    {isLoading &&
                                        <Loading className='w-16 h-16 border-[6px] border-dark-theme-grey'/>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}
