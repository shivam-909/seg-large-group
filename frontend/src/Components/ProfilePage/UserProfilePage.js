import './ProfilePage.css';
import React, {useState} from 'react';
import Navbar from "../Navbar/Navbar";
import Skills from "./Skills";
import {setVisible} from "../Validation/validate";
import ErrorBox from "../ErrorBox/ErrorBox";
function UserProfilePage() {
    const [skills, setSkills] = useState([])
    const[profile, setMyProfile] = useState({
      firstName:"",
      lastName:"",
      email:"",
      skills: [],
      education:"",
      previousEmployment:"",
      Cv:null
    });
    const[isEditing, setIsEditing]= useState(false);
    const[fileName, setFile]= useState('');

    function EditOnClick(){
        toggleSkills(false);
      setIsEditing(true);
    }
    function SaveOnClick(){
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;

        if (firstName === "" || lastName === "" || !validateSkills()){
            setVisible("errorBox", true)
        }
      else {
        setIsEditing(false);
        saveSkills();
        setVisible("errorBox", false)
            // TODO: Add Backend Update
        }
    }
    function validateSkills(){
        var skillsInputs = document.getElementsByClassName("skill");
        var durationsInputs = document.getElementsByClassName("duration");
        for(var i = 0; i < skillsInputs.length; i++) {
            if (skillsInputs[i].value === "" || durationsInputs[i].value === ""){
                return false;
            }
        }
        return true;
    }
    function saveSkills(){
        toggleSkills(true);
        var skillsInputs = document.getElementsByClassName("skill");
        var durationsInputs = document.getElementsByClassName("duration");
        setSkills([])
        for(var i = 0; i < skillsInputs.length; i++) {
            skills.push([skillsInputs[i].value,durationsInputs[i].value]);
        }
    }
    function toggleSkills(flag){
        var skillsInputs = document.getElementsByClassName("skill");
        var durationsInputs = document.getElementsByClassName("duration");
        // var names = '';
        for(var i = 0; i < skillsInputs.length; i++) {
            skillsInputs[i].disabled = flag;
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
              <h1 className='mb-6 font-bold text-2xl flex justify-center'>Your Profile Page</h1>
            <div className='text-input' id="profile">
                <>
                <p><strong><u>Contact Information</u></strong></p>
                <p><strong>First Name: <span className={"text-red"}>&#42;</span> </strong> <input type="text" id="firstName" placeholder = "Please enter your First Name" defaultValue= {profile.firstName} disabled={!isEditing}/></p>
                <p><strong>Last Name: <span className={"text-red"}>&#42;</span></strong> <input type="text" id="lastName" placeholder = "Please enter your Last Name" defaultValue= {profile.lastName} disabled={!isEditing}/></p>
                <p><strong>Email: </strong> <input type="email" id="email" placeholder = "Email" defaultValue= {profile.email} disabled/></p>
                <p><strong><br /><u>Qualifications</u></strong></p>
                <Skills isEditing={isEditing}/>
                <p><strong>Education: </strong> <input type="text" id="education" placeholder = "Please enter your Academic Qualifications" defaultValue= {profile.education} disabled={!isEditing}/></p>
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
