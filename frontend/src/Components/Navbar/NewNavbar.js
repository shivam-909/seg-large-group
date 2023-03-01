import {useState} from "react";

export default function NewNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // function isLoggedIn() {
    //     if (localStorage.getItem("access") !== null) {
    //         setIsLoggedIn(true);
    //     }
    // }

    return (
        <div className='bg-dark-theme-grey flex justify-between w-screen py-6'>
            <p className='font-bold text-white ml-12 text-xl'>JobLinkLogo</p>
            {isLoggedIn ?
                <div className='mr-12 flex items-center space-x-10'>
                    <button className='fa-solid fa-xl fa-message text-white'/>
                    <button className='fa-solid fa-xl fa-bell text-white'/>
                    <button className='fa-solid fa-xl fa-user text-white'/>
                </div>
                :
                <div className='mr-12 flex items-center space-x-5'>
                    <button className='font-bold text-lg text-white'><a href='/login'>Sign in</a></button>
                    <div className='w-[1px] bg-white'></div>
                    <button className='font-bold text-lg text-white ml-4'>Sign up</button>
                </div>
            }
        </div>
    );
}