import '../LoginPage/LoginPage.css';
import TextInputBox from '../LoginPage/TextInputBox.js';
import showIcon from '../../icons/showIcon.png';
import hideIcon from '../../icons/hideIcon.png';
import TextInputBoxWithIcon from "../LoginPage/TextInputBoxWithIcon";
import BinaryOption from "../Buttons/BinaryOption";
import {useState} from "react";
import { validateField, setVisible } from "../Validation/validate";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [errorMsg] = useState("")
  const [role, setRole] = useState("Seeker-Fields");
  const navigate = useNavigate();

  const checkPasswordMatch = function(){
    let pass = document.getElementById("password").value;
    let confirmPass = document.getElementById("confirmPass").value;
    if (confirmPass === pass){
      setVisible("confirmPassError", false);
    }
    else{
      setVisible("confirmPassError", true);
      let errorText = document.getElementById("confirmPassError");
      errorText.className = "block text-red left-2 relative";
    }
  }
  function signUpButton() {
      const formData = new FormData();

      const email = document.getElementById("email").value;
      formData.append('email', email);

      const password = document.getElementById("password").value;
      formData.append('password', password);

      let type;
      if (role === "Seeker-Fields") {
        type = "searcher";
        const firstName = document.getElementById("FirstName").value;
        formData.append('firstName', firstName);
        const lastName = document.getElementById("LastName").value;
        formData.append('lastName', lastName);
      }

      if (role === "Company-Fields") {
          type = "company";
          const companyName = document.getElementById("CompanyName").value;
          formData.append('companyName', companyName);
      }

      formData.append('userType', type);
      formData.append('pfpUrl', '');
      formData.append('location', '');

      axios.post('http://localhost:8000/auth/register', formData)
          .then(response => {
              if (response.data.access !== undefined && response.data.refresh !== undefined) {
                  localStorage.setItem("access", response.data.access);
                  localStorage.setItem("refresh", response.data.refresh);
                  navigate('/');
              }
              else {
                  // TODO: Display error message.
                  console.log(response.data);
              }
          })
          .catch(error => {
              // TODO: Display error message.
              console.error(error);
          });
  }
  function toggleRole(role) {
    let curRole = role === "Seeker-Fields" ? "Company-Fields" : "Seeker-Fields";
    let newRole = document.getElementById(role);
    setRole(role, newRole.id);
    setVisible(curRole,false);
    newRole.className = "space-x-2"
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
          <div className='bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3 min-w-[35%]'>
            <p className='mb-6 font-bold text-2xl flex justify-center'>Register an account</p>

            <BinaryOption option1={"Job Seeker"} function1={() => {toggleRole("Seeker-Fields")}} function2={() => {toggleRole("Company-Fields")}} option2={"Company"}/>
            <div id="Seeker-Fields" className="space-x-2 inline transition">
              <div className={"inline float-left"}>
              <TextInputBox id='FirstName' onBlur={()=>{validateField("FirstName",/^[A-Za-z]+$/)}} placeholder='First Name'/>
                <span id="FirstNameError" className={"invisible absolute top-0"}>Invalid First Name</span>
              </div>
              <div className={"inline float-right"}>
                <TextInputBox id='LastName' onBlur={()=>{validateField("LastName",/^[A-Za-z]+$/)}} placeholder='Last Name'/>
                <span id="LastNameError" className={"invisible absolute top-0"}>Invalid Last Name</span>
              </div>
            </div>
            <div id="Company-Fields" className="invisible absolute top-0 w-full transition">
              <TextInputBox id='CompanyName' className={"w-full"} placeholder='Company Name'/>
            </div>

            <div className={"w-full"}>
              {/*eslint-disable-next-line*/}
            <TextInputBox id='email' className="w-full" onBlur={()=>{validateField("email",/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)}} placeholder='Email address'/>
            <span id="emailError" className={"invisible absolute top-0"}>Invalid Email</span>
            </div>

            <div>
            <TextInputBoxWithIcon id='password' type='password' onBlur={()=>{validateField("password",/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/); checkPasswordMatch()}} placeholder='Password' icon={<img id='togglePassword' src={showIcon} alt='' onClick={() => {togglePasswordVisibility("password","togglePassword")}} className='cursor-pointer'/>}/>
            <span id="passwordError" className={"invisible absolute top-0"}>Invalid Password</span>
            </div>

            <div>
            <TextInputBox id='confirmPass' className="w-full" onBlur={checkPasswordMatch} type='password' placeholder='Confirm Password'/>
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

            <p className='text-center pt-4'>Already a user? <a className='LoginPage-link' href='/login'>Sign in.</a></p>
          </div>
      </div>
  );
}

export default RegisterPage;