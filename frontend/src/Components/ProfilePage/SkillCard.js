import './Skills.css';
import React from "react";

export default function SkillCard(props) {
    function deleteSkill(){
        document.getElementById("Skill" + props.id).remove();
    }
    return (
        <div id={"Skill" + props.id} className={"grid grid-cols-2 gap-2 my-2"}>
            <input id={"skill"} className={"key"} placeholder={"Skill"} editable={"true"} defaultValue={props.skill}/>
            <div>
            <div className={"value w-[70%] float-left"}>
                <input id={"skillDuration"} className={"duration"} placeholder={"Duration"} type={"number"} min={"0"} editable={"true"} defaultValue={props.val}/>
                <select id={"skillInterval"} defaultValue={props.interval} className={"w-[50%]"} editable={"true"}>
                    <option value={"weeks"}>Week/s</option>
                    <option value={"months"}>Month/s</option>
                    <option value={"years"}>Year/s</option>
                </select>
            </div>
            <button className={"delete"} onClick={deleteSkill} editable={"true"}><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>
    );
}