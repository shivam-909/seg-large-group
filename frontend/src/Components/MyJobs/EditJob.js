import './MyJobs.css'
import '../ProfilePage/ProfilePage.css'
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Card from "./Card";
import {GetData} from "../../Auth/GetUser";

export default function EditJob() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [isEdit] = useState(id !== undefined);
    const [job, setJob] = useState([])
    const [user, setUser] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [reqID, setReqID] = useState(requirements.length);
    const [benefitID, setBenefitID] = useState(benefits.length);

    useEffect(() => {
        const getUser = async () => {
            if (user.length === 0){
                await GetData().then(r => {
                    setUser(r)
                });
            }
        };
        getUser()
    },[user])

    useEffect(() => {
        validate();
    },[]) // eslint-disable-line

    async function verifyCompany(){
        if (isEdit){
            return await axios.get("http://localhost:8000/api/jobs/"+id).then(response => { return response.data.companyID === user.company?.companyID || !user.company?.companyID});
        }
        return true;
    }

    async function getDefaultValues() {
        if (isEdit) {
            await axios.get("http://localhost:8000/api/jobs/" + id).then(response => {
                setJob(prevJob => ({
                    ...prevJob,
                    title: response.data.title,
                    industry: response.data.industry,
                    compensation: response.data.compensation,
                    location: response.data.location,
                    schedule: response.data.schedule,
                    description: response.data.description,
                }));
            })
        }
    }

    async function validate(){
        if (await verifyCompany()) {
            await getDefaultValues(); // eslint-disable-line
        } else {
            navigate(-1);
        }
    }

    async function handleSubmit() {
        let title = document.getElementById("title").value;
        let schedule = document.getElementById("schedule").value;
        let location = document.getElementById("location").value;
        let industry = document.getElementById("industry").value;
        let description = document.getElementById("description").value;
        let compensation = document.getElementById("compensation").value;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('location', location);
        formData.append('industry', industry);
        formData.append('companyID', user.companyID);
        formData.append('schedule', schedule);
        formData.append('benefits', ["test"]);
        formData.append('requirements', ["test"]);
        formData.append('compensation', compensation);
        formData.append('description', description);

        isEdit ? await axios.patch("http://localhost:8000/api/jobs/"+id, formData).then(navigate(-1)) : await axios.post("http://localhost:8000/api/jobs/add/", formData).then(navigate(-1));
    }

    function addRequirement(){
        setRequirements( [...requirements, <Card id={reqID} name={"Requirement"}/>]);
        setReqID(reqID + 1);
    }

    function addBenefit(){
        setBenefits( [...benefits, <Card id={benefitID} name={"Benefit"}/>]);
        setBenefitID(benefitID + 1);
    }

    return (
        <div>
            <Navbar/>
            <div className='bg-lighter-grey min-h-screen justify-center flex'>
                <div className='bg-white mt-36 rounded-md px-12 py-7 space-y-3 min-w-[45%]'>
                    <button onClick={() => {navigate(-1)}} className={"float-left mb-5 text-3xl text-red"}><i className="fa-solid fa-circle-chevron-left"></i></button>
                    <p className='font-bold text-3xl flex justify-center'>{isEdit ? "Edit" : "Add"} Job</p>
                    <div className={"border-b-[#ccc] border-b-2 m-4"}/>
                    <div className='text-input space-y-4' id="profile">
                        <p><strong>Title: <span className={"text-red"}>&#42;</span> </strong> <input type="text" id="title" placeholder = "Please enter the Job Title" defaultValue={job.title}/></p>
                        <p><strong>Industry: <span className={"text-red"}>&#42;</span> </strong> <input type="text" id="industry" placeholder = "Please enter the Job Industry" defaultValue={job.industry}/></p>
                        <p><strong>Compensation: <span className={"text-red"}>&#42;</span> </strong> <input type="number" min={0} id="compensation" placeholder = "Please enter the Compensation" defaultValue={job.compensation}/></p>
                        <p><strong>Schedule: <span className={"text-red"}>&#42;</span></strong>
                            <select id={"schedule"} className={"border-2 border-[#ccc] p-1 rounded-md m-2"}>
                            <option selected={job.schedule==="Full-time"} value={"Full-time"}>Full-time</option>
                            <option selected={job.schedule==="Part-time"} value={"Part-time"}>Part-time</option>
                            <option selected={job.schedule==="Contract"} value={"Contract"}>Contract</option>
                            </select>
                        </p>
                        <p><strong>Location: <span className={"text-red"}>&#42;</span> </strong> <input type="text" id="location" placeholder = "Please enter the Job Location" defaultValue={job.location}/></p>
                        <p><strong className={"float-left"}>Description: <span className={"text-red"}>&#42;</span></strong><textarea id={"description"} defaultValue={job.description} className={"border-2 border-[#ccc] rounded-md p-2 w-full h-36"}/></p>
                        <p><strong>Requirements: </strong><button className={"float-right bg-[#4b6df2] rounded-md border-2 border-dark-theme-grey text-l text-white w-8 h-8"} onClick={addRequirement}><i className="fa-solid fa-plus"></i></button>
                            {requirements}
                        </p>
                        <p><strong>Benefits: </strong><button className={"float-right bg-[#4b6df2] rounded-md border-2 border-dark-theme-grey text-l text-white w-8 h-8"} onClick={addBenefit}><i className="fa-solid fa-plus"></i></button>
                            {benefits}
                        </p>
                        <button onClick={handleSubmit} className={"w-full border-2 border-dark-theme-grey rounded-md p-2 bg-blue text-white"}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}