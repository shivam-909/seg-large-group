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
    const [user, setUser] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const { id } = useParams();
    const [filter, setFilter] = useState("Applied");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setApplicants([]);
        setLoading(true);
        getApplicants(filter);
    },[filter]) // eslint-disable-line

    useEffect(() => {
        const getUser = async () => {
            if (user.length === 0) {
                await GetData().then(r => {
                    setUser(r);
                });
            }
        };
        getUser();
    },[user]) // eslint-disable-line

    function getApplicants(filter) {
        setApplicants([]);
        const formData = new FormData();
        formData.append('jobListing', id);
        formData.append("status", filter)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}api/application/filter`, formData).then(res => {
            let applications = res.data.applications;
            setApplicants([]);
            for (let i = 0; i < applications.length; i++) {
                axios.get(`${process.env.REACT_APP_BACKEND_URL}api/searcher/${applications[i].searcher}`).then(searcher => {
                    const searcherID = new FormData();
                    searcherID.append("searcherID",searcher.data.searcherID)
                    axios.post(`${process.env.REACT_APP_BACKEND_URL}api/user/typeid`, searcherID).then(usr => {
                        setApplicants( current => [...current, <ApplicantCard id={applications[i].id} pfpUrl={usr.data.pfpUrl} searcherID={searcher.data.searcherID} name={searcher.data.firstName + " " + searcher.data.lastName} email={usr.data.email} status={applications[i].status}/>]);
                        setLoading(false);
                    })
                })
            }
        }).catch(error => {console.log(error)})
        setLoading(false);
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
                            : <Loading className={"h-10 w-10 border-[3px] border-dark-theme-grey"}/>}
                    </div>
                </div>
            </div>
        </div>
    );
}