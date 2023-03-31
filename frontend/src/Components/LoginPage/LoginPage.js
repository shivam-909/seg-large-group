import './LoginPage.css';
import TextInputBox from './TextInputBox.js';
import showIcon from '../../icons/showIcon.png';
import hideIcon from '../../icons/hideIcon.png';
import TextInputBoxWithIcon from "./TextInputBoxWithIcon";
import {validateField} from "../Validation/validate";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ErrorBox from "../ErrorBox/ErrorBox";
import {setVisible} from "../Validation/validate";
import Loading from "../Loading/Loading";
import {useState} from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function loginButton() {
    setLoading(true);

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

    axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/login`, formData)
        .then(response => {
          if (response.data.access !== undefined && response.data.refresh !== undefined) {
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            navigate('/');
          }
          else {
            // TODO: Display error message.
            setVisible("errorBox", true);
            setLoading(false);
          }
        })
        .catch(error => {
          // TODO: Display error message.
          setVisible("errorBox", true);
          setLoading(false);
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

            <div>
              <TextInputBox id='email' cache={localStorage.getItem("email")} className="w-full" onBlur={()=>{validateField("email",/^\w+(\.\w+)*@\w+(-?\w+)*(\.\w{2,10})+$/)}} placeholder='Email address'/>
              <span id="emailError" className={"invisible absolute top-0"}>Invalid Email</span>
            </div>

            <TextInputBoxWithIcon id='password' type='password' cache={localStorage.getItem("password")} placeholder='Password' icon={<img id='toggleEye' src={showIcon} alt='' onClick={togglePasswordVisibility} className='cursor-pointer'/>}/>

            <div className='flex space-x-2 items-center'>
              <input id='rememberLogin' type='checkbox' className='w-4 h-4 inline-block accent-dark-theme-grey' defaultChecked={localStorage.getItem("rememberLogin")}/>
              <p>Keep me signed in</p>
            </div>
            <ErrorBox message={"Invalid Login Details"}/>
            <div className='p-0.5'></div>

            <button className='bg-dark-theme-grey rounded-md text-white p-2.5 flex items-center justify-center space-x-2' onClick={loginButton} id={"loginButton"}>
              {loading ? <Loading className={"h-10 w-10 border-[3px] border-dark-theme-grey"}/> : <p id={"loadText"}>Sign In<i className="fa-solid fa-right-to-bracket pl-2"></i></p>}
            </button>

            <p className='text-center pt-4'>New user? <a className='LoginPage-link' href='/signup'>Sign up.</a></p>

            <a className='text-center' href='/#'>Forgot your password?</a>
          </div>
      </div>
  );
}

export default LoginPage;
