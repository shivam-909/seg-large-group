import '../MyJobs/MyJobs.css'
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import PrivateRoutes from "../../Auth/PrivateRoute";
import {useNavigate, useParams} from "react-router-dom";
import {GetData} from "../../Auth/GetUser";
import ApplicantCard from "./ApplicantCard";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Applicants() {
    const navigate = useNavigate();
    const [user, setUser] = useState([])
    const [applicants, setApplicants] = useState([])
    const { id } = useParams();
    const [filter, setFilter] = useState("Applied")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setApplicants([])
        setLoading(true);
        getApplicants(filter)
    },[filter]) // eslint-disable-line

    useEffect(() => {
        const getUser = async () => {
            if (user.length === 0){
                await GetData().then(r => {
                    setUser(r)
                });
            }
        };
        getUser()
        // setCompany(user.searcherID === undefined)
    },[user]) // eslint-disable-line

    async function addCard(applicationID, pfp, name, email, status){
        await setApplicants( current => [...current, <ApplicantCard id={applicationID} pfpUrl={pfp} name={name} email={email} status={status}/>]);
    }

    async function getApplicants(filter){
        setApplicants([])
        const formData = new FormData();
        formData.append('jobListing', id);
        formData.append("status", filter)
        await axios.post("http://localhost:8000/api/application/filter", formData).then(async res => {
            let applications = res.data.applications;
            setApplicants([])
            for (let i = 0; i < applications.length; i++) {
                await axios.get("http://localhost:8000/api/searcher/" + applications[i].searcher).then(async searcher => {
                    const searcherID = new FormData();
                    searcherID.append("searcherID",searcher.data.searcherID)
                    await axios.post("http://localhost:8000/api/user/typeid", searcherID).then(usr => {
                        addCard(applications[i].id, usr.data.pfpUrl, searcher.data.firstName + " " + searcher.data.lastName, usr.data.email, applications[i].status)
                        setLoading(false);
                    })
                })
            }
        }).catch(error => {console.log(error)})
    }

    function changeFilter(type){
        setFilter(type);
    }

    return (
        <div>
            <PrivateRoutes/>
            <Navbar/>
            <div className='bg-lighter-grey min-h-screen justify-center flex'>
                <div className='bg-white mt-24 rounded-md px-12 py-7 space-y-3 min-w-[45%]'>
                    <button onClick={() => {navigate(-1)}} className={"float-left mb-5 text-3xl text-red"}><i className="fa-regular fa-circle-xmark"></i></button>
                    <p className='font-bold text-3xl flex justify-center'>Applicants</p>
                    <ul className={"border-b-2 border-grey flex relative"}>
                        <li className={"filterJobs"}><button id={"Applied"} className={"filters"} onClick={() => changeFilter("Applied")} disabled={filter==="Applied"}>Applied</button></li>
                        <li className={"filterJobs"}><button id={"Interview"} className={"filters"} onClick={() => changeFilter("Interview")} disabled={filter==="Interview"}>Interviews</button></li>
                        <li className={"filterJobs"}><button id={"Rejected"} className={"filters"} onClick={() => changeFilter("Rejected")} disabled={filter==="Rejected"}>Rejected</button></li>
                        <li className={"filterJobs"}><button id={"Rejected"} className={"filters"} onClick={() => changeFilter("Hired")} disabled={filter==="Hired"}>Hired</button></li>
                    </ul>
                    <div className='items-center justify-center flex relative w-full'>
                        {!loading ? <div className={"display-block w-full"}>
                            {applicants}
                        </div>
                            : <Loading/>}
                    </div>
                </div>
            </div>
        </div>
    );
}