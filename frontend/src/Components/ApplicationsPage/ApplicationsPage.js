import React, {useState} from "react";
import "./ApplicationsPage.css";
import TextInputBox from "../LoginPage/TextInputBoxWithIcon";
import { validateField, setVisible } from "../Validation/validate";
import MultiLineTextBox from "./MultiLineTextBox";




function UploadCV () {
    const [selectedFile, setSelectedFile]= useState();
    // const [isFilePicked, setIsFilePicked]= useState(false);
    
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        // isFilePicked(true);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('File', selectedFile);
    };

    function submitApplication() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
      
        localStorage.removeItem("email")
        localStorage.removeItem("password")
        localStorage.removeItem("rememberLogin")
        }
    // render(){
        return(
            <div className='bg-lighter-grey min-h-screen items-center justify-center flex'>
                <div className='bg-white rounded-md px-40 py-10 space-y--1'>
                    <p className='mb-2 font-bold text-2xl flex justify-center'>Make an application</p>                
                    <p className="font-bold py-3">Step 1: Upload you CV!</p>
                    
                    {/* <input type="file" name="file" onChange={this.changeHandler}/>
                    {selectedFile ? (
                    <div className="fileLabels">
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
					    <p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
                ) : (
                    <p></p>
                )}  */}

                    <div>
                        <input type="file" name="file" onChange={changeHandler}></input>
                        {/* <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
					    <p>Size in bytes: {selectedFile.size}</p> */}
                    </div>

                    <div>
                        <button className= "uploadButton" onClick={onFileUpload}>Upload!</button>
                    </div>

                    <p className="font-bold	py-3">Step 2: Your details</p>
                    <div>
                        <div>
                            <TextInputBox id='FirstName' onChange={()=>{validateField("FirstName",/^[A-Za-z]+$/)}} placeholder='First Name'/>
                            <span id="FirstNameError" className={"invisible absolute top-0"}>Invalid First Name</span>
                        </div>

                        <div>
                            <TextInputBox id='LastName' onChange={()=>{validateField("LastName",/^[A-Za-z]+$/)}} placeholder='Last Name'/>
                            <span id="LastNameError" className={"invisible absolute top-0"}>Invalid Last Name</span>
                        </div>
                        <div className={"w-full"}>
                            <TextInputBox id='email' className="w-full" onChange={()=>{validateField("email",/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)}} placeholder='Email address'/>
                            <span id="emailError" className={"invisible absolute top-0"}>Invalid Email</span>
                        </div>



                        <div>
                            <p className="px-12 py-3 space-y-10">Why did you choose to apply for this job role?</p>
                            <MultiLineTextBox id="WhyThisCompany" placeholder="Maximum 100 characters."/>
                        </div>

                        <div>
                            <p className="px-12 py-3 space-y-10">Why do you think you are suitable for this job?</p>
                            <MultiLineTextBox id="WhyThisCompany" placeholder="Maximum 100 characters." />
                        </div>



                        <p className="font-bold py-3	">Step 3: Confirm your details</p>
                        <div>
                            <p>Your full name is: </p>
                            <p>Your email address is: </p>
                        </div>

                        <div className='flex space-x-2 items-center'>
                            <input id='confirmDetails' type='checkbox' className='w-4 h-4 py-3 inline-block accent-dark-theme-grey'/>
                            <p>I confirm I have read all my details and they are up to date.</p>
                         </div>

                         <div>
                            <button className='bg-dark-theme-grey rounded-md text-white p-2.5 flex items-center justify-center space-x-2' onClick={submitApplication}>
                            <p>Submit Application</p>
                            </button>
                         </div>

                    </div>

                </div>


            </div>
        );
    }

export default UploadCV;