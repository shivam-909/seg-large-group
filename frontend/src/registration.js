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

            <div className="name-labels">
                <label for="firstName">First Name </label>
                <input type="text" placeholder="First Name" id="firstName" name="firstName" className= "text-input"/>
            </div>

            <div className="name-labels">
                <label for="lastName">Last Name </label>
                <input type="text" placeholder="Last Name" id="lastName" name="lastName" className= "text-input"/>
            </div>

            <div className="name-labels">
                <label for="emailAddress">Email Address </label>
                <input type="emailAddress" placeholder="example@gmail.com" id="emailAddress" name="emailAddress" className= "text-input" />
            </div>

            <div className="name-labels">
                <label for="password">Password </label>
                <input type="password" placeholder="Password" id="password" name="password" className= "text-input" />
            </div>

            <div className="name-labels">
                <label for="confirmPassword">Confirm Password </label>
                <input type="password"  placeholder="Confirm Password" id="confirmPassword" className= "text-input" />
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

const Google = props => (
    <a href="#" id="googleIcon"></a>
);
export default registrationForm;