import './Skills.css'
import React from "react";
import {useState} from "react";
import {validateField} from "../Validation/validate";

export default function Skills(props) {
    const [skills, setSkills] = useState(0);

    function deleteSkill(id){
        document.getElementById(id).remove();
    }

    function createSkill(){
        const div = document.createElement("div");
        const skill = document.createElement("input");
        const duration = document.createElement("input");
        const del = document.createElement("button");

        div.setAttribute("id", skills);
        skill.setAttribute("class","skill");
        skill.setAttribute("placeholder","Skill");
        duration.setAttribute("class","duration");
        duration.setAttribute("placeholder","Duration");
        del.setAttribute("class","delete");

        skill.addEventListener("onBlur", () => {validateField(duration, /^[0-9]+$/)})
        del.addEventListener("click", () => {deleteSkill(skills)});

        del.innerHTML = '<i class="fa-solid fa-trash"></i>';
        const container = document.getElementById("fillSkills");

        container.appendChild(div);
        div.appendChild(del);
        div.appendChild(skill);
        div.appendChild(duration);
        setSkills(skills + 1);
    }
    return (
        <div className={"p-2"}>
            <p className={"mb-2"}><strong>Skills: </strong> {props.isEditing && (<button className={"float-right bg-[#4b6df2] rounded-md border-2 border-dark-theme-grey text-l text-white w-8 h-8"} onClick={createSkill}><i className="fa-solid fa-plus"></i></button>)}
            </p>
            <div id={"fillSkills"} className={"inline-block"}></div>
        </div>
    );
}