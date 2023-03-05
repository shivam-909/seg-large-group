import './LoginPage.css';
import TextInputBox from './TextInputBox.js';
import showIcon from '../../icons/showIcon.png';
import hideIcon from '../../icons/hideIcon.png';
import TextInputBoxWithIcon from "./TextInputBoxWithIcon";
import {validateField} from "../Validation/validate";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const axios = require('axios');

  function loginButton() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let rememberLogin = document.getElementById("rememberLogin").checked;
    if (rememberLogin) {
      localStorage.setItem("email", email)
      localStorage.setItem("password", password)
      localStorage.setItem("rememberLogin", true)
    }
    else {
      localStorage.removeItem("email")
      localStorage.removeItem("password")
      localStorage.removeItem("rememberLogin")
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    axios.post('http://localhost:8000/auth/login', formData)
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

  function togglePasswordVisibility() {
    let passwordField = document.getElementById("password");
    let eye = document.getElementById("toggleEye");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      eye.src = hideIcon;
    } else {
      passwordField.type = "password";
      eye.src = showIcon;
    }
  }

  return (
      <div className='bg-lighter-grey min-h-screen items-center justify-center flex'>
          <div className='bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3'>
            <p className='mb-6 font-bold text-2xl flex justify-center'>Sign in to your account</p>

            <div className={"w-full"}>
              <TextInputBox id='email' cache={localStorage.getItem("email")} className="w-full" onChange={()=>{validateField("email",/^\w+(-?\w+)*@\w+(-?\w+)*(\.\w{2,3})+$/)}} placeholder='Email address'/>
              <span id="emailError" className={"invisible absolute top-0"}>Invalid Email</span>
            </div>

            <TextInputBoxWithIcon id='password' type='password' cache={localStorage.getItem("password")} placeholder='Password' icon={<img id='toggleEye' src={showIcon} alt='' onClick={togglePasswordVisibility} className='cursor-pointer'/>}/>

            <div className='flex space-x-2 items-center'>
              <input id='rememberLogin' type='checkbox' className='w-4 h-4 inline-block accent-dark-theme-grey' defaultChecked={localStorage.getItem("rememberLogin")}/>
              <p>Keep me signed in</p>
            </div>

            <div className='p-0.5'></div>

            <button className='bg-dark-theme-grey rounded-md text-white p-2.5 flex items-center justify-center space-x-2' onClick={loginButton}>
              <p>Sign In</p>
              <i className="fa-solid fa-right-to-bracket"></i>
            </button>

            <p className='text-center pt-4'>New user? <a className='LoginPage-link' href='/signup'>Sign up.</a></p>

            <a className='text-center' href='/#'>Forgot your password?</a>
          </div>
      </div>
  );
}

export default LoginPage;