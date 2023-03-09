import './MyJobs.css'
import {useEffect, useState} from "react";
import Category from "./Category";
import Navbar from "../Navbar/Navbar";
import PrivateRoutes from "../../Auth/PrivateRoute";
import axios from "axios";

export default function MyJobs() {
    const [isCompany, setCompany] = useState(false);

    useEffect(() => {
        checkIsCompany();
    }, []);

    async function checkIsCompany(){
        const token = localStorage.getItem("access");
        const userID = await axios.post('http://localhost:8000/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}}).then(response => {return response.data})
        const searcherID = await axios.get("http://localhost:8000/user/"+userID).then(response => {return response.data.searcherID});
        setCompany(searcherID === undefined)
    }
    return (
        <div>
            <PrivateRoutes/>
            <Navbar/>
            <div className='bg-lighter-grey min-h-screen justify-center flex'>
                <div className='bg-white mt-36 rounded-md px-12 py-7 space-y-3 min-w-[45%]'>
                    <p className='font-bold text-3xl flex justify-center'>Edit Jobs</p>
                </div>
            </div>
        </div>
    );
}