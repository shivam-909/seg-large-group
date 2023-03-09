import React, {useEffect, useState} from "react";
import JobCard from "./JobCard";
import axios from "axios";
import CompanyJobCard from "./CompanyJobCard";

export default function Category(props) {
    const [jobsList, setJobsList] = useState([]);
    const token = localStorage.getItem("access");

    async function addCard(title, company, location){
        await setJobsList( current => [...current, <JobCard title={title} company={company} location={location}/>]);
    }

    async function addCompanyCard(title, schedule, location, date){
        await setJobsList( current => [...current, <CompanyJobCard title={title} schedule={schedule} location={location} date={date}/>]);
    }
    useEffect(() => {
        if (props.filter === "Postings") {
            getPostings(); // eslint-disable-line
        }
        else if (props.filter === "Saved") {
            getSavedJobs(); // eslint-disable-line
        } else {
            getApplication(props.filter); // eslint-disable-line
        }
    }, [props.filter]); // eslint-disable-line

    async function getPostings(){
        const userID = await axios.post('http://localhost:8000/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}}).then(response => { return response.data})
        const company = await axios.get("http://localhost:8000/user/"+userID).then(response => {return response.data});
        const companyID = company.companyID;
        const formData = new FormData();
        formData.append('companyID', companyID); // eslint-disable-line
        axios.post('http://localhost:8000/jobs/filter', formData)
            .then(async response => {
                if (response.data !== undefined) {
                    let filterJobs = response.data;
                    console.log(filterJobs);
                    setJobsList([]);
                    for (let i = 0; i < filterJobs.length; i++) {
                        await addCompanyCard(filterJobs[i].title, filterJobs[i].schedule, filterJobs[i].location, filterJobs[i].datePosted);
                    }
                } else {
                    console.log("no applications found")
                }
            })
            .catch(error => {
                // TODO: Display error message.
                console.error(error);
            });
    }

    async function getApplication(filter){
        const userID = await axios.post('http://localhost:8000/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}}).then(response => { return response.data})
        const formData = new FormData();
        formData.append('status', filter);
        formData.append('searcher', userID); // eslint-disable-line
        axios.post('http://localhost:8000/applications/filter', formData)
            .then(response => {
                if (response.data !== undefined) {
                    let filterJobs = response.data.applications
                    setJobsList([])
                    for (let i = 0; i < filterJobs.length; i++) {
                        axios.get("http://localhost:8000/jobs/" + filterJobs[i].jobListing)
                            .then(async job => {
                                const companyName = await axios.get("http://localhost:8000/company/"+job.data.companyID).then(company => {return company.data.companyName})
                                await addCard(job.data.title, companyName, job.data.location);
                            })
                    }
                } else {
                    console.log("no applications found")
                }
            })
            .catch(error => {
                // TODO: Display error message.
                console.error(error);
            });
    }
    async function getSavedJobs(){
        const userID = await axios.post('http://localhost:8000/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}}).then(response => { return response.data})
        axios.get('http://localhost:8000/user/' + userID)
            .then(response => {
                if (response.data.savedJobs !== undefined) {
                    let savedJobs = response.data.savedJobs
                    setJobsList([])
                    for (let i = 0; i < savedJobs.length; i++) {
                        axios.get("http://localhost:8000/jobs/" + savedJobs[i])
                            .then(async job => {
                                const companyName = await axios.get("http://localhost:8000/company/"+job.data.companyID).then(company => {return company.data.companyName})
                                await addCard(job.data.title, companyName, job.data.location);
                            })
                    }
                } else {
                    console.log("no jobs")
                }
            })
            .catch(error => {
                // TODO: Display error message.
                console.error(error);
            });
    }
    return (
        <div className='items-center justify-center flex relative w-full'>
            <div className={"display-block w-full"}>
                {jobsList}
            </div>
        </div>
    );
}