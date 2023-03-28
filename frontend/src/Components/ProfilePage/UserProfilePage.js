import './ProfilePage.css';
import React, {useState, useEffect} from 'react';
import Navbar from "../Navbar/Navbar";
import Skills from "./Skills";
import {setVisible} from "../Validation/validate";
import ErrorBox from "../ErrorBox/ErrorBox";
import Education from "./Education";
import {GetData} from "../../Auth/GetUser";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading/Loading";
import {Location} from "./Location";

function UserProfilePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profile, setProfile] = useState([]);
    const [user, setUser] = useState([]);
    const [isEditing, setIsEditing]= useState(false);
    const [isCompany, setCompany] = useState(false)
    const [fileName, setFile]= useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProfile = async () => {
            if (profile.length === 0){
                await axios.get("http://localhost:8000/api/user/"+id).then(r => {
                    setProfile(r.data)
                    setFile(r.data.searcher?.cv[0])
                });
                setLoading(false)
            }
        };
        getProfile()
        setCompany(profile.searcherID === undefined)
    },[profile]) // eslint-disable-line

    useEffect(() => {
        toggleKeys(false)
        const getUser = async () => {
            if (user.length === 0){
                await GetData().then(r => {
                    setUser(r)
                });
            }
        };
        getUser()
        checkIsOwner();
    },[user]) // eslint-disable-line

    async function checkIsOwner(){
        setIsOwner(user.userID === id);
    }

    function EditOnClick(){
      setIsEditing(true);
        toggleKeys(true);
    }

    function saveProfile(){
        if(isCompany){
            saveCompany()
        }
        else{
            saveSearcher()
        }
    }

    async function saveCompany() {
        let companyName = document.getElementById("firstName")?.value;
        let location = document.getElementById("locationInput").value;

        if (companyName === "") {
            setVisible("errorBox", true)
        }
        else {
            setIsEditing(false);
            toggleKeys(false);
            setVisible("errorBox", false);

            const formData = new FormData();
            formData.append('companyName', companyName);
            formData.append('location', location);

            await axios.patch("http://localhost:8000/api/users/" + id, formData).then(navigate(0))
        }
    }

    async function saveSearcher() {
        let firstName = document.getElementById("firstName")?.value;
        let lastName = document.getElementById("lastName")?.value;
        let location = document.getElementById("locationInput").value;

        if (firstName === "" || lastName === "" || !validateSkills() || !validateEducation()) {
            setVisible("errorBox", true)
        }
        else {
            setIsEditing(false);
            toggleKeys(false);
            setVisible("errorBox", false);

            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('location', location);

            await axios.patch("http://localhost:8000/api/users/" + id, formData).then(navigate(0))
        }
    }
    function validateEducation(){
        let subjects = document.querySelectorAll("[id^=subject]");
        let grades = document.querySelectorAll("[id^=grade]");
        let durations = document.querySelectorAll("[id=educationDuration]");
        for(let i = 0; i < subjects.length; i++) {
            if (subjects[i].value === "" || grades[i].value === "" || durations[i].value === "" || subjects[i].value.includes(",") || grades[i].value.includes(",")){
                return false;
            }
        }
        return true;
    }
    function validateSkills(){
        let keyInputs = document.querySelectorAll("[id^=skillInput]");
        let durationsInputs = document.querySelectorAll("[id=skillDuration]");
        for(let i = 0; i < keyInputs.length; i++) {
            if (keyInputs[i].value === "" || durationsInputs[i].value === "" || keyInputs[i].value.includes(",")){
                return false;
            }
        }
        return true;
    }
    function toggleKeys(flag){
        let inputs = document.querySelectorAll('[editable="true"]')
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = !flag;
        }
    }
    async function updateCV(event) {
        const {files} = event.target;
        const file = event.target.files[0];
        const fileType = file['type'];
        const validImageTypes = ['application/pdf'];
        if (!validImageTypes.includes(fileType)) {
            // TODO: Display error if not an image
        } else {
            setFile(file.name);
            // TODO: Add Backend Update
            const formData = new FormData();
            formData.append("file", files[0])
            await axios.post("http://localhost:8000/api/storage/cv/" + user.userID, formData).then(async res => {
                const userPatch = new FormData();
                console.log(file.name, res.data.URL)
                userPatch.append("cv[]", file.name)
                userPatch.append("cv[]", res.data.URL)
                await axios.patch("http://localhost:8000/api/users/" + id, userPatch)
            })
        }
    }
    async function updatePfp(event){
        const{files} = event.target;
        const  fileType = files[0]['type'];
        const validImageTypes = ['image/jpeg', 'image/png'];
        if (!validImageTypes.includes(fileType)) {
            // TODO: Display error if not an image
        }
        else{
            const formData = new FormData();
            formData.append("file", files[0])
            await axios.post("http://localhost:8000/api/storage/pfp/"+user.userID, formData).then(async res => {
                const userPatch = new FormData();
                userPatch.append("pfpUrl", res.data.URL)
                await axios.patch("http://localhost:8000/api/users/" + user.userID, userPatch);
            })
        }
    }

  return (
      <div>
          <Navbar/>
        <div className='bg-lighter-grey min-h-screen items-center justify-center flex'>
            <div className='bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3 mt-24 max-w-lg min-w-[40%]'>
                {!loading ? <div>
                <h1 className='font-bold text-3xl flex justify-center'>{isCompany ? profile.company?.companyName: profile.searcher?.firstName +" "+ profile.searcher?.lastName}'s Profile </h1>
                <div className={"grid grid-cols-2 gap-10"}>
                    <div>
                        {isCompany ?
                            <p className={"ml-6 mt-2 text-2xl font-bold"}>{profile.company?.companyName}</p>
                        : <p className={"ml-6 mt-2 text-2xl font-bold"}>{profile.searcher?.firstName + " " + profile.searcher?.lastName}</p> }
                        <p className={"ml-6 text-l"}>{profile.email + " "}</p>
                        <p className={"ml-6 text-l"}>{profile.location + " "}</p>
                    </div>
                    <div className={"justify-items-end"}>
                    <img className={"rounded-full float-right"} src={profile.pfpUrl} alt="Avatar" height={"100"} width={"100"}/>
                        <input id={"pfpUpload"} type="file" name="myImage" accept="image/png, image/jpeg" hidden onChange={updatePfp}/>
                        {isEditing && <label for={"pfpUpload"} className={"float-right"}><i className="fa-solid fa-pen-to-square pr-2"></i></label>}
                    </div>
                </div>
            <div className='text-input' id="profile">
                <p><strong><u>Contact Information</u></strong></p>
                    {isCompany ?
                        <p><strong>Company Name: <span className={"text-red"}>&#42;</span> </strong> <input type="text" id="firstName" placeholder = "Please enter your First Name" defaultValue= {profile.company?.companyName} disabled={!isEditing}/></p>
                        :
                        <div>
                            <p><strong>First Name: <span className={"text-red"}>&#42;</span> </strong> <input type="text" id="firstName" placeholder = "Please enter your First Name" defaultValue= {profile.searcher?.firstName} disabled={!isEditing}/></p>
                            <p><strong>Last Name: <span className={"text-red"}>&#42;</span></strong> <input type="text" id="lastName" placeholder = "Please enter your Last Name" defaultValue= {profile.searcher?.lastName} disabled={!isEditing}/></p> </div>
                    }
                    <p><strong>Email: </strong> <input type="email" id="email" placeholder = "Email" defaultValue= {profile.email} disabled/></p>
                    <p><strong>Location: </strong> <Location defaultLocation={profile.location} disabled={!isEditing}/></p>
                    {isCompany ? <div/>
                        : <div>
                            <p><strong><br/><u>Qualifications</u></strong></p>
                            <Skills isEditing={isEditing} profile={profile}/>
                            <Education isEditing={isEditing} profile={profile}/>
                            {!isEditing ?
                                <p className={"mt-4 mb-2"}><strong>CV: </strong>{" "} {profile.searcher?.cv ? (<a href={profile.searcher?.cv[1]} target={"_blank"} rel={"noreferrer"} id= 'Cv' download><u>{fileName}</u></a> ):("No CV")}</p>
                                :<div><p className={"mt-4 mb-2"}><strong>CV:</strong>  <input type="file" id="Cv" accept= ".pdf"  onChange={updateCV}/></p></div>}
                        </div>
                    }
                <ErrorBox message={"Please complete all required fields."}/>
            </div>
                {isOwner && !isEditing && <button className="border-2 border-dark-theme-grey bg-[#ccc] rounded-md m-2 p-2 text-black" onClick={EditOnClick} ><i className="fa-solid fa-pen-to-square pr-2"></i>Edit</button>}
                {isOwner && isEditing && <button className="save-btn" onClick={saveProfile}><i className="fa-solid fa-floppy-disk pr-1"></i> Save</button>}
                </div>: <div className={"flex justify-center"}><Loading/></div>}
                </div>
        </div>
      </div>

  );
}

export default UserProfilePage;
