import './Navbar.css';
import axios from "axios";
import {useEffect, useState} from "react";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            axios.post('http://localhost:8000/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}})
                .then(() => setIsLoggedIn(true))
                .catch(() => setIsLoggedIn(false));
        }
    }, [isLoggedIn]);

    function showProfile() {
        const x = document.getElementById("expandProfile");
        x.style.display === "block" ? x.style.display = "none" : x.style.display = "block";
    }

    function removeTokens() {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    }

    return (
    <div className = "topnav">
        <ul className={"navbar"}>
            <li className="float-left"><a href="/"><i className="fa-solid fa-house text-xl"></i></a></li>
            {isLoggedIn ?
                <div className='mr-5'>
                    <li className='float-right'><a onClick={showProfile}><i className="fa-solid fa-user text-xl"></i></a></li>
                    <li className='float-right'><a href='/notifications'><i className="fa-solid fa-bell text-xl"></i></a></li>
                </div>
                :
                <div className='mr-5 space-x-5'>
                    <button className='font-bold text-lg float-right'><a href='/login'>Log in</a></button>
                    <div className='w-[1px] bg-white'></div>
                    <button className='font-bold text-lg ml-4 float-right'><a href='/signup'>Sign up</a></button>
                </div>
            }
        </ul>
        <div className="top-16 border-x border-b border-lighter-grey" id="expandProfile">
            <a href="/profile"><i id="icon" className="fa-solid fa-id-card pr-2"></i> Profile</a>
            <a href="/saved"><i id="icon" className="fa-solid fa-folder-open pr-2"></i>My Jobs</a>
            <a href="/settings"><i id="icon" className="fa-solid fa-gear pr-2"></i>Settings</a>
            <a href="/login" onClick={removeTokens}><i id="icon" className="fa-solid fa-right-from-bracket pr-2"></i>Log Out</a>
        </div>
    </div>
    );
  }  