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
    const [reqID, setReqID] = useState(0);
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
        validate()
    }, []) // eslint-disable-line

    async function verifyCompany(){
        if (isEdit){
            return await axios.get("http://localhost:8000/api/jobs/"+id).then(response => { return response.data.companyID === user.company?.companyID || !user.company?.companyID});
        }
        return true;
    }

    async function getDefaultValues() {
        if (isEdit) {
            await axios.get("http://localhost:8000/api/jobs/" + id).then(async response => {
                setJob(prevJob => ({
                    ...prevJob,
                    title: response.data.title,
                    industry: response.data.industry,
                    compensation: response.data.compensation,
                    location: response.data.location,
                    schedule: response.data.schedule,
                    description: response.data.description,
                    requirements: response.data.requirements,
                    benefits: response.data.benefits,
                }));
                for (let i = 0; i < response.data.requirements?.length; i++) {
                    addRequirement(response.data.requirements[i], i);
                }
                for (let i = 0; i < response.data.benefits?.length; i++) {
                    addBenefit(response.data.benefits[i], i);
                }
                console.log(response.data.compensation[1])
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
        let requirements = document.querySelectorAll("[id=Requirement]")
        if(requirements.length > 0){
            for(const req of requirements){
                formData.append('requirements[]', req.value);
            }
        }
        else{
            formData.append("requirements","")
        }

        let benefits = document.querySelectorAll("[id=Benefit]")
        if(benefits.length > 0) {
            for(const benefit of benefits){
                formData.append('benefits[]', benefit.value);
            }
        }
        else{
            formData.append("benefits","")

        }

        formData.append('title', title);
        formData.append('location', location);
        formData.append('industry', industry);
        if(!isEdit){
            formData.append('companyID', user.companyID);
        }
        formData.append('schedule', schedule);
        formData.append('compensation', compensation);
        formData.append('description', description);

        isEdit ? await axios.patch("http://localhost:8000/api/jobs/"+id, formData).then(navigate(-1)) : await axios.post("http://localhost:8000/api/jobs/add/", formData).then(navigate(-1));
    }

    async function addRequirement(defaultVal, i){
        setReqID(prev => prev+1)
        setRequirements( current => [...current, <Card id={i} defaultVal={defaultVal} name={"Requirement"}/>]);
    }

    function addBenefit(defaultVal, i){
        setBenefitID(cur => cur+1);
        setBenefits( current => [...current, <Card id={i} defaultVal={defaultVal} name={"Benefit"}/>]);
    }

    return (
        <div>
            <Navbar/>
            <div className='bg-lighter-grey min-h-screen justify-center flex'>
                <div className='bg-white mt-36 rounded-md px-12 py-7 space-y-3 min-w-[45%]'>
                    <button onClick={() => {navigate(-1)}} className={"float-left mb-5 text-3xl text-red"}><i className="fa-regular fa-circle-xmark"></i></button>
                    <p className='font-bold text-3xl flex justify-center'>{isEdit ? "Edit" : "Add"} Job</p>
                    <div className={"border-b-[#ccc] border-b-2 m-4"}/>
                    <div className='text-input space-y-4' id="profile">
                        <p><strong>Title: <span className={"text-red"}>&#42;</span> </strong> <input type="text" id="title" placeholder = "Please enter the Job Title" defaultValue={job.title}/></p>
                        <p><strong>Industry: <span className={"text-red"}>&#42;</span> </strong> <input type="text" id="industry" placeholder = "Please enter the Job Industry" defaultValue={job.industry}/></p>
                        <div>
                            <p className={"w-[75%] inline-block"}><strong>Compensation: <span className={"text-red"}>&#42;</span> </strong> <input type="number" min={0} id="compensation" placeholder = "Please enter the Compensation" defaultValue={job.compensation && job.compensation[0]}/></p>
                            <select defaultValue={job.compensation && job.compensation[1]} className={"w-[25%] h-10 border-[#ccc] border-[1px] rounded-md"}>
                                <option value={"yearly"}>/Year</option>
                                <option value={"weekly"}>/Week</option>
                                <option value={"daily"}>/Day</option>
                                <option value={"hourly"}>/Hour</option>
                            </select>
                        </div>
                        <p><strong>Schedule: <span className={"text-red"}>&#42;</span></strong>
                            <select id={"schedule"} className={"border-2 border-[#ccc] p-1 rounded-md m-2"}>
                            <option selected={job.schedule==="Full-time"} value={"Full-time"}>Full-time</option>
                            <option selected={job.schedule==="Part-time"} value={"Part-time"}>Part-time</option>
                            <option selected={job.schedule==="Contract"} value={"Contract"}>Contract</option>
                            </select>
                        </p>
                        <p><strong>Location: <span className={"text-red"}>&#42;</span> </strong> <input type="text" id="location" placeholder = "Please enter the Job Location" defaultValue={job.location}/></p>
                        <p><strong className={"float-left"}>Description: <span className={"text-red"}>&#42;</span></strong><textarea id={"description"} defaultValue={job.description} className={"border-2 border-[#ccc] rounded-md p-2 w-full h-36"}/></p>
                        <p><strong>Requirements: </strong><button className={"float-right bg-[#4b6df2] rounded-md border-2 border-dark-theme-grey text-l text-white w-8 h-8"} onClick={() => {addRequirement("", reqID)}}><i className="fa-solid fa-plus"></i></button>
                            {requirements}
                        </p>
                        <p><strong>Benefits: </strong><button className={"float-right bg-[#4b6df2] rounded-md border-2 border-dark-theme-grey text-l text-white w-8 h-8"} onClick={() => {addBenefit("", benefitID)}}><i className="fa-solid fa-plus"></i></button>
                            {benefits}
                        </p>
                        <button onClick={handleSubmit} className={"w-full border-2 border-dark-theme-grey rounded-md p-2 bg-blue text-white"}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}