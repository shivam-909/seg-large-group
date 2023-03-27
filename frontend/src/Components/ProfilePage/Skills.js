import React, {useEffect} from "react";
import {useState} from "react";
import SkillCard from "./SkillCard";

export default function Skills(props) {
    const [skills, setSkills] = useState([]);
    const [count, setCount] = useState(skills.length);

    useEffect(() => {
        if (props.profile.length === 0){
            return;
        }
        for (const skill of props.profile.searcher?.skills){
            let skillVals = skill.split(",")
            createSkill(skillVals[0], skillVals[1], skillVals[2])
        }
    },[props.profile]) // eslint-disable-line

    function createSkill(skill, duration, interval){
        setSkills( [...skills, <SkillCard id={count} skill={skill} val={duration} interval={interval} editable={props.isEditing}/>]);
        setCount(count + 1);
    }
    return (
        <div className={"p-2"}>
            <p className={"mb-2"}><strong>Skills: </strong> {props.isEditing && (<button className={"float-right bg-[#4b6df2] rounded-md border-2 border-dark-theme-grey text-l text-white w-8 h-8"} onClick={() => {createSkill("","","")}}><i className="fa-solid fa-plus"></i></button>)}
            </p>
            <div id={"fillSkills"} className={"inline-block"}>{skills}</div>
        </div>
    );
}