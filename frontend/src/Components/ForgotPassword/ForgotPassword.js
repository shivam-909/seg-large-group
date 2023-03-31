import TextInputBox from "../LoginPage/TextInputBox";
import {validateField} from "../Validation/validate";
import React from 'react';

function ForgotPassword(){
  function submitButton(){
    let email = document.getElementById("email").value;
    
    //if email valid
    window.alert("A password reset link has been sent to the email " + email)
   }

    return(
      <div className='bg-lighter-grey min-h-screen items-center justify-center flex'>
          <div className='bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3'>
            <p className=' font-bold text-2xl flex justify-center'>Forgot Your Password</p>
            <p className='justify-center flex text-2s'>Verify your email address</p>
            
            <div data-testid="email-input">
              <TextInputBox id='email' cache={localStorage.getItem("email")} className="w-full" onBlur={()=>{validateField("email",/^\w+(-?\w+)*@\w+(-?\w+)*(\.\w{2,10})+$/)}} placeholder='Email address'/>
              <span id="emailError" className='invisible absolute top-0'>Invalid email</span>

            </div>
           
            <div data-testid="submit-button">
              <button className='bg-dark-theme-grey rounded-md text-white p-2.5 flex items-center justify-center space-x-2' onClick={submitButton} id={"submitButton"}>Submit</button>
              </div>
          </div>
      </div>
    )
}
export default ForgotPassword;
