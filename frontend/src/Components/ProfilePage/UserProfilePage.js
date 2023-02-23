import './ProfilePage.css';
import React, {useState} from 'react';

function UserProfilePage() {
    const[profile, setMyProfile] = useState({
      firstName:"Jack",
      lastName:"Smith",
      email:"j.s@hotmail.com",
      skills:"Jave, python",
      education:"Uni",
      previousEmployment:"No employment"
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
    <div className='bg-dark-theme-grey min-h-screen items-center justify-center flex'>
      <div className='bg-lighter-grey rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3'>
        <header className='mb-6 font-bold text-2xl flex justify-center'>Your Profile Page</header>
        Your Profile:
        {!isEditing && <button className="edit-btn" onClick={EditOnClick} >Edit Profile</button>}
        <div className='ProfilePage-text' id="profile">
          {!isEditing && (
            <>
            <p><strong> First Name: </strong> <br />{!isEditing && <span id="firstName">{profile.firstName}</span>}</p>
            <p><strong>Last Name: </strong> <br />{!isEditing && <span id="lastName">{profile.lastName}</span>}</p>
            <p><strong>Email:</strong>  <br />{!isEditing && <span id="email">{profile.email}</span>}</p>
            <p><strong>Skills: </strong> <br />{!isEditing && <span id="skills">{profile.skills}</span>}</p>
            <p><strong>Education: </strong> <br />{!isEditing && <span id="education">{profile.education}</span>}</p>
            <p><strong>Previous Employment: </strong> <br />{!isEditing && <span id="previousEmployment">{profile.previousEmployment}</span>}</p>
            </>)}
        </div>
        {isEditing && <button className="save-btn" onClick={SaveOnClick} >Save Profile</button>}
        <div className='text-input' id="profile">
        {isEditing && (
          <>
           <p><strong>First Name: </strong> <input type="text" id="firstName" value= {profile.firstName} onChange={EditProfile}/></p>
           <p><strong>Last Name: </strong> <input type="text" id="lastName" value= {profile.lastName} onChange={EditProfile}/></p>
           <p><strong>Email:</strong>  <input type="text" id="email" value= {profile.email} onChange={EditProfile}/></p>
           <p><strong>Skills:</strong>  <input type="text" id="skills" value= {profile.skills} onChange={EditProfile}/></p>
           <p><strong>Education: </strong> <input type="text" id="education" value= {profile.education} onChange={EditProfile}/></p>
           <p><strong>Previous Employment: </strong> <input type="text" id="previousEmployment" value= {profile.previousEmployment} onChange={EditProfile}/></p>
          </> )}
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
