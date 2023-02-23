import './ProfilePage.css';
import React, {useState} from 'react';

function EmployerProfilePage() {
    const[profile, setMyProfile] = useState({
      companyName:"Jack",
      email:"j.s@hotmail.com",
      phoneNum:"Jave, python",
      address:"Uni",
      companyDescrip:"No employment"
    });

    const[isEditing, setIsEditing]= useState(false);
    function EditOnClick(){
      setIsEditing(true);
    }
    function SaveOnClick(){
      setIsEditing(false);
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
        <div className='ProfilePage-text' id="profile">
          {!isEditing && (
            <>
            <p><strong>Company Name:</strong> <br />{!isEditing && <span id="companyName">{profile.companyName}</span>}</p>
            <p><strong>Email:</strong> <br />{!isEditing && <span id="firstName">{profile.email}</span>}</p>
            <p><strong>Phone Number:</strong>  <br />{!isEditing && <span id="phoneNum">{profile.phoneNum}</span>}</p>
            <p><strong>Address:</strong> <br />{!isEditing && <span id="address">{profile.address}</span>}</p>
            <p><strong>Company Description:</strong> <br />{!isEditing && <span id="companyDescrip">{profile.companyDescrip}</span>}</p>
            </>  )}
        </div>
        <div className='text-input' id="profile">
        {isEditing && <button className="'bg-dark-theme-grey rounded-md text-white p-2.5 flex items-center justify-center space-x-2'" onClick={SaveOnClick} >Save Profile</button>}
        {isEditing && (
          <>
           <p><strong>Company Name:</strong> <input type="text" id="companyName" value= {profile.companyName} onChange={EditProfile}/></p>
           <p><strong>Email: </strong> <input type="text" id="email" value= {profile.email} onChange={EditProfile}/></p>
           <p><strong>Phone Number: </strong> <input type="text" id="phoneNum" value= {profile.phoneNum} onChange={EditProfile}/></p>
           <p><strong>Address: </strong> <input type="text" id="address" value= {profile.address} onChange={EditProfile}/></p>
           <p><strong>Company Description:</strong>  <input type="text" id="companyDescrip" value= {profile.companyDescrip} onChange={EditProfile}/></p>
          </>)}
        </div>
   </div>
 </div>
  );
}

export default EmployerProfilePage;
