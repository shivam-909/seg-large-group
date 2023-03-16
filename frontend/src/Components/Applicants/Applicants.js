import '../MyJobs/MyJobs.css'
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import PrivateRoutes from "../../Auth/PrivateRoute";
import {useNavigate, useParams} from "react-router-dom";
import {GetData} from "../../Auth/GetUser";
import ApplicantCard from "./ApplicantCard";
import axios from "axios";

export default function Applicants() {
    const [isCompany, setCompany] = useState(false);
    const [user, setUser] = useState([])
    const navigate = useNavigate();
    const [applicants, setApplicants] = useState([])
    const { id } = useParams();

    useEffect(() => {
        getApplicants();
    },[])
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

    async function addCard(name, email, location){
        await setApplicants( current => [...current, <ApplicantCard name={name} email={email} location={location}/>]);
    }

    async function getApplicants(){
        const formData = new FormData();
        formData.append('jobListing', id);
        await axios.post("http://localhost:8000/api/application/filter", formData).then(async res => {
            let applications = res.data.applications;
            console.log(applications)
            for (let i = 0; i < applications.length; i++) {
                await axios.get("http://localhost:8000/api/searcher/" + applications[i].searcher).then(searcher => {addCard(searcher.data.firstName+" "+searcher.data.lastName, searcher.data.email, searcher.data.location)})
            }
        }).catch(error => {console.log(error)})
    }

    return (
        <div>
            <PrivateRoutes/>
            <Navbar/>
            <div className='bg-lighter-grey min-h-screen justify-center flex'>
                <div className='bg-white mt-36 rounded-md px-12 py-7 space-y-3 min-w-[45%]'>
                    <p className='font-bold text-3xl flex justify-center'>Applicants</p>
                        <div>
                            <div className={"border-b-2 border-grey flex relative"}/>
                        </div>
                    <div className='items-center justify-center flex relative w-full'>
                        <div className={"display-block w-full"}>
                            {applicants}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}