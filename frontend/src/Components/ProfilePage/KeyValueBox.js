import './Skills.css';
import React from "react";

export default function KeyValueBox(props) {
    function deleteSkill(){
        document.getElementById(props.name + props.id).remove();
    }
    return (
        <div id={props.name + props.id}>
            <button className={"delete"} onClick={deleteSkill}><i className="fa-solid fa-trash"></i></button>
            <input id={props.name + "key"} className={"key"} placeholder={props.name}/>
            <div className={"value w-[42%]"}>
                <input id={props.name + "duration"} className={"duration"} placeholder={"Duration"} type={"number"} min={"0"}/>
                <select className={"w-[50%]"}>
                    <option value={"weeks"}>Week/s</option>
                    <option value={"months"}>Month/s</option>
                    <option value={"years"}>Year/s</option>
                </select>
            </div>
        </div>
    );
}