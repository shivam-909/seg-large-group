import '../MyJobs/MyJobs.css'
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import {useNavigate, useParams} from "react-router-dom";
import {GetData} from "../../Auth/GetUser";
import axios from "axios";
import salaryIcon from '../../icons/salaryIcon.png';
import suitcaseIcon from '../../icons/suitcaseIcon.png';
import pindropIcon from '../../icons/pindrop.png';

export default function ViewJob() {
    const [isCompany, setCompany] = useState(false);
    const [companyName, setCompanyName] = useState(false);
    const [user, setUser] = useState([])
    const [job, setJob] = useState([])
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getJob = async () => {
            if (job.length === 0){
                await axios.get("http://localhost:8000/api/jobs/"+id).then(async r => {
                    setJob(r.data)
                    setCompanyName(await axios.get("http://localhost:8000/api/company/" + r.data.companyID).then(company => {return company.data.companyName}));
                });
            }
        };
        getJob()
    },[job]) // eslint-disable-line

    useEffect(() => {
        const getUser = async () => {
            if (user.length === 0){
                await GetData().then(r => {
                    setUser(r)
                });
            }
        };
        getUser()
        setCompany(user.searcherID === undefined)
    },[user])

    return (
        <div>
            <Navbar/>
            <div className='bg-lighter-grey min-h-screen justify-center flex'>
                <div className='bg-white mt-36 rounded-md px-12 py-7 space-y-3 min-w-[45%]'>
                    <p className='font-bold text-3xl flex'>{job.title}</p>
                    <p className='font-bold text-2xl flex'>{companyName}</p>
                    { !isCompany && <button className={"border-2 border-blue rounded-md pl-5 pr-5 text-white bg-blue"} onClick={() => {navigate("/apply/"+job.id)}}>Apply now</button>}
                    <div>
                        <div className={"border-b-2 border-grey flex relative"}/>
                        <p className='font-bold text-xl flex'>Details</p>
                        <div><img className={"inline ml-2"} src={suitcaseIcon} alt=''/><div className={"mt-2 ml-2 inline"}>{job.industry}</div></div>
                        <div><img className={"inline ml-2"} src={pindropIcon} alt=''/><div className={"mt-2 ml-2 inline"}>{job.location}</div></div>
                        <div><img className={"inline ml-2"} src={salaryIcon} alt=''/><div className={"mt-2 ml-2 inline"}>£{job.compensation && (job.compensation[0] + " " + job.compensation[1])} - {job.schedule}</div></div>
                        <div className={"border-b-2 border-grey flex relative mt-4"}/>
                        <p className='font-bold text-xl flex'>Requirements</p>
                        <div className={"ml-2"}>{job.requirements}</div>
                        <div className={"border-b-2 border-grey flex relative mt-4"}/>
                        <p className='font-bold text-xl flex'>Description</p>
                        <div className={"mt-2 max-w-xl ml-2"}>{job.description}</div>
                        <div className={"border-b-2 border-grey flex relative mt-4"}/>
                        <p className='font-bold text-xl flex'>Benefits</p>
                        <div className={"ml-2"}>{job.benefits}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}