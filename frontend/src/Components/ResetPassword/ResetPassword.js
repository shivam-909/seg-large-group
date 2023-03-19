import TextInputBox from "../LoginPage/TextInputBox";
import {validateField} from "../Validation/validate";
import showIcon from "../../icons/showIcon.png";
import hideIcon from "../../icons/hideIcon.png";
import TextInputBoxWithIcon from "../LoginPage/TextInputBoxWithIcon";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';



function ResetPassword(){
    const navigate = useNavigate();
  
   const submitNewPassword = event => {
      event.preventDefault();
      navigate('/login')
    }

   function togglePasswordVisibility() {
    let passwordField = document.getElementById("password");
    let confirmPasswordField = document.getElementById("confirmPassword");
    let eye = document.getElementById("toggleEye");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        confirmPasswordField.type = "text";
        eye.src = hideIcon;
    } else {
        passwordField.type = "password";
        confirmPasswordField.type = "password";
        eye.src = showIcon;
    }
  }

   function checkPasswordMatch() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let passwordMismatchErrorMessage = document.getElementById("passwordMismatchError");
    if (password === confirmPassword) {
        passwordMismatchErrorMessage.className = "invisible absolute top-0";
    } else {
        passwordMismatchErrorMessage.className = "block text-red left-2 relative";
    }
}
   
    return(
      <div className='bg-lighter-grey min-h-screen items-center justify-center flex'>
          <div className='bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3'>
            <p className='mb-6 font-bold text-2xl flex justify-center'>Reset Your Password</p>

            <div>
                <TextInputBoxWithIcon id='password' type='password' onBlur={()=>{validateField("password",/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/)}} placeholder='Password' icon={<img id='toggleEye' src={showIcon} alt='' onClick={togglePasswordVisibility} className='cursor-pointer'/>}/>
                <span id="passwordError" className='invisible absolute top-0'>Invalid password</span>
              </div>

              <div>
                 <TextInputBoxWithIcon className='w-full' id='confirmPassword' type='password' onBlur={checkPasswordMatch} placeholder='Confirm password' icon={<img id='toggleEye' src={showIcon} alt='' onClick={togglePasswordVisibility} className='cursor-pointer'/>}/>
                  <span id="passwordMismatchError" className='invisible absolute top-0'>Passwords don't match</span>
              </div>  

            <button className="bg-dark-theme-grey rounded-md text-white p-2.5 flex items-center justify-center space-x-2" onClick={submitNewPassword} id={"submitNewPassword"}>Submit</button>

          </div>
      </div>
    )
}
export default ResetPassword;