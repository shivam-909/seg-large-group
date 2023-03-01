import './ProfilePage.css';
import React, {useState} from 'react';

function UserProfilePage() {
    const[profile, setMyProfile] = useState({
      firstName:"",
      lastName:"",
      email:"",
      phoneNum:"",
      skills:"",
      education:"",
      previousEmployment:"",
      Cv:null
    });

    const[isEditing, setIsEditing]= useState(false);
    const[fileName, setFile]= useState('');

    function EditOnClick(){
      setIsEditing(true);
    }
    function SaveOnClick(){
      const checkNum =  /^\d{10}$/;
      const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (profile.firstName == "" || profile.lastName == "" || profile.email == "" ||profile.phoneNum == ""){
        alert("Please fill out all necessary filled");
      }
      else if (!checkNum.test(profile.phoneNum) || !checkEmail.test(profile.email)){
        alert("Please ensure you have entered a valid phone number and email address");
      }
      else {
        setIsEditing(false);
      }
    }
    function EditProfile(event){
      const{id, value, files} = event.target;
      if (id === 'Cv'){
        const file = event.target.files[0];
        setFile(file.name);
        setMyProfile(prevProfile => ({
          ...prevProfile,
          Cv:URL.createObjectURL(files[0])
        }));

      }else{
      setMyProfile(prevProfile =>({
        ...prevProfile,
        [id]: value
      }));
    }
  }



  return (
    <div className='bg-lighter-grey min-h-screen items-center justify-center flex'>
        <div className='bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3'>
          <h1 className='mb-6 font-bold text-2xl flex justify-center'>Your Profile Page</h1>
        {!isEditing && <button className="edit-btn" onClick={EditOnClick} >Edit Profile</button>}
        <div className='text-input' id="profile">
          {!isEditing && (
            <>
            <p><strong><u>Contact Info</u></strong></p>
            <p><strong><span>&#42;</span>First Name: </strong> <input type="text" id="firstName" placeholder = "Please enter your First Name" value= {profile.firstName} disabled/></p>
            <p><strong><span>&#42;</span>Last Name: </strong> <input type="text" id="lastName" placeholder = "Please enter your Last Name" value= {profile.lastName} disabled/></p>
            <p><strong>Phone Number: </strong> <input type="tel" id="phoneNum" placeholder = "Please enter your Phone Number" value= {profile.phoneNum} disabled/></p>
            <p><strong><span>&#42;</span>Email: </strong> <input type="email" id="email" placeholder = "Please enter your Email" value= {profile.email} disabled/></p>
            <p><strong><br /><u>Qualifications</u></strong></p>
            <p><strong>Skills: </strong> <input type="text" id="skills" placeholder = "Please enter your Skills" value= {profile.skills} disabled/></p>
            <p><strong>Education: </strong> <input type="text" id="education" placeholder = "Please enter your Academic Qualifications" value= {profile.education} disabled/></p>
            <p><strong>Previous Employment: </strong> <input type="text" id="previousEmployment" placeholder = "Please enter any Previous Employment" value= {profile.previousEmployment} disabled/></p>
            <p><strong>CV: </strong>{" "} {!isEditing && profile.Cv ? (<a href={profile.Cv} id= 'Cv' download><u>Click to Download CV</u></a> ):( "You have not uploaded your CV yet!!")}</p>
            </>)}
        {isEditing && (
          <>
           <p><strong><u>Contact Info</u></strong></p>
           <p><strong><span>&#42;</span>First Name: </strong> <input type="text" id="firstName" placeholder = "Please enter your First Name" value= {profile.firstName} onChange={EditProfile}/></p>
           <p><strong><span>&#42;</span>Last Name: </strong> <input type="text" id="lastName" placeholder = "Please enter your Last Name" value= {profile.lastName} onChange={EditProfile}/></p>
           <p><strong>Phone Number:</strong>  <input type="tel" id="phoneNum" placeholder = "Please enter your Phone Number" value= {profile.phoneNum} onChange={EditProfile}/></p>
           <p><strong><br /><u>Qualifications</u></strong></p>
           <p><strong>Skills:</strong>  <input type="text" id="skills" placeholder = "Please enter your Skills" value= {profile.skills} onChange={EditProfile}/></p>
           <p><strong>Education: </strong> <input type="text" id="education" placeholder = "Please enter your Academic Qualifications" value= {profile.education} onChange={EditProfile}/></p>
           <p><strong>Previous Employment: </strong> <input type="text" id="previousEmployment" placeholder = "Please enter any Previous Employment" value= {profile.previousEmployment} onChange={EditProfile}/></p>
           <p><strong>CV:</strong>  <input type="file" id="Cv" accept= ".pdf"  onChange={EditProfile}/></p>{fileName && <p>Currently Selected file: {fileName}</p>}

          </> )}
        </div>
        {isEditing && <button className="save-btn" onClick={SaveOnClick} >Save Profile</button>}
      </div>
    </div>

  );
}

export default UserProfilePage;
