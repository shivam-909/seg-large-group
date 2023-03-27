import {useNavigate} from "react-router-dom";
import React from "react";

export default function ApplicantCard(props) {
    const navigate = useNavigate();
    return (
        <div className='border-2 border-darker-grey rounded-xl w-full p-4 m-2 hover:cursor-pointer' onClick={() => {navigate("/application/"+props.id)}}>
            <img className={"rounded-full float-left mr-2"} src={props.pfpUrl} alt="Avatar" height={"80"} width={"80"}/>
            <div>
                <p className='font-bold text-xl'>{props.name}</p>
                <p>{props.email}</p>
                <p className={"text-blue font-bold"}>{props.status}</p>
            </div>
        </div>
    );
}