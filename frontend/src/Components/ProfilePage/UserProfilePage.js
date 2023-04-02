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
import {Document, Page} from "react-pdf/dist/cjs/entry.webpack";

function UserProfilePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profile, setProfile] = useState({});
    const [user, setUser] = useState([]);
    const [isEditing, setIsEditing]= useState(false);
    const [isCompany, setCompany] = useState(false)
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProfile = async () => {
            if (Object.keys(profile).length === 0) {
                const token = localStorage.getItem('access');
                await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user`, {headers: {Authorization: `Bearer ${token}`}})
                    .then(r => {
                        setProfile(r.data)
                    });
                setLoading(false);
            }
        };
        getProfile()
        setCompany(profile.searcherID === undefined)
    },[profile]) // eslint-disable-line

    useEffect(() => {
        toggleKeys(false);
        const getUser = async () => {
            if (user.length === 0) {
                await GetData().then(r => {
                    setUser(r);
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

            const token = localStorage.getItem('access');
            if (token) {
                await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/users`, formData, {headers: {Authorization: `Bearer ${token}`}})
                    .then(navigate(0))
            }
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

            const newUserData = new FormData();
            newUserData.append('firstName', firstName);
            newUserData.append('lastName', lastName);
            newUserData.append('location', location);

            let keyInputs = document.querySelectorAll("[id^=skillInput]");
            let durationsInputs = document.querySelectorAll("[id=skillDuration]");
            let intervalInputs = document.querySelectorAll("[id=skillInterval]");
            for(let i = 0; i < keyInputs.length; i++) {
                newUserData.append("skills[]",keyInputs[i].value+","+durationsInputs[i].value+","+intervalInputs[i].value)
            }

            let subjects = document.querySelectorAll("[id^=subject]");
            let grades = document.querySelectorAll("[id^=grade]");
            let courses = document.querySelectorAll("[id=course]");
            for(let i = 0; i < subjects.length; i++) {
                newUserData.append("qualifications[]",subjects[i].value+","+courses[i].value+","+grades[i].value)
            }

            const token = localStorage.getItem('access');
            if (token) {
                await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/users`, newUserData, {headers: {Authorization: `Bearer ${token}`}})
                    .then(navigate(0))
            }
        }
    }
    function validateEducation(){
        let subjects = document.querySelectorAll("[id^=subject]");
        let grades = document.querySelectorAll("[id^=grade]");
        for(let i = 0; i < subjects.length; i++) {
            if (subjects[i].value === "" || subjects[i].value.includes(",") || grades[i].value.includes(",")){
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
            const formData = new FormData();
            formData.append("file", files[0])
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/storage/cv/${user.userID}`, formData).then(async res => {
                const userPatch = new FormData();
                userPatch.append("cv[]", file.name)
                userPatch.append("cv[]", res.data.URL)
                const token = localStorage.getItem('access');
                if (token) {
                    await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/users`, userPatch, {headers: {Authorization: `Bearer ${token}`}}).then(r => {
                        const searcher = {...profile.searcher, cv:[file.name, file]}
                        const newProfile = {...profile, searcher: searcher}
                        setProfile(newProfile)
                    }).catch(err => console.log(err));
                }
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
        else {
            const formData = new FormData();
            formData.append("file", files[0])
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/storage/pfp/${user.userID}`, formData)
                .then(async res => {
                    const userPatch = new FormData();
                    userPatch.append("pfpUrl", res.data.URL)
                    const token = localStorage.getItem('access');
                    if (token) {
                        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/users`, userPatch, {headers: {Authorization: `Bearer ${token}`}}).then(r => {
                            let fr = new FileReader();
                            fr.onload = function (e) {
                                document.getElementById("pfp").src = e.target.result;
                            }
                            fr.readAsDataURL(files[0])
                            // setProfile(oldProfile)
                            // setProfile(newProfile)
                        }).catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
        }
    }

  return (
      <div>
          <Navbar data-testid = 'navbar'/>
        <div className='bg-lighter-grey min-h-screen items-center justify-center flex'>
            <div className='bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3 mt-24 min-w-[40%]' data-testid='loading'>
                {!loading ? <div>
                    <div className={"grid grid-cols-2 border-[1px] border-[#ccc] rounded-md shadow-md"}>
                    <div>
                        {isCompany ?
                            <p className={"ml-6 mt-2 text-2xl font-bold"}>{profile.company?.companyName}</p>
                        : <p className={"ml-6 mt-2 text-2xl font-bold"}>{profile.searcher?.firstName + " " + profile.searcher?.lastName}</p> }
                        <p className={"ml-6 text-l"}>{profile.email + " "}</p>
                        <p className={"ml-6 text-l"}>{profile.location + " "}</p>
                    </div>
                    <div className={"justify-items-end"}>
                    <img id={"pfp"} className={"rounded-full float-right"} src={profile.pfpUrl} alt="Avatar" height={"100"} width={"100"}/>
                        <input id={"pfpUpload"} type="file" name="myImage" accept="image/png, image/jpeg" hidden onChange={updatePfp}/>
                        {isEditing && <label for={"pfpUpload"} className={"float-right"}><i className="fa-solid fa-pen-to-square pr-2"></i></label>}
                    </div>
                </div>
            <div className='text-input'>
                    <div className={"border-[1px] border-[#ccc] rounded-md shadow-md p-2"}>
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
                    </div>
                    {isCompany ? <div/>
                        : <div className={"border-[1px] border-[#ccc] rounded-md shadow-md mt-4"}>
                            <p><strong><u>Qualifications</u></strong></p>
                            <Skills isEditing={isEditing} profile={profile} data-testid='skills'/>
                            <Education isEditing={isEditing} profile={profile}/>
                                {profile.searcher?.cv ?
                                        <div>
                                            <div onClick={() => {window.open(profile.searcher?.cv[1],"_blank").focus()}}
                                                className='border rounded-md border-dark-theme-grey p-2 space-y-5 inline-block cursor-pointer'>
                                                <div className='flex justify-between items-center pt-2'>
                                                    <p>{profile.searcher?.cv[0]}</p>
                                                </div>
                                                <Document file={profile.searcher?.cv[1]}>
                                                    <Page pageNumber={1} className='border rounded-md overflow-ellipsis'/>
                                                </Document>
                                            </div>
                                            {isEditing && <div className='pt-5'>
                                                <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white'>
                                                    <input id="upload" type="file" accept=".pdf" onChange={updateCV}
                                                           className='hidden'/>
                                                    <label htmlFor="upload" className='cursor-pointer'><i
                                                        className="fa-solid fa-upload"></i> Replace</label>
                                                </button>
                                            </div>}
                                        </div>
                                        :
                                        <div>
                                            <p className='pb-5'>No CV.</p>
                                            <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white'>
                                                <input id="upload" type="file" accept=".pdf" onChange={updateCV} className='hidden'/>
                                                <label htmlFor="upload" className='cursor-pointer'><i className="fa-solid fa-upload"></i> Upload</label>
                                            </button>
                                        </div>
                                }
                        </div>
                    }
                <ErrorBox message={"Please complete all required fields."}/>
            </div>
                {isOwner && !isEditing && <button className="border-2 border-dark-theme-grey bg-dark-theme-grey text-white font-bold rounded-md m-2 p-2 w-full" onClick={EditOnClick} ><i className="fa-solid fa-pen-to-square pr-2"></i>Edit</button>}
                {isOwner && isEditing && <button className="border-2 bg-[#375efa] text-white font-bold rounded-md m-2 p-2 w-full hover:bg-[#204cfa]" onClick={saveProfile}><i className="fa-solid fa-floppy-disk pr-1"></i> Save</button>}
                </div>: <div className={"flex justify-center"}><Loading className={"h-10 w-10 border-[3px] border-dark-theme-grey"}/></div>}
                </div>
        </div>
      </div>

  );
}

export default UserProfilePage;
