import './Skills.css';
import React from "react";

export default function KeyValueBox(props) {
    function deleteSkill(){
        document.getElementById(props.name + props.id).remove();
    }
    return (
        <div id={props.name + props.id}>
            <input className={"key"} placeholder={props.name}/>
            <button className={"delete"} onClick={deleteSkill}><i className="fa-solid fa-trash"></i></button>
            <input className={"duration"} placeholder={"Duration"} type={"number"}/>
        </div>
    );
}