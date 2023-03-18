import {useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";

export default function CompanyJobCard(props) {
    const navigate = useNavigate();

    let date = new Date(Date(props.date));
    let format = date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString()
    return (
        <div className='border-2 border-darker-grey rounded-xl w-full p-4 m-2'>
            <div className={"float-right grid grid-cols-1"}>
                <button onClick={() => {navigate("/jobs/edit/" + props.id)}} className={""}><i className="fa-solid fa-pen-to-square text-xl"></i></button>
                <button onClick={async () => {await axios.delete("http://localhost:8000/api/jobs/" + props.id); window.location.reload(false)}} className={"bottom-0"}><i className="fa-solid fa-trash text-red text-xl"></i></button>
            </div>
            <div onClick={() => {navigate("/jobs/applicants/"+props.id)}} className={"hover:cursor-pointer"}>
                <p className='font-bold text-xl'>{props.title}</p>
                <p>{props.schedule}</p>
                <p>{props.location}</p>
                <p className='mb-2'>{format}</p>
            </div>
        </div>
    );
}