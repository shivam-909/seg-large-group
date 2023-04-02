import './MyJobs.css'
import {useEffect, useState} from "react";
import Category from "./Category";
import Navbar from "../Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import {GetData} from "../../Auth/GetUser";

export default function MyJobs() {
    const [isCompany, setCompany] = useState(false);
    const [filter, setFilter] = useState("Saved");
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            if (user.length === 0){
                await GetData().then(r => {
                    setUser(r)
                });
            }
        };
        getUser()
        setCompany(user.searcherID === undefined)
    },[user])

    useEffect(() => {
        setFilter(isCompany ? "Postings" : "Saved");
    },[isCompany])

    function changeFilter(type){
        setFilter(type);
    }

  return (
      <div>
          <Navbar/>
          {user.userID &&
      <div className='bg-lighter-grey min-h-screen justify-center flex'>
          <div className='bg-white mt-24 rounded-md px-12 py-7 space-y-3 min-w-[45%]'>
            <p className='font-bold text-3xl flex justify-center'>My Jobs</p>
              {!isCompany ?
            <ul className={"border-b-2 border-grey flex relative"}>
                <li className={"filterJobs"}><button id={"Saved"} data-testid={"Saved"} className={"filters"} onClick={() => changeFilter("Saved")} disabled={filter==="Saved"}>Saved</button></li>
                <li className={"filterJobs"}><button id={"Applied"} data-testid={"Applied"} className={"filters"} onClick={() => changeFilter("Applied")} disabled={filter==="Applied"}>Applied</button></li>
                <li className={"filterJobs"}><button id={"Interview"} className={"filters"} onClick={() => changeFilter("Interview")} disabled={filter==="Interview"}>Interviews</button></li>
                <li className={"filterJobs"}><button id={"Rejected"} className={"filters"} onClick={() => changeFilter("Rejected")} disabled={filter==="Rejected"}>Rejected</button></li>
                <li className={"filterJobs"}><button id={"Archived"} className={"filters"} onClick={() => changeFilter("Archived")} disabled={filter==="Archived"}>Archived</button></li>
            </ul>
                  :
                  <div>
                  <ul className={"border-b-2 border-grey flex relative"}>
                      <li className={"filterJobs"}><button id={"Postings"} className={"filters"} onClick={() => changeFilter("Postings")} disabled={filter==="Postings"}>Job Listings</button></li>
                  </ul>
                      <button className={"justify-center flex mt-2 text-lg border-2 rounded-md p-2 w-full border-[#808080]"} onClick={() => {navigate("add")}}>Create Job</button>
                  </div>
              }
              <Category filter={filter}/>
          </div>
      </div>}
      </div>
  );
}