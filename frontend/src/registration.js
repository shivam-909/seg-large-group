import React, {useState, setState} from 'react';
import './Registration.css'

function registrationForm(){
    // const [firstName, setFirstName]= useState(null);
    // const [lastName, setLastName]= useState(null);
    // const [emailAddress, setEmailAddress]= useState(null);
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
    return(
        <div className= "registration">
        <div className="header-body">
            <h1 className= "registration-header"for="registration" >Registration</h1>
        </div>

        <div className= "registrationBody">

            <div className="firstName">
                <label for="firstName">First Name </label>
                <input type="text" placeholder="First Name" id="firstName" name="firstName" className= "firstName-input"/>
            </div>

            <div className="lastName">
                <label for="lastName">Last Name </label>
                <input type="text" placeholder="Last Name" id="lastName" name="lastName" className= "lastName-input"/>
            </div>

            <div className="emailAddress">
                <label for="emailAddress">Email Address </label>
                <input type="emailAddress" placeholder="example@gmail.com" id="emailAddress" name="emailAddress" className= "emailAddress-input" />
            </div>

            <div className="password">
                <label for="password">Password </label>
                <input type="password" placeholder="Password" id="password" name="password" className= "password-input" />
            </div>

            <div className="confirmPassword">
                <label for="confirmPassword">Confirm Password </label>
                <input type="password"  placeholder="Confirm Password" id="confirmPassword" className= "confirmPassword-input" />
            </div>


            <div className="button">             
                {/* <button onClick={() =>handleSubmit()} type="submit" className= "signUpButton">Register</button> */}
                <button type="submit" className= "registrationButton">Register</button>
            </div>
        {/* <button className= "loginButton">Already have an account? Login here! </button>  */}
        </div>
        </div>
    )
}
export default registrationForm;