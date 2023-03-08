import './Skills.css';
import React from "react";

export default function KeyValueBox(props) {
    function deleteSkill(){
        document.getElementById(props.name + props.id).remove();
    }
    return (
        <div id={props.name + props.id} className={"grid grid-cols-2 gap-2 my-2 w-[107%]"}>
            <input id={props.name + "key"} className={"key"} placeholder={props.name} editable={"true"}/>
            <div>
            <div className={"value w-[70%] float-left"}>
                <input id={props.name + "duration"} className={"duration"} placeholder={"Duration"} type={"number"} min={"0"} editable={"true"}/>
                <select className={"w-[50%]"} editable={"true"}>
                    <option value={"weeks"}>Week/s</option>
                    <option value={"months"}>Month/s</option>
                    <option value={"years"}>Year/s</option>
                </select>
            </div>
            <button className={"delete"} onClick={deleteSkill}><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>
    );
}