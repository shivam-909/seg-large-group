import './MyJobs.css'
import '../ProfilePage/ProfilePage.css'
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Card from "./Card";
import {GetData} from "../../Auth/GetUser";
import {setVisible} from "../Validation/validate";
import ErrorBox from "../ErrorBox/ErrorBox";
import SkillCard from "../ProfilePage/SkillCard";
import Loading from "../Loading/Loading";
import {Location} from "../ProfilePage/Location";
import EducationDropdown from "../ProfilePage/EducationDropdown";
import QuestionCard from "./QuestionCard";
import RefreshToken from "../../Auth/RefreshToken";
window.Buffer = window.Buffer || require("buffer").Buffer;

export default function EditJob() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [isEdit] = useState(id !== undefined);
    const [job, setJob] = useState([])
    const [user, setUser] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [education, setEducation] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [eduID, setEduID] = useState(0);
    const [reqID, setReqID] = useState(0);
    const [benefitID, setBenefitID] = useState(0);
    const [questionID, setQuestionID] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            await RefreshToken();
            if (user.length === 0){
                await GetData().then(r => {
                    setUser(r)
                });
            }
        };
        getUser()
    },[user])

    useEffect(() => {
        setLoading(true);
        validate().then(() => {setLoading(false)})
    }, []) // eslint-disable-line

    async function verifyCompany(){
        if (isEdit){
            await RefreshToken();
            return await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/jobs/${id}`).then(response => {return response.data.companyID === user.company?.companyID || !user.company?.companyID});
        }
        return true;
    }

    async function getDefaultValues() {
        if (isEdit) {
            await RefreshToken();
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/jobs/${id}`).then(async response => {
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
                    questions: response.data.screeningQuestions,
                    type: response.data.type,
                    requireCoverLetter: response.data.coverLetterRequired,
                }));
                for (let i = 0; i < response.data.requirements?.length; i++) {
                    addRequirement(response.data.requirements[i], i);
                }
                for (let i = 0; i < response.data.benefits?.length; i++) {
                    addBenefit(response.data.benefits[i], i);
                }
                for (let i = 0; i < response.data.qualifications?.length; i++) {
                    let qual = response.data.qualifications[i].split(",")
                    addEducation(i,qual[0], qual[1], qual[2]);
                }
                let x = 0;
                for (const question in response.data.screeningQuestions){
                    addQuestion(question, response.data.screeningQuestions[question],x)
                    setQuestionID(x);
                    x++;
                }
            })
        }
    }


    async function validate(){
        setVisible("descError", false)
        if (await verifyCompany()) {
            if(job.length === 0){
                await getDefaultValues(); // eslint-disable-line
            }
        } else {
            navigate(-1);
        }
    }

    async function handleSubmit() {
        let title = document.getElementById("title").value;
        let location = document.getElementById("locationInput").value;
        let industry = document.getElementById("industry").value;
        let description = document.getElementById("description").value;
        let compensation = document.getElementById("compensation").value;
        let compensationRate = document.getElementById("compensationRate").value;
        let coverLetterRequired = document.querySelector('input[name="requireCoverLetter"]:checked').value;
        let fullTime = document.getElementById("fullTime").checked;
        let partTime = document.getElementById("partTime").checked;
        let internship = document.getElementById("internship").checked;
        let apprenticeship = document.getElementById("apprenticeship").checked;
        let contract = document.getElementById("contract").checked;
        let inoffice = document.getElementById("inoffice").checked;
        let hybrid = document.getElementById("hybrid").checked;
        let remote = document.getElementById("remote").checked;

        if (title === "" || location === "" || industry === "" || description === "" || description.length > 10000 || compensation === "" || (!fullTime && !apprenticeship && !partTime && !internship && !contract) || (!inoffice && !hybrid && !remote)){
            setVisible("errorBox", true);
            return;
        }
        const jobListing = new FormData();
        let subjects = document.querySelectorAll("[id^=subject]")
        let qualifications = document.querySelectorAll("[id^=course]")
        let grades = document.querySelectorAll("[id^=grade]")

        if(qualifications.length > 0){
            for(let i = 0; i < subjects.length; i++){
                if (subjects[i].value === ""){
                    setVisible("errorBox", true)
                    return;
                }
                jobListing.append('qualifications[]', subjects[i].value + "," + qualifications[i].value + (grades[i] && "," + grades[i].value));
            }
        }
        else{
            jobListing.append("qualifications","")
        }

        let benefits = document.querySelectorAll("[id=Benefit]")
        if(benefits.length > 0) {
            for(const benefit of benefits){
                if (benefit.value === ""){
                    setVisible("errorBox", true);
                    return;
                }
                jobListing.append('benefits[]', benefit.value);
            }
        }
        else{
            jobListing.append("benefits","")
        }

        let skills = document.querySelectorAll("[id^=skillInput]")
        let skillDurations = document.querySelectorAll("[id=skillDuration]")
        let skillInterval = document.querySelectorAll("[id=skillInterval]")
        if(skills.length > 0) {
            for(let i = 0; i < skills.length; i++){
                if (skills[i].value === "" || skills[i].value.includes(",")){
                    setVisible("errorBox", true);
                    return;
                }
                jobListing.append('requirements[]', skills[i].value.toString()+","+skillDurations[i].value.toString()+","+skillInterval[i].value.toString());
            }
        }
        else{
            jobListing.append("requirements","")
        }

        let questions = document.querySelectorAll("[id=Question]")
        let required = document.querySelectorAll("[id=QuestionRequired]")
        let screeningQuestions = []
        if (questions.length > 0) {
            for(let i = 0; i < questions.length; i++){
                if (questions[i].value === ""){
                    setVisible("errorBox", true);
                    return;
                }
                const screeningQuestion = {
                        [questions[i].value]: required[i].checked
                    }
                screeningQuestions.push(screeningQuestion)
            }
            let encoded = Buffer.from(JSON.stringify(screeningQuestions)).toString('base64');
            jobListing.append("screeningQuestions",encoded)
        }
        else{
            jobListing.append("screeningQuestions","")
        }

        fullTime && jobListing.append("schedule[]","Full-time")
        partTime && jobListing.append("schedule[]","Part-time")
        internship && jobListing.append("schedule[]","Internship")
        contract && jobListing.append("schedule[]","Contract")
        apprenticeship && jobListing.append("schedule[]","Apprenticeship")

        inoffice && jobListing.append("type[]","In-Office")
        hybrid && jobListing.append("type[]","Hybrid")
        remote && jobListing.append("type[]","Remote")


        jobListing.append('title', title);
        jobListing.append('location', location);
        jobListing.append('industry', industry);
        jobListing.append('compensation', compensation);
        jobListing.append('compensation', compensationRate);
        jobListing.append('description', description);
        jobListing.append('coverLetterRequired', coverLetterRequired);

        await RefreshToken();
        isEdit ? await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/jobs/${id}`, jobListing).then(navigate(-1)) :
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/jobs/`, jobListing, {headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`}}).then(navigate(-1));
    }

    function addRequirement(defaultVal, i){
        let vals = defaultVal.split(",")
        setReqID(prev => prev+1)
        setRequirements(current => [...current, <SkillCard id={i} skill={vals[0]} duration={vals[1]} interval={vals[2]}/>]);
    }

    function addEducation(i, subject, qualification, grade){
        setEduID(prev => prev+1)
        setEducation( current => [...current, <EducationDropdown id={i} subject={subject} qualification={qualification} grade={grade}/> ]);
    }

    function addBenefit(defaultVal, i){
        setBenefitID(cur => cur+1);
        setBenefits( current => [...current, <Card id={i} defaultVal={defaultVal} name={"Benefit"}/>]);
    }
    function addQuestion(defaultVal, defaultChecked , i){
        setQuestionID(cur => cur+1);
        setQuestions( current => [...current, <QuestionCard id={i} defaultVal={defaultVal} defaultChecked={defaultChecked} name={"Question"}/>]);
    }

    function validateDescription(){
        let val = document.getElementById("description").value.length
        if(val > 10000){
            setVisible("descError", true)
        }
        else{
            setVisible("descError", false)
        }
    }

    return (
        <div>
            <Navbar/>
            <div className='bg-lighter-grey min-h-screen justify-center flex'>
                <div className='bg-white mt-36 rounded-md px-12 py-7 space-y-3 min-w-[55%]'>
                    <button onClick={() => {navigate(-1)}} className={"float-left mb-5 text-3xl text-red"}><i className="fa-regular fa-circle-xmark"></i></button>
                    <p className='font-bold text-3xl flex justify-center'>{isEdit ? "Edit" : "Add"} Job</p>
                    <div className={"border-b-[#ccc] border-b-2 m-4"}/>
                    {!loading ? <div className='text-input space-y-4' id="profile">
                        <p><strong>Title: <span className={"text-red"}>&#42;</span> </strong> <input type="text" id="title" placeholder = "Please enter the Job Title" defaultValue={job.title}/></p>
                        <p><strong>Industry: <span className={"text-red"}>&#42;</span> </strong> <input type="text" id="industry" placeholder = "Please enter the Job Industry" defaultValue={job.industry}/></p>
                        <div>
                            <p className={"w-[75%] inline-block"}><strong>Compensation: <span className={"text-red"}>&#42;</span> </strong> <input type="number" min={0} id="compensation" placeholder = "Please enter the Compensation" defaultValue={job.compensation && job.compensation[0]}/></p>
                            <select id={"compensationRate"} defaultValue={job.compensation?.at(1)} className={"w-[25%] h-10 border-[#ccc] border-[1px] rounded-md"}>
                                <option value={"year"}>/Year</option>
                                <option value={"week"}>/Week</option>
                                <option value={"day"}>/Day</option>
                                <option value={"hour"}>/Hour</option>
                            </select>
                        </div>
                        <p><strong>Schedule: <span className={"text-red"}>&#42;</span></strong></p>
                        <div>
                            <label><input type="checkbox" id={"fullTime"} defaultChecked={job.schedule?.includes("Full-time")} value={"Full-time"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md m-2 select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Full-time</span></label>
                            <label><input type="checkbox" id={"partTime"} defaultChecked={job.schedule?.includes("Part-time")} value={"Part-time"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md m-2 select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Part-time</span></label>
                            <label><input type="checkbox" id={"internship"} defaultChecked={job.schedule?.includes("Internship")} value={"Internship"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md m-2 select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Internship</span></label>
                            <label><input type="checkbox" id={"apprenticeship"} defaultChecked={job.schedule?.includes("Apprenticeship")} value={"Apprenticeship"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md m-2 select-none w-full peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Apprenticeship</span></label>
                            <label><input type="checkbox" id={"contract"} defaultChecked={job.schedule?.includes("Contract")} value={"Contract"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md m-2 select-none w-full peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Contract</span></label>
                        </div>
                        <p><strong>Workplace: <span className={"text-red"}>&#42;</span></strong></p>
                        <div>
                            <label><input type="checkbox" id={"inoffice"} defaultChecked={job.type?.includes("In-Office")} value={"In-Office"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md m-2 select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>In-Office</span></label>
                            <label><input type="checkbox" id={"hybrid"} defaultChecked={job.type?.includes("Hybrid")} value={"Hybrid"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md m-2 select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Hybrid</span></label>
                            <label><input type="checkbox" id={"remote"} defaultChecked={job.type?.includes("Remote")} value={"Remote"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md m-2 select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Remote</span></label>
                        </div>
                        <p><strong>Location: <span className={"text-red"}>&#42;</span> </strong><Location defaultLocation={job.location} disabled={false}/></p>
                        <p><strong className={"float-left"}>Description: <span className={"text-red"}>&#42;</span></strong><textarea onChange={() => {validateDescription()}} id={"description"} defaultValue={job.description} className={"border-2 border-[#ccc] rounded-md p-2 w-full h-48"}/><div id={"descError"} className={"invisible top-0 absolute"}><div className={"text-red"}>Description too long.</div></div></p>
                        <p><strong>Requirements: </strong><button className={"float-right bg-dark-theme-grey rounded-md border-2 border-dark-theme-grey text-l text-white w-8 h-8"} onClick={() => {addRequirement("", reqID)}}><i className="fa-solid fa-plus"></i></button>
                            {requirements}
                        </p>
                        <p><strong>Education: </strong><button className={"float-right bg-dark-theme-grey rounded-md border-2 border-dark-theme-grey text-lg text-white w-8 h-8"} onClick={() => {addEducation(eduID, "", "", "")}}><i className="fa-solid fa-plus"></i></button>
                            {education}
                        </p>
                        <p><strong>Benefits: </strong><button className={"float-right bg-dark-theme-grey rounded-md border-2 border-dark-theme-grey text-lg text-white w-8 h-8"} onClick={() => {addBenefit("", benefitID)}}><i className="fa-solid fa-plus"></i></button>
                            {benefits}
                        </p>
                        <p><strong>Screening Questions: </strong><button className={"float-right bg-dark-theme-grey rounded-md border-2 border-dark-theme-grey text-lg text-white w-8 h-8"} onClick={() => {addQuestion("",false, questionID)}}><i className="fa-solid fa-plus"></i></button>
                            {questions}
                        </p>
                        <p><strong className={"pr-2 inline-block"}>Require Cover Letter?: </strong><div className='float-right min-w-fit mt-4'>
                            <label><input type="radio" name={'requireCoverLetter'} value={false} className={"peer sr-only"} defaultChecked={!job.requireCoverLetter}/><span className={"border-2 border-[#ccc] px-4 py-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>No</span></label>
                            <label><input type="radio" name={'requireCoverLetter'} value={true} className={"peer sr-only"} defaultChecked={job.requireCoverLetter}/><span className={"border-2 border-[#ccc] px-4 py-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Yes</span></label>
                        </div></p>
                        <ErrorBox message={"Please complete all fields"}/>
                        <button onClick={handleSubmit} className={"w-full border-2 border-dark-theme-grey rounded-md p-2 bg-dark-theme-grey text-white"}>Submit</button>
                    </div> : <div className={"justify-center flex"}><Loading className={"h-10 w-10 border-[3px] border-dark-theme-grey"}/></div>}
                </div>
            </div>
        </div>
    );
}