import './Navbar.css';
import axios from "axios";
import {useEffect, useState} from "react";
import RefreshToken from "../../Auth/RefreshToken";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState(false);


    useEffect(() => {
        async function checkLoggedIn() {
            await RefreshToken();
            const token = localStorage.getItem("access");
            if (token) {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/echo`, {}, {headers: {Authorization: `Bearer ${token}`}})
                    .then(res => {
                        setIsLoggedIn(true);
                        setUserID(res.data);
                    })
                    .catch(() => setIsLoggedIn(false));
            }
        }
        checkLoggedIn();
    }, [isLoggedIn]);

    function showProfile() {
        const x = document.getElementById("expandProfile");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }
    return (
    <div data-testid= 'topnav-test'className = "topnav">
        <ul className={"navbar"}>
            <li className="float-left"><a href="/"><i className="fa-solid fa-house text-xl"></i></a></li>
            {isLoggedIn ?
                <div className={"mr-5"}>
                    <li className='float-right'><a className="" href="##" onClick={showProfile}><i className="fa-solid fa-user text-xl"></i></a></li>
                    <li className='float-right'><a className="" href="/notifications"><i className="fa-solid fa-bell text-xl"></i></a></li>
                </div>
                :
                <div className='mr-5 space-x-5'>
                    <button className='font-bold text-lg float-right'><a href='/login'>Log in</a></button>
                    <div className='w-[1px] bg-white'></div>
                    <button className='font-bold text-lg ml-4 float-right'><a href='/signup'>Sign up</a></button>
                </div>
            }

        </ul>
        <div data-testid='navbar-test' className="top-16" id="expandProfile">
            <a href={"/profile/" + userID}><i id="icon" className="fa-solid fa-id-card pr-2"></i> Profile</a>
            <a href="/jobs"><i id="icon" className="fa-solid fa-folder-open pr-2"></i>My Jobs</a>
            <a href={'/login'} onClick={() => {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
            }}><i
                className="fa-solid fa-right-from-bracket pr-2"></i>Log Out</a>
        </div> 
    </div>
    );
  }  