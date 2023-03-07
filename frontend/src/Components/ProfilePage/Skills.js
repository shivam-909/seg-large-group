import React from "react";
import {useState} from "react";
import KeyValueBox from "./KeyValueBox";

export default function Skills(props) {
    const [skills, setSkills] = useState([]);
    const [count, setCount] = useState(skills.length);

    function createSkill(){
        setSkills( [...skills, <KeyValueBox name={"Skill"} id={count}/>]);
        setCount(count + 1);
    }
    return (
        <div className={"p-2"}>
            <p className={"mb-2"}><strong>Skills: </strong> {props.isEditing && (<button className={"float-right bg-[#4b6df2] rounded-md border-2 border-dark-theme-grey text-l text-white w-8 h-8"} onClick={createSkill}><i className="fa-solid fa-plus"></i></button>)}
            </p>
            <div id={"fillSkills"} className={"inline-block"}>{skills}</div>
        </div>
    );
}