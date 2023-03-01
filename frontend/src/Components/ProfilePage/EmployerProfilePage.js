import './ProfilePage.css';
import React, {useState} from 'react';

function EmployerProfilePage() {
    const[profile, setMyProfile] = useState({
      companyName:"",
      email:"",
      phoneNum:"",
      address:"",
      companyDescrip:"",
      webAddress:""
    });

    const[isEditing, setIsEditing]= useState(false);

    function EditOnClick(){
      setIsEditing(true);
    }
    function SaveOnClick(){
      const checkNum =  /^\d{10}$/;
      const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (profile.companyName == "" || profile.email == "" ||profile.phoneNum == ""){
        alert("Please fill out all necessary filled");
      }
      else if (!checkNum.test(profile.phoneNum) || !checkEmail.test(profile.email)){
        alert("Please ensure you have entered a valid phone number and email address");
      }
      else {
        setIsEditing(false);
      }
    }
    }
    function EditProfile(event){
      const{id, value} = event.target;
      setMyProfile(prevProfile =>({
        ...prevProfile,
        [id]: value
      }));
    }

  return (
    <div className='bg-lighter-grey min-h-screen items-center justify-center flex'>
     <div className='bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3'>
        <header className='mb-6 font-bold text-2xl flex justify-center'>Your Profile Page</header>
        {!isEditing && <button className='edit-btn' onClick={EditOnClick} >Edit Profile</button>}
        <div className='text-input' id="profile">
          {!isEditing && (
            <>
            <p><strong><u>Contact Info</u></strong></p>
            <p><strong><span>&#42;</span>Company Name: </strong> <input type="text" id="firstName" placeholder = "Please enter your First Name" value= {profile.firstName} disabled/></p>
            <p><strong>Phone Number: </strong> <input type="tel" id="phoneNum" placeholder = "Please enter your Phone Number" value= {profile.phoneNum} disabled/></p>
            <p><strong><span>&#42;</span>Email: </strong> <input type="email" id="email" placeholder = "Please enter your Email" value= {profile.email} disabled/></p>
            <p><strong>Address: </strong> <input type="text" id="address" placeholder = "Please enter your Address" value= {profile.address} disabled/></p>

            <p><strong><br /><u>Description</u></strong></p>
            <p><strong>Company Description: </strong> <input type="text" id="companyDescrip" placeholder = "Please enter your Company Description" value= {profile.companyDescrip} disabled/></p>
            <p><strong>Visit our Website: </strong> <input type="text" id="webAddress" placeholder = "Add you Website link" value= {profile.webAddress} disabled/></p>
            </>  )}

      {isEditing && <button className="save-btn" onClick={SaveOnClick} >Save Profile</button>}
        {isEditing && (
          <>
          <p><strong><u>Contact Info</u></strong></p>
           <p><strong><span>&#42;</span>Company Name:</strong> <input type="text" id="companyName" value= {profile.companyName} onChange={EditProfile}/></p>
           <p><strong>Phone Number: </strong> <input type="tel" id="phoneNum" value= {profile.phoneNum} onChange={EditProfile}/></p>
           <p><strong><span>&#42;</span>Email: </strong> <input type="email" id="email" value= {profile.email} onChange={EditProfile}/></p>
           <p><strong>Address: </strong> <input type="text" id="address" value= {profile.address} onChange={EditProfile}/></p>

           <p><strong><br /><u>Description</u></strong></p>
           <p><strong>Company Description:</strong>  <input type="text" id="companyDescrip" value= {profile.companyDescrip} onChange={EditProfile}/></p>
           <p><strong>Visit our Website: </strong> <input type="text" id="webAddress" placeholder = "Add you Website link" value= {profile.webAddress} onChange={EditProfile}/></p>
          </>)}
        </div>
   </div>
 </div>
  );
}
export default EmployerProfilePage;
