import React, {useEffect, useState} from "react";
import JobCard from "./JobCard";
import axios from "axios";
import CompanyJobCard from "./CompanyJobCard";
import {GetData} from "../../Auth/GetUser";
import Loading from "../Loading/Loading";
import RefreshToken from "../../Auth/RefreshToken";

export default function Category(props) {
    const [jobsList, setJobsList] = useState([]);
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    async function addCard(applicationID, jobID, title, company, companyID, location, status){
        await setJobsList( current => [...current, <JobCard id={applicationID} jobID={jobID} title={title} company={company} companyID={companyID} location={location} status={status}/>]);
    }

    async function addCompanyCard(id, title, schedule, location, date){
        await setJobsList( current => [...current, <CompanyJobCard id={id} title={title} schedule={schedule} location={location} date={date}/>]);
    }

    useEffect(() => {
        const getUser = async () => {
            await RefreshToken();
            if (user.length === 0) {
                await GetData().then(r => {
                    setUser(r)
                });
            }
        };
        getUser()
    }, [user])
    useEffect(() => {
        setLoading(true)
        async function updateListings() {
            await RefreshToken();
            if (props.filter === "Postings") {
                await getPostings(); // eslint-disable-line
            } else if (props.filter === "Saved") {
                await getSavedJobs(); // eslint-disable-line
            } else {
                await getApplication(props.filter); // eslint-disable-line
            }
        }
        updateListings();
    },[props.filter, user]) // eslint-disable-line

    async function getPostings(){
        await RefreshToken();
        const companyID = user.companyID;
        const formData = new FormData();
        formData.append('companyID', companyID); // eslint-disable-line
        axios.post(`${process.env.REACT_APP_BACKEND_URL}api/jobs/filter`, formData)
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
                setLoading(false);
            })
            .catch(error => {
                // TODO: Display error message.
                setLoading(false);
                console.error(error);
            });
    }

    async function getApplication(filter){
        await RefreshToken();
        const formData = new FormData();
        formData.append('status', filter);
        formData.append('searcher', user.searcherID); // eslint-disable-line
        axios.post(`${process.env.REACT_APP_BACKEND_URL}api/application/filter`, formData)
            .then(response => {
                if (response.data !== undefined) {
                    let filterJobs = response.data.applications
                    setJobsList([])
                    for (let i = 0; i < filterJobs.length; i++) {
                        axios.get(`${process.env.REACT_APP_BACKEND_URL}api/jobs/${filterJobs[i].jobListing}`)
                            .then(async job => {
                                const companyName = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/company/${job.data.companyID}`).then(company => {return company.data.companyName})
                                await addCard(filterJobs[i].id, job.data.id, job.data.title, companyName, job.data.companyID, job.data.location, filterJobs[i].status);
                            })
                    }
                } else {
                    console.log("no applications found")
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }

    async function getSavedJobs(){
        if (!user.userID){
            return;
        }
        await RefreshToken();
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user`, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})
            .then(response => {
                if (response.data.searcher?.savedJobs !== undefined) {
                    let savedJobs = response.data.searcher?.savedJobs
                    setJobsList([])
                    for (let i = 0; i < savedJobs.length; i++) {
                        axios.get(`${process.env.REACT_APP_BACKEND_URL}api/jobs/${savedJobs[i]}`)
                            .then(async job => {
                                const companyName = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/company/${job.data.companyID}`).then(company => {return company.data.companyName})
                                await addCard("",job.data.id, job.data.title, companyName, job.data.location, "Saved");
                            })
                    }
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }
    return (
        <div className='items-center justify-center flex relative w-full'>
            {!loading ?
            <div className={"display-block w-full"}>
                {jobsList}
            </div>
                :
                // eslint-disable-next-line
            <div role='jobFound' ><Loading className={"h-10 w-10 border-[3px] border-dark-theme-grey"}/></div>}
        </div>
    );
}