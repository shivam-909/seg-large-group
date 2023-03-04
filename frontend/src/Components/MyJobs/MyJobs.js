import './MyJobs.css'
import {useState} from "react";
import Category from "./Category";
import Navbar from "../Navbar/Navbar";

export default function MyJobs() {
    const [filter, setFilter] = useState("saved") // eslint-disable-line
    function changeFilter(type){
        setFilter(type);
    }
  return (
      <div>
          <Navbar/>
      <div className='bg-lighter-grey min-h-screen items-center justify-center flex'>
          <div className='bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3 min-w-[45%] mt-36'>
            <p className='mb-6 font-bold text-3xl flex justify-center'>My Jobs</p>
            <ul className={"border-b-2 border-grey items-center flex justify-center"}>
                <li className={"filterJobs"}><button id={"saved"} className={"filters"} onClick={() => changeFilter("saved")} disabled={filter==="saved"}>Saved</button></li>
                <li className={"filterJobs"}><button id={"applied"} className={"filters"} onClick={() => changeFilter("applied")} disabled={filter==="applied"}>Applied</button></li>
                <li className={"filterJobs"}><button id={"interviews"} className={"filters"} onClick={() => changeFilter("interviews")} disabled={filter==="interviews"}>Interviews</button></li>
                <li className={"filterJobs"}><button id={"archived"} className={"filters"} onClick={() => changeFilter("archived")} disabled={filter==="archived"}>Archived</button></li>
            </ul>
              <Category filter={filter}/>
          </div>
      </div>
      </div>
  );
}