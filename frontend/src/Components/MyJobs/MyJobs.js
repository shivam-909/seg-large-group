import './MyJobs.css'
import {useState} from "react";
import Category from "./Category";
import Navbar from "../Navbar/Navbar";

export default function MyJobs() {
    const [filter, setFilter] = useState("Saved") // eslint-disable-line
    function changeFilter(type){
        setFilter(type);
    }

  return (
      <div>
          <Navbar/>
          <div className='bg-lighter-grey min-h-screen justify-center flex'>
              <div className='bg-white mt-36 rounded-md px-12 py-7 space-y-3 min-w-[45%]'>
                <p className='font-bold text-3xl flex justify-center'>My Jobs</p>
                <ul className={"border-b-2 border-grey flex relative"}>
                    <li className={"filterJobs"}><button id={"Saved"} className={"filters"} onClick={() => changeFilter("Saved")} disabled={filter==="Saved"}>Saved</button></li>
                    <li className={"filterJobs"}><button id={"Applied"} className={"filters"} onClick={() => changeFilter("Applied")} disabled={filter==="Applied"}>Applied</button></li>
                    <li className={"filterJobs"}><button id={"Interview"} className={"filters"} onClick={() => changeFilter("Interview")} disabled={filter==="Interview"}>Interviews</button></li>
                    <li className={"filterJobs"}><button id={"Archived"} className={"filters"} onClick={() => changeFilter("Archived")} disabled={filter==="Archived"}>Archived</button></li>
                </ul>
                  <Category filter={filter}/>
              </div>
          </div>
      </div>
  );
}