import React, {useEffect, useState} from "react";
import JobCard from "./JobCard";
import axios from "axios";
import CompanyJobCard from "./CompanyJobCard";
import {GetData} from "../../Auth/GetUser";

export default function Category(props) {
    const [jobsList, setJobsList] = useState([]);
    const [user, setUser] = useState([])

    async function addCard(id, title, company, location, isSaved){
        await setJobsList( current => [...current, <JobCard id={id} title={title} company={company} location={location} isSaved={isSaved}/>]);
    }

    async function addCompanyCard(id, title, schedule, location, date){
        await setJobsList( current => [...current, <CompanyJobCard id={id} title={title} schedule={schedule} location={location} date={date}/>]);
    }

    useEffect(() => {
        const getUser = async () => {
            if (user.length === 0) {
                await GetData().then(r => {
                    setUser(r)
                });
            }
        };
        getUser()
    }, [user])
    useEffect(() => {
        if (props.filter === "Postings") {
            getPostings(); // eslint-disable-line
        }
        else if (props.filter === "Saved") {
            getSavedJobs(); // eslint-disable-line
        } else {
            getApplication(props.filter); // eslint-disable-line
        }
    },[props.filter, user]) // eslint-disable-line

    async function getPostings(){
        const companyID = user.companyID;
        const formData = new FormData();
        formData.append('companyID', companyID); // eslint-disable-line
        axios.post('http://localhost:8000/api/jobs/filter', formData)
            .then(async response => {
                if (response.data !== undefined) {
                    let filterJobs = response.data;
                    setJobsList([]);
                    for (let i = 0; i < filterJobs.length; i++) {
                        await addCompanyCard(filterJobs[i].id, filterJobs[i].title, filterJobs[i].schedule, filterJobs[i].location, filterJobs[i].datePosted);
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
        const formData = new FormData();
        formData.append('status', filter);
        formData.append('searcher', user.searcherID); // eslint-disable-line
        axios.post('http://localhost:8000/api/application/filter', formData)
            .then(response => {
                if (response.data !== undefined) {
                    let filterJobs = response.data.applications
                    setJobsList([])
                    for (let i = 0; i < filterJobs.length; i++) {
                        axios.get("http://localhost:8000/api/jobs/" + filterJobs[i].jobListing)
                            .then(async job => {
                                const companyName = await axios.get("http://localhost:8000/api/company/"+job.data.companyID).then(company => {return company.data.companyName})
                                await addCard(job.data.id, job.data.title, companyName, job.data.location, false);
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
        if (!user.userID){
            return;
        }
        axios.get('http://localhost:8000/api/user/' + user.userID)
            .then(response => {
                if (response.data.searcher?.savedJobs !== undefined) {
                    let savedJobs = response.data.searcher?.savedJobs
                    setJobsList([])
                    for (let i = 0; i < savedJobs.length; i++) {
                        axios.get("http://localhost:8000/api/jobs/" + savedJobs[i])
                            .then(async job => {
                                const companyName = await axios.get("http://localhost:8000/api/company/"+job.data.companyID).then(company => {return company.data.companyName})
                                await addCard(job.data.id, job.data.title, companyName, job.data.location, true);
                            })
                    }
                } else {
                    // TODO: Display for 0 Jobs
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