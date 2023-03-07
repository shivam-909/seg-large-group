import React, {useEffect, useState} from "react";
import JobCard from "./JobCard";
import axios from "axios";

export default function Category(props) {
    const [jobsList, setJobsList] = useState([]);
    async function addCard(title, company, location){
        await setJobsList( current => [...current, <JobCard title={title} company={company} location={location}/>]);
    }
    useEffect(() => {
        if (props.filter === "saved") {
            getSavedJobs();
        } else {
            getApplication(props.filter);
        }
    }, [props.filter]);
    async function getApplication(filter){
        const token = localStorage.getItem("access");
        const userID = await axios.post('http://localhost:8000/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}}).then(response => { return response.data})
        // axios.get('http://localhost:8000/applications/' + userID)
        //     .then(response => {
        //         if (response.data !== undefined) {
        //
        //         } else {
        //             console.log("no applications found")
        //         }
        //     })
        //     .catch(error => {
        //         // TODO: Display error message.
        //         console.error(error);
        //     });
        setJobsList([]);
    }
    async function getSavedJobs(){
        const token = localStorage.getItem("access");
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