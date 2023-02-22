import './ProfilePage.css';

function ProfilePage() {
  function MyProfile(){
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let skills = document.getElementById("skills").value;
    let education = document.getElementById("education").value;
    let previousEmployment = document.getElementById("previousEmployment").value;



  return (
    <div className="ProfilePage">
      <header className="ProfilePage-header">
        Your Profile:
        <button class="edit-btn">Edit Profile</button>
        <div className='ProfilePage-text' id="profile">
          <p>First Name: <span id="firstName"></span></p>
          <p>Last Name: <span id="lastName"></span></p>
          <p>Email: <span id="email"></span></p>
          <p>Skills: <span id="skills"></span></p>
          <p>Education: <span id="education"></span></p>
          <p>Previous Employment: <span id="previousEmployment"></span></p>
        </div>
      </header>
    </div>
  );
}

export default ProfilePage;
