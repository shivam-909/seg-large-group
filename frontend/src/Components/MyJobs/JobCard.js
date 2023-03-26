import React from "react";
import {useNavigate} from "react-router-dom";

export default function JobCard(props) {
    const navigate = useNavigate();
    return (
        <div className='border-2 border-darker-grey rounded-xl w-full p-4 m-2'>
            <div onClick={() => {navigate("/viewjob/"+props.id)}} className={"hover:cursor-pointer"}>
                {props.isSaved && <button className={"border-2 border-blue rounded-md px-5 py-1 text-white bg-blue float-right font-bold"}>Apply now</button>}
                <p className='font-bold text-xl'>{props.title}</p>
                <p>{props.company}</p>
                <p className='mb-3'>{props.location}</p>
            </div>
        </div>
    );
}