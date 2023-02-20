import './registration.css'
import React, {useState, setState} from 'react';

function registrationForm(){
    const [firstName, setFirstName]= useState(null);
    const [lastName, setLastName]= useState(null);
    const [emailAddress, setEmailAddress]= useState(null);
    const [password, setPassword]= useState(null);
    const [confirmPassword, setConfirmPassword]= useState(null);

    const handleInputChange = (e) => {
        const {id, value}= e.target;
        if (id=== "firstName"){
            setFirstName(value);
        }

        if (id=== "lastName"){
            setLastName(value);
        }

        if (id=== "emailAddress"){
            setEmailAddress(value);
        }

        if (id=== "password"){
            setPassword(value);
        }

        if (id=== "`confirmPassword"){
            setConfirmPassword(value);
        }

        const handleSubmit = () => {
            console.log(firstName, lastName, emailAddress, password, confirmPassword)
        }
    }
    return(
    <div className= "registrationForm">
        <header className="registration-header">Registration</header>
            <div className="firstName">
                <label for="firstName">First Name </label>
                <input type="text" value= {firstName} onChange ={(e) => handleInputChange(e)} placeholder="First Name" id="firstName" name="firstName" className= "firstName-input"/>
            </div>

            <div className="lastName">
                <label for="lastName">Last Name </label>
                <input type="text" value= {lastName} onChange ={(e) => handleInputChange(e)}placeholder="LastName" id="lastName" name="lastName" className= "lastName-input"/>
            </div>

            <div className="emailAddress">
                <label for="emailAddress">Email Address </label>
                <input type="emailAddress" value= {emailAddress} onChange ={(e) => handleInputChange(e)} placeholder="example@gmail.com" id="emailAddress" name="emailAddress" className= "emailAddress-input" />
            </div>

            <div className="password">
                <label for="password">Password </label>
                <input type="password" value= {password} onChange ={(e) => handleInputChange(e)} placeholder="Password" id="password" name="password" className= "password-input" />
            </div>

            <div className="confirmPassword">
                <label for="confirmPassword">Confirm Password </label>
                <input type="password" value= {confirmPassword} onChange ={(e) => handleInputChange(e)} placeholder="Confirm Password" id="confirmPassword" className= "confirmPassword-input" />
            </div>

            <div>             
                <button onClick={() =>handleSubmit()} type="submit" className= "signUpButton">Register</button>
            </div>
        {/* <button className= "loginButton">Already have an account? Login here! </button>  */}
    </div>
    )
}
export default registrationForm;