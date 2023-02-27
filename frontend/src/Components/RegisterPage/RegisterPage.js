import '../LoginPage/LoginPage.css';
import TextInputBox from '../LoginPage/TextInputBox.js';
import showIcon from '../../icons/showIcon.png';
import hideIcon from '../../icons/hideIcon.png';
import TextInputBoxWithIcon from "../LoginPage/TextInputBoxWithIcon";
import BinaryOption from "../Buttons/BinaryOption";

function RegisterPage() {
  function loginButton() {
    // let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    // let rememberLogin = document.getElementById("rememberLogin").checked;
    // TODO: Make API call to retrieve JWTs.
    // TODO: Redirect to home page.
  }
  function toggleRole(role){
    let curRole = document.getElementById(role === "Seeker-Fields" ? "Company-Fields" : "Seeker-Fields");
    let newRole = document.getElementById(role);
    curRole.className = "invisible absolute top-96"
    newRole.className = " "

  }
  function togglePasswordVisibility(field, icon) {
    if (document.readyState === "complete") {
      let passwordField = document.getElementById(field);
      let confirmPassField = document.getElementById("confirmPass");
      let eye = document.getElementById(icon);
      if (passwordField.type === "password") {
        passwordField.type = "text";
        confirmPassField.type = "text";
        eye.src = hideIcon;
      } else {
        passwordField.type = "password";
        confirmPassField.type = "password";
        eye.src = showIcon;
      }
    }
  }

  return (
      <div className='bg-lighter-grey min-h-screen items-center justify-center flex'>
          <div className='bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3'>
            <p className='mb-6 font-bold text-2xl flex justify-center'>Register an account</p>

            <BinaryOption option1={"Job Seeker"} function1={() => {toggleRole("Seeker-Fields")}} function2={() => {toggleRole("Company-Fields")}} option2={"Company"}/>
            <div id="Seeker-Fields" className="space-x-2">
              <TextInputBox id='FirstName' placeholder='First Name'/>
              <TextInputBox id='LastName' placeholder='Last Name'/>
            </div>
            <div id="Company-Fields" className="invisible absolute top-96">
              <TextInputBox id='CompanyName' placeholder='Company Name'/>
            </div>


            <TextInputBox id='email' placeholder='Email address'/>

            <TextInputBoxWithIcon id='password' type='password' placeholder='Password' icon={<img id='togglePassword' src={showIcon} alt='' onClick={() => {togglePasswordVisibility("password","togglePassword")}} className='cursor-pointer'/>}/>
            <TextInputBox id='confirmPass' type='password' placeholder='Confirm Password'/>

            <div className='p-0.5'></div>

            <button className='bg-dark-theme-grey rounded-md text-white p-2.5 flex items-center justify-center space-x-2' onClick={loginButton}>
              <p>Sign Up</p>
              <i className="fa-solid fa-right-to-bracket"></i>
            </button>

            <p className='text-center pt-4'>Already a user? <a className='LoginPage-link' href='/#'>Sign in.</a></p>
          </div>
      </div>
  );
}

export default RegisterPage;