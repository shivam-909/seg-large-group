import './MyJobs.css'
import {useEffect, useState} from "react";
import Category from "./Category";
import Navbar from "../Navbar/Navbar";
import PrivateRoutes from "../../Auth/PrivateRoute";
import axios from "axios";

export default function MyJobs() {
    const [isCompany, setCompany] = useState(false);
    const [filter, setFilter] = useState("Saved")

    useEffect(() => {
        setFilter(isCompany ? "Postings" : "Saved");
    },[isCompany])

    useEffect(() => {
        checkIsCompany();
    }, []);

    async function checkIsCompany(){
        const token = localStorage.getItem("access");
        const userID = await axios.post('http://localhost:8000/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}}).then(response => {return response.data})
        const searcherID = await axios.get("http://localhost:8000/user/"+userID).then(response => {return response.data.searcherID});
        setCompany(searcherID === undefined)
    }

    function changeFilter(type){
        setFilter(type);
    }

  return (
      <div>
          <PrivateRoutes/>
          <Navbar/>
      <div className='bg-lighter-grey min-h-screen justify-center flex'>
          <div className='bg-white mt-36 rounded-md px-12 py-7 space-y-3 min-w-[45%]'>
            <p className='font-bold text-3xl flex justify-center'>My Jobs</p>
              {!isCompany ?
            <ul className={"border-b-2 border-grey flex relative"}>
                <li className={"filterJobs"}><button id={"Saved"} className={"filters"} onClick={() => changeFilter("Saved")} disabled={filter==="Saved"}>Saved</button></li>
                <li className={"filterJobs"}><button id={"Applied"} className={"filters"} onClick={() => changeFilter("Applied")} disabled={filter==="Applied"}>Applied</button></li>
                <li className={"filterJobs"}><button id={"Interview"} className={"filters"} onClick={() => changeFilter("Interview")} disabled={filter==="Interview"}>Interviews</button></li>
                <li className={"filterJobs"}><button id={"Archived"} className={"filters"} onClick={() => changeFilter("Archived")} disabled={filter==="Archived"}>Archived</button></li>
            </ul>
                  :
                  <ul className={"border-b-2 border-grey flex relative"}>
                      <li className={"filterJobs"}><button id={"Postings"} className={"filters"} onClick={() => changeFilter("Postings")} disabled={filter==="Postings"}>Job Listings</button></li>
                  </ul>}
              <Category filter={filter}/>
          </div>
      </div>
      </div>
  );
}