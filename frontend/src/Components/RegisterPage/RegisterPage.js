import '../LoginPage/LoginPage.css';
import TextInputBox from '../LoginPage/TextInputBox.js';
import showIcon from '../../icons/showIcon.png';
import hideIcon from '../../icons/hideIcon.png';
import TextInputBoxWithIcon from "../LoginPage/TextInputBoxWithIcon";
import BinaryOption from "../Buttons/BinaryOption";
import {useState} from "react";

function RegisterPage() {
  const [errorMsg, setErrorMsg] = useState("")
  function validateField(field, regex, msg){
    let obj = document.getElementById(field);
    if (regex.test(obj.value)){
      setErrorMsg("")
      setVisible("errorBox", false);
    }
    else{
      setErrorMsg(msg)
      setVisible("errorBox", true);
    }
  }
  function loginButton() {
    // let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    // let rememberLogin = document.getElementById("rememberLogin").checked;
    // TODO: Make API call to retrieve JWTs.
    // TODO: Redirect to home page.
  }
  function toggleRole(role){
    let curRole = role === "Seeker-Fields" ? "Company-Fields" : "Seeker-Fields";
    let newRole = document.getElementById(role);
    setVisible(curRole,false)
    newRole.className = "space-x-2"
  }
  function setVisible(elem,flag){
    let obj = document.getElementById(elem)
    if(flag){
      obj.className = ""
    }
    else{
      obj.className = "invisible absolute top-0"
    }
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
              <TextInputBox id='FirstName' onBlur={()=>{validateField("FirstName",/^[A-Za-z]+$/,"Invalid First Name")}} placeholder='First Name'/>
              <TextInputBox id='LastName' onBlur={()=>{validateField("LastName",/^[A-Za-z]+$/,"Invalid Last Name")}} placeholder='Last Name'/>
            </div>
            <div id="Company-Fields" className="invisible absolute top-0">
              <TextInputBox id='CompanyName' placeholder='Company Name'/>
            </div>

            {/*eslint-disable-next-line*/}
            <TextInputBox id='email' onBlur={()=>{validateField("email",/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Invalid Email")}} placeholder='Email address'/>

            <TextInputBoxWithIcon id='password' type='password' onBlur={()=>{validateField("password",/^(?=.*\s)/,"Invalid Password")}} placeholder='Password' icon={<img id='togglePassword' src={showIcon} alt='' onClick={() => {togglePasswordVisibility("password","togglePassword")}} className='cursor-pointer'/>}/>
            <TextInputBox id='confirmPass' type='password' placeholder='Confirm Password'/>

            <div id="errorBox" className="invisible absolute top-96">
              <div className="border-2 border-red bg-light-red rounded-md p-2 flex items-center justify-center">
                {errorMsg}
              </div>
            </div>

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