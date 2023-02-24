import React, {useState, setState} from 'react';
import './Registration.css'
import './PhoneInputBox.css'
import showIcon from '../../icons/showIcon.png';
import hideIcon from '../../icons/hideIcon.png';
// import {Toggle} from '@components'
import PhoneInput from './PhoneInputBox.js';
import BinaryOption from './BinaryOption.js';
import TextInputBoxWithIcon from '../LoginPage/TextInputBoxWithIcon';
// import {Text, StyleSheet} from 'react-native';


function registrationForm(){
    // const [firstName, setFirstName]= useState(null);
    // const [lastName, setLastName]= useState(null);
    // const [emailAddress, setEmailAddress]= useState(null);
    // const [mobileNumber, setMobileNumber]= useState(null);
    // const [password, setPassword]= useState(null);
    // const [confirmPassword, setConfirmPassword]= useState(null);

    // const handleInputChange = (e) => {
    //     const {id, value}= e.target;
    //     if (id === "firstName"){
    //         setFirstName(value);
    //     }

    //     if (id=== "lastName"){
    //         setLastName(value);
    //     }

    //     if (id=== "emailAddress"){
    //         setEmailAddress(value);
    //     }

    //     if (id=== "mobileNumber"){
    //         setmobileNumber(value);
    //     }
    

    //     if (id=== "password"){
    //         setPassword(value);
    //     }

    //     if (id=== "`confirmPassword"){
    //         setConfirmPassword(value);
    //     }
    // }

    //     const handleSubmit = () => {
    //         console.log(firstName, lastName, emailAddress, password, confirmPassword)
    //     }

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

    return(
        <div className="registration">
            <div className= "registration-body">
                <h4 className= "registration-header"for="registration" >Registration</h4>
                <div> 
                    <div>
                        <BinaryOption option1="Job Seeker" option2="Company"/>
                    </div>
                    
                    <div className="jobSeeker">

                        <input type="text" placeholder="First Name" id="firstName" name="firstName" className= "text-input"/>
                        <input type="text" placeholder="Last Name" id="lastName" name="lastName" className= "text-input"/>
                        <div className="dOB">
                            <label for="dateOfBirth">Date of Birth </label>
                            <input type="date" placeholder="Date of Birth" id="dateOfBirth" name="dateOfBirth" className= "text-input"/>
                         </div>
                        <input type="email" placeholder="Email Address" id="emailAddress" name="emailAddress" className= "text-input" />
                   
                        <PhoneInput defaultCountry="UK"  placeholder="Mobile Number" id="mobileNumber" name="mobileNumber" className="text-input" />
                    
                        <TextInputBoxWithIcon type="password" placeholder="Password" id="password" name="password" className= "text-input" icon={<img id='toggleEye' src={showIcon} alt='' onClick={togglePasswordVisibility} className='cursor-pointer'/>}/>
                        <TextInputBoxWithIcon type="password" placeholder="Confirm password" id="password" name="password" className= "text-input" icon={<img id='toggleEye' src={showIcon} alt='' onClick={togglePasswordVisibility} className='cursor-pointer'/>}/>
                    
                    </div>
                    
                   {/* <div className="Company">
                        <input type="text" placeholder="Company Name" className="text-input"/>
                        <input type="address" placeholder="Location" className="text-input"/>
                        <input type="email" placeholder="Email Address" id="emailAddress" name="emailAddress" className= "text-input" />

                        <PhoneInput defaultCountry="UK"  placeholder="Company Number" id="mobileNumber" name="mobileNumber" className="text-input" />
                        
                        <input type="password" placeholder="Password" id="password" name="password" className= "text-input" />
                        <input type="password"  placeholder="Confirm Password" id="confirmPassword" className= "text-input" />
                    </div> */}
                     

                        <button type="submit" className= "registrationButton">Register</button>
                        <p className='text-center pt-4'>Already have an account? <a className='RegistrationPage-link' href='/login'>Login</a></p>
                </div>
            </div>
        </div>
    );
}

// const Google = props => (
//      <a href="#" id="googleIcon"></a>
//  );
export default registrationForm;