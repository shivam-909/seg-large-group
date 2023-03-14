import './MyJobs.css'
import {useEffect, useState} from "react";
import Category from "./Category";
import Navbar from "../Navbar/Navbar";
import PrivateRoutes from "../../Auth/PrivateRoute";
import {useNavigate} from "react-router-dom";

export default function MyJobs() {
    const [isCompany, setCompany] = useState(false);
    const [filter, setFilter] = useState("Saved")
    const [user, setUser] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        setFilter(isCompany ? "Postings" : "Saved");
    },[isCompany])

    useEffect(() => {
        checkIsCompany();
    }, []);

    async function checkIsCompany(){
        setCompany(user.searcherID === undefined)
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
                  <div>
                  <ul className={"border-b-2 border-grey flex relative"}>
                      <li className={"filterJobs"}><button id={"Postings"} className={"filters"} onClick={() => changeFilter("Postings")} disabled={filter==="Postings"}>Job Listings</button></li>
                  </ul>
                      <button className={"justify-center flex mt-2 text-lg border-2 rounded-md p-2 w-full border-[#808080]"} onClick={() => {navigate("add")}}>Create Job</button>
                  </div>
              }
              <Category filter={filter}/>
          </div>
      </div>
      </div>
  );
}