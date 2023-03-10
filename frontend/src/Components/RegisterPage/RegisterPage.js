import TextInputBox from "../LoginPage/TextInputBox";
import {setVisible, validateField} from "../Validation/validate";
import TextInputBoxWithIcon from "../LoginPage/TextInputBoxWithIcon";
import showIcon from "../../icons/showIcon.png";
import hideIcon from "../../icons/hideIcon.png";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Loading from "../Loading/Loading";
import ErrorBox from "../ErrorBox/ErrorBox";

export default function RegisterPage() {
    const [role, setRole] = useState("searcher");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

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

    function signUpButton() {
        setLoading(true);
        const formData = new FormData();
        const email = document.getElementById("email").value;
        formData.append('email', email);

        const password = document.getElementById("password").value;
        formData.append('password', password);

        if (role === "searcher") {
            const firstName = document.getElementById("firstName").value;
            formData.append('firstName', firstName);
            const lastName = document.getElementById("lastName").value;
            formData.append('lastName', lastName);
        }

        if (role === "company") {
            const companyName = document.getElementById("companyName").value;
            formData.append('companyName', companyName);
        }

        formData.append('userType', role);
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

    return (
        <div className='bg-lighter-grey min-h-screen items-center justify-center flex'>
            <div className='bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3 flex min-w-[500px]'>
                <p className='mb-6 font-bold text-2xl flex justify-center px-8'>Register an account</p>

                <div className='flex items-center justify-center font-bold pb-2'>
                    <button className={`rounded-l p-2.5 ${role === 'searcher' ? 'text-white' : 'text-black'} ${role === 'searcher' ? 'bg-[#5A5A5A]' : 'bg-[#D6D6D6]'}`} onClick={() => setRole('searcher')}>
                        Job Seeker
                    </button>
                    <button className={`rounded-r p-2.5 ${role === 'company' ? 'text-white' : 'text-black'} ${role === 'searcher' ? 'bg-[#D6D6D6]' : 'bg-[#5A5A5A]'}`} onClick={() => setRole('company')}>
                        Company
                    </button>
                </div>

                <div>
                    {role === 'company' ?
                        <div>
                            <TextInputBox className='w-full' id='companyName' placeholder='Company name'/>
                        </div>
                        :
                        <div className='space-x-0.5'>
                            <TextInputBox id='firstName' placeholder='First name'/>
                            <TextInputBox id='lastName' placeholder='Last name'/>
                        </div>
                    }
                </div>

                <div>
                    <TextInputBox id='email' className='w-full' onBlur={()=>{validateField("email",/^\w+(-?\w+)*@\w+(-?\w+)*(\.\w{2,10})+$/)}} placeholder='Email address'/>
                    <span id="emailError" className='invisible absolute top-0'>Invalid email</span>
                </div>

                <div>
                    <TextInputBoxWithIcon id='password' type='password' onBlur={()=>{validateField("password",/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/)}} placeholder='Password' icon={<img id='toggleEye' src={showIcon} alt='' onClick={togglePasswordVisibility} className='cursor-pointer'/>}/>
                    <span id="passwordError" className='invisible absolute top-0'>Invalid password</span>
                </div>

                <div>
                    <TextInputBox className='w-full' id='confirmPassword' type='password' onBlur={checkPasswordMatch} placeholder='Confirm password'/>
                    <span id="passwordMismatchError" className='invisible absolute top-0'>Passwords don't match</span>
                </div>
                <ErrorBox message={"Invalid value for one or more fields."}/>
                <div className='p-0.5'></div>

                <button className='bg-dark-theme-grey rounded-md text-white p-2.5 flex items-center justify-center space-x-2' onClick={signUpButton}>
                    {loading ? <Loading/> : <p>Sign Up<i className="fa-solid fa-right-to-bracket pl-2"></i></p>}
                </button>

                <p className='text-center pt-4'>Already a user? <a className='LoginPage-link' href='/login'>Sign in.</a></p>
            </div>
        </div>
    );
}