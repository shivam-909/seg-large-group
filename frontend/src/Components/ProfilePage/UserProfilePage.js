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
    <div className="ProfilePage">
      <header className="ProfilePage-header">
        Your Profile:
        {!isEditing && <button className="edit-btn" onClick={EditOnClick} >Edit Profile</button>}
        <div className='ProfilePage-text' id="profile">
          {!isEditing && (
            <>
            <p>First Name: {!isEditing && <span id="firstName">{profile.firstName}</span>}</p>
            <p>Last Name: {!isEditing && <span id="lastName">{profile.lastName}</span>}</p>
            <p>Email: {!isEditing && <span id="email">{profile.email}</span>}</p>
            <p>Skills: {!isEditing && <span id="skills">{profile.skills}</span>}</p>
            <p>Education: {!isEditing && <span id="education">{profile.education}</span>}</p>
            <p>Previous Employment: {!isEditing && <span id="previousEmployment">{profile.previousEmployment}</span>}</p>
            </>
        )}
        </div>
        {isEditing && <button className="save-btn" onClick={SaveOnClick} >Save Profile</button>}
        <div className='ProfilePage-text' id="profile">
        {isEditing && (
          <>
           <p>First Name: <input type="text" id="firstName" value= {profile.firstName} onChange={EditProfile}/></p>
           <p>Last Name: <input type="text" id="lastName" value= {profile.lastName} onChange={EditProfile}/></p>
           <p>Email: <input type="text" id="email" value= {profile.email} onChange={EditProfile}/></p>
           <p>Skills: <input type="text" id="skills" value= {profile.skills} onChange={EditProfile}/></p>
           <p>Education: <input type="text" id="education" value= {profile.education} onChange={EditProfile}/></p>
           <p>Previous Employment: <input type="text" id="previousEmployment" value= {profile.previousEmployment} onChange={EditProfile}/></p>

          </>
        )}

        </div>
      </header>
    </div>
  );
}

export default UserProfilePage;
