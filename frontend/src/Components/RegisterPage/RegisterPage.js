import '../LoginPage/LoginPage.css';
import TextInputBox from '../LoginPage/TextInputBox.js';
import showIcon from '../../icons/showIcon.png';
import hideIcon from '../../icons/hideIcon.png';
import TextInputBoxWithIcon from "../LoginPage/TextInputBoxWithIcon";
import BinaryOption from "../Buttons/BinaryOption";
import {useState} from "react";

function RegisterPage() {
  const [errorMsg, setErrorMsg] = useState("")
  function checkPasswordMatch(){
    let pass = document.getElementById("password").value;
    let confirmPass = document.getElementById("confirmPass").value;
    if (confirmPass == pass){
      setVisible("confirmPassError", false);
    }
    else{
      setVisible("confirmPassError", true);
      let errorText = document.getElementById("confirmPassError");
      errorText.className = "block text-red left-2 relative";
    }
  }
  function validateField(field, regex, msg){
    let obj = document.getElementById(field);
    if (regex.test(obj.value)){
      setVisible(field+"Error", false);
    }
    else{
      setVisible(field+"Error", true);
      let errorText = document.getElementById(field + "Error");
      errorText.className = "block text-red left-2 relative";
    }
  }
  function signUpButton() {
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
            <div id="Seeker-Fields" className="space-x-2 inline">
              <div className={"inline float-left"}>
              <TextInputBox id='FirstName' onChange={()=>{validateField("FirstName",/^[A-Za-z]+$/,"Invalid First Name")}} placeholder='First Name'/>
                <span id="FirstNameError" className={"invisible absolute top-0"}>Invalid First Name</span>
              </div>
              <div className={"inline float-right"}>
                <TextInputBox id='LastName' onChange={()=>{validateField("LastName",/^[A-Za-z]+$/,"Invalid Last Name")}} placeholder='Last Name'/>
                <span id="LastNameError" className={"invisible absolute top-0"}>Invalid Last Name</span>
              </div>
            </div>
            <div id="Company-Fields" className="invisible absolute top-0 w-full">
              <TextInputBox id='CompanyName' className={"w-full"} placeholder='Company Name'/>
            </div>

            <div className={"w-full"}>
              {/*eslint-disable-next-line*/}
            <TextInputBox id='email' className="w-full" onChange={()=>{validateField("email",/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Invalid Email")}} placeholder='Email address'/>
            <span id="emailError" className={"invisible absolute top-0"}>Invalid Email</span>
            </div>

            <div>
            <TextInputBoxWithIcon id='password' type='password' onChange={()=>{validateField("password",/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/,"Invalid Password"); checkPasswordMatch()}} placeholder='Password' icon={<img id='togglePassword' src={showIcon} alt='' onClick={() => {togglePasswordVisibility("password","togglePassword")}} className='cursor-pointer'/>}/>
            <span id="passwordError" className={"invisible absolute top-0"}>Invalid Password</span>
            </div>

            <div>
            <TextInputBox id='confirmPass' className="w-full" onChange={checkPasswordMatch} type='password' placeholder='Confirm Password'/>
            <span id="confirmPassError" className={"invisible absolute top-0"}>Password does not match</span>
            </div>

            <div id="errorBox" className="invisible absolute top-96">
              <div className="border-2 border-red bg-light-red rounded-md p-2 flex items-center justify-center">
                {errorMsg}
              </div>
            </div>

            <div className='p-0.5'></div>
            <button className='bg-dark-theme-grey rounded-md text-white p-2.5 flex items-center justify-center space-x-2' onClick={signUpButton}>
              <p>Sign Up</p>
              <i className="fa-solid fa-right-to-bracket"></i>
            </button>

            <p className='text-center pt-4'>Already a user? <a className='LoginPage-link' href='/#'>Sign in.</a></p>
          </div>
      </div>
  );
}

export default RegisterPage;