import './MyJobs.css'
import '../ProfilePage/ProfilePage.css'
import {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import PrivateRoutes from "../../Auth/PrivateRoute";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

export default function EditJob() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [isEdit] = useState(id !== undefined);
    const [job, setJob] = useState([])

    async function checkIsCompany(){
        const token = localStorage.getItem("access");
        const userID = await axios.post('http://localhost:8000/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}}).then(response => {return response.data})
        const searcherID = await axios.get("http://localhost:8000/user/"+userID).then(response => {return response.data.searcherID});
         return searcherID === undefined
    }

    async function verifyCompany(){
        if (isEdit){
            const token = localStorage.getItem("access");
            const userID = await axios.post('http://localhost:8000/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}}).then(response => {return response.data})
            const companyID = await axios.get("http://localhost:8000/user/"+userID).then(response => {return response.data.companyID});
            return await axios.get("http://localhost:8000/jobs/"+id).then(response => {return response.data.companyID === companyID});
        }
        return true;
    }

    async function getDefaultValues() {
        if (isEdit) {
            await axios.get("http://localhost:8000/jobs/" + id).then(response => {
                setJob(prevJob => ({
                    ...prevJob,
                    title: response.data.title,
                    location: response.data.location,
                    schedule: response.data.schedule,
                    type: response.data.type,
                    description: response.data.description,
                }));
            })
        }
    }

    async function validate(){
        if (await checkIsCompany() && await verifyCompany()) {
            await getDefaultValues(); // eslint-disable-line
        } else {
            navigate(-1);
        }
    }

    useEffect(() => {
        validate();
    },[])

    function handleSubmit() {
        let title = document.getElementById("title").value;
        let schedule = document.getElementById("schedule").value;
        let location = document.getElementById("location").value;
        let type = document.getElementById("type").value;
        let description = document.getElementById("description").value;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('location', location);
        formData.append('type', type);
        formData.append('schedule', schedule);
        formData.append('description', description);

        axios.patch("http://localhost:8000/jobs/"+id, formData);
    }
    return (
        <div>
            <PrivateRoutes/>
            <Navbar/>
            <div className='bg-lighter-grey min-h-screen justify-center flex'>
                <div className='bg-white mt-36 rounded-md px-12 py-7 space-y-3 min-w-[45%]'>
                    <p className='font-bold text-3xl flex justify-center'>{isEdit ? "Edit" : "Add"} Job</p>
                    <div className={"border-b-[#ccc] border-b-2 m-4"}/>
                    <div className={"grid space-y-10"}>
                    <label>Title: <input id={"title"} type="text" defaultValue={job.title}/></label>
                    <label>Type: <input id={"type"} type="text" defaultValue={job.type} /></label>
                    <label>Schedule: <select id={"schedule"}>
                        <option selected={job.schedule==="Full-time"} value={"Full-time"}>Full-time</option>
                        <option selected={job.schedule==="Part-time"} value={"Part-time"}>Part-time</option>
                        <option selected={job.schedule==="Contract"} value={"Contract"}>Contract</option>
                    </select>
                    </label>
                    <label>Location: <input id={"location"} type="text" defaultValue={job.location}/></label>
                    <label>Description: <textarea id={"description"} defaultValue={job.description} /></label>
                        <div className={"justify-center flex space-x-4"}>
                        <button onClick={() => {navigate(-1)}} className={"cancel-btn"}>Cancel</button>
                        <button onClick={handleSubmit} className={"save-btn"}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}