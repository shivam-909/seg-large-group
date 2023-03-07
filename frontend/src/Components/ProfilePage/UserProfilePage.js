import './ProfilePage.css';
import React, {useState, useEffect} from 'react';
import Navbar from "../Navbar/Navbar";
import Skills from "./Skills";
import {setVisible} from "../Validation/validate";
import ErrorBox from "../ErrorBox/ErrorBox";
import Education from "./Education";
import axios from "axios";
import KeyValueBox from "./KeyValueBox";
function UserProfilePage() {
    useEffect(() => {
        getProfileData();
    },[])
    async function getProfileData(){
        const token = localStorage.getItem("access");
        const userID = await axios.post('http://localhost:8000/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}}).then(response => { return response.data});
        axios.get("http://localhost:8000/user/"+userID).then(response => {
            setMyProfile(prevProfile => ({
                ...prevProfile,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
            }));
        })
    }
    const[profile, setMyProfile] = useState({
      firstName:"",
      lastName:"",
      email:"",
      skills: [],
      education:"",
      Cv:null
    });
    const[isEditing, setIsEditing]= useState(false);
    const[fileName, setFile]= useState('');

    function EditOnClick(){
        toggleKeys(false);
      setIsEditing(true);
    }
    function SaveOnClick(){
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;

        if (firstName === "" || lastName === "" || !validateSkills()){
            setVisible("errorBox", true)
        }
      else {
            setMyProfile(prevProfile => ({
                ...prevProfile,
                firstName: firstName,
                lastName: lastName,
            }));
        setIsEditing(false);
        saveSkills();
        saveEducation();
        setVisible("errorBox", false)
            // TODO: Add Backend Update
        }
    }
    function validateSkills(){
        let keyInputs = document.getElementsByClassName("key");
        let durationsInputs = document.getElementsByClassName("duration");
        for(var i = 0; i < keyInputs.length; i++) {
            if (keyInputs[i].value === "" || durationsInputs[i].value === ""){
                return false;
            }
        }
        return true;
    }
    function saveSkills(){
        toggleKeys(true);
        let keyInputs = document.querySelectorAll("[id=Skillkey]");
        let durationsInputs = document.querySelectorAll("[id=Skillduration]");
        profile.skills = []
        for(let i = 0; i < keyInputs.length; i++) {
            profile.skills.push([keyInputs[i].value,durationsInputs[i].value]);
        }
    }
    function saveEducation(){
        toggleKeys(true);
        let keyInputs = document.querySelectorAll("[id=Educationkey]");
        let durationsInputs = document.querySelectorAll("[id=Educationduration]");
        profile.education = []
        for(let i = 0; i < keyInputs.length; i++) {
            profile.education.push([keyInputs[i].value,durationsInputs[i].value]);
        }
    }
    function toggleKeys(flag){
        let keyInputs = document.getElementsByClassName("key");
        let durationsInputs = document.getElementsByClassName("duration");
        // var names = '';
        for(var i = 0; i < keyInputs.length; i++) {
            keyInputs[i].disabled = flag;
            durationsInputs[i].disabled = flag;
        }
    }
    function updateCV(event){
      const{files} = event.target;
        const file = event.target.files[0];
        setFile(file.name);
        setMyProfile(prevProfile => ({
          ...prevProfile,
          Cv:URL.createObjectURL(files[0])}));
        // TODO: Add Backend Update
    }

  return (
      <div>
          <Navbar/>
        <div className='bg-lighter-grey min-h-screen items-center justify-center flex'>
            <div className='bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3 mt-24 max-w-lg min-w-[40%]'>
              <h1 className='mb-6 font-bold text-2xl flex justify-center'>Your Profile </h1>
            <div className='text-input' id="profile">
                <>
                <p><strong><u>Contact Information</u></strong></p>
                <p><strong>First Name: <span className={"text-red"}>&#42;</span> </strong> <input type="text" id="firstName" placeholder = "Please enter your First Name" defaultValue= {profile.firstName} disabled={!isEditing}/></p>
                <p><strong>Last Name: <span className={"text-red"}>&#42;</span></strong> <input type="text" id="lastName" placeholder = "Please enter your Last Name" defaultValue= {profile.lastName} disabled={!isEditing}/></p>
                <p><strong>Email: </strong> <input type="email" id="email" placeholder = "Email" defaultValue= {profile.email} disabled/></p>
                <p><strong><br /><u>Qualifications</u></strong></p>
                <Skills isEditing={isEditing}/>
                    <Education isEditing={isEditing}/>
                    {!isEditing ?
                        <p className={"mt-4 mb-2"}><strong>CV: </strong>{" "} {profile.Cv ? (<a href={profile.Cv} id= 'Cv' download><u>{fileName}</u></a> ):( "You have not uploaded a CV.")}</p>
                        :<div><p className={"mt-4 mb-2"}><strong>CV:</strong>  <input type="file" id="Cv" accept= ".pdf"  onChange={updateCV}/></p></div>
                    }
                </>
                <ErrorBox message={"Please complete all required fields."}/>
            </div>
                {!isEditing && <button className="border-2 border-dark-theme-grey bg-[#ccc] rounded-md m-2 p-2 text-black" onClick={EditOnClick} ><i className="fa-solid fa-pen-to-square pr-2"></i>Edit</button>}
                {isEditing && <button className="save-btn" onClick={SaveOnClick}><i className="fa-solid fa-floppy-disk pr-1"></i> Save</button>}
          </div>
        </div>
      </div>

  );
}

export default UserProfilePage;
