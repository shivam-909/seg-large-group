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
    <div className="ProfilePage">
      <header className="ProfilePage-header">
        Your Profile:
        {!isEditing && <button className="edit-btn" onClick={EditOnClick} >Edit Profile</button>}
        <div className='ProfilePage-text' id="profile">
          {!isEditing && (
            <>
            <p>Company Name: {!isEditing && <span id="companyName">{profile.companyName}</span>}</p>
            <p>Email: {!isEditing && <span id="firstName">{profile.email}</span>}</p>
            <p>Phone Number: {!isEditing && <span id="phoneNum">{profile.phoneNum}</span>}</p>
            <p>Address: {!isEditing && <span id="address">{profile.address}</span>}</p>
            <p>Company Description: {!isEditing && <span id="companyDescrip">{profile.companyDescrip}</span>}</p>
            </>
        )}
        </div>
        {isEditing && <button className="save-btn" onClick={SaveOnClick} >Save Profile</button>}
        <div id="profile">
        {isEditing && (
          <>
           <p>Company Name: <input type="text" id="companyName" value= {profile.companyName} onChange={EditProfile}/></p>
           <p>Email: <input type="text" id="email" value= {profile.email} onChange={EditProfile}/></p>
           <p>Phone Number: <input type="text" id="skills" value= {profile.phoneNum} onChange={EditProfile}/></p>
           <p>Address: <input type="text" id="education" value= {profile.address} onChange={EditProfile}/></p>
           <p>Company Description: <input type="text" id="previousEmployment" value= {profile.companyDescrip} onChange={EditProfile}/></p>

          </>
        )}

        </div>
        </header>
    </div>
  );
}

export default EmployerProfilePage;
