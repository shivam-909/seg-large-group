import axios from "axios";
import {useEffect, useState} from "react";

export default function NewNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            axios.post('http://localhost:8000/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}})
                .then(() => setIsLoggedIn(true))
                .catch(() => setIsLoggedIn(false));
        }
    }, [isLoggedIn]);

    return (
        <div className='bg-dark-theme-grey flex justify-between w-screen py-6'>
            <p className='font-bold text-white ml-12 text-xl'>JobLinkLogo</p>
            {isLoggedIn ?
                <div className='mr-12 flex items-center space-x-10'>
                    {/*<button className='fa-solid fa-xl fa-message text-white'/>*/}
                    <button className='fa-solid fa-xl fa-bell text-white'/>
                    <button className='fa-solid fa-xl fa-user text-white'/>
                </div>
                :
                <div className='mr-12 flex items-center space-x-5'>
                    <button className='font-bold text-lg text-white'><a href='/login'>Sign in</a></button>
                    <div className='w-[1px] bg-white'></div>
                    <button className='font-bold text-lg text-white ml-4'><a href='/signup'>Sign up</a></button>
                </div>
            }
        </div>
    );
}