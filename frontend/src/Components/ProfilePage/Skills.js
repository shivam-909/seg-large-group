import React, {useEffect} from "react";
import {useState} from "react";
import SkillCard from "./SkillCard";

export default function Skills(props) {

    const [skills, setSkills] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        async function getSkills(){
            setSkills([])
            if (props.profile.length === 0 || !props.profile.searcher?.skills){
                return;
            }
            for (const skill of props.profile.searcher?.skills){
                let skillVals = skill.split(",")
                createSkill(skillVals[0], skillVals[1], skillVals[2])
            }
        }
        setSkills([])
        getSkills()
    },[props.profile]) // eslint-disable-line

    function createSkill(skill, duration, interval){
        setSkills( prevSkills => [...prevSkills, <SkillCard id={count} skill={skill} duration={duration} interval={interval} editable={props.isEditing}/>]);
        setCount(count + 1);
    }
    return (
        <div className={"p-2"}>
            <p className={"mb-2"}><strong>Skills: </strong> {props.isEditing && (<button className={"float-right bg-dark-theme-grey rounded-md border-2 border-dark-theme-grey text-l text-white w-8 h-8"} onClick={() => {createSkill("","","")}}><i className="fa-solid fa-plus"></i></button>)}
            </p>
            <div id={"fillSkills"} className={"inline-block"}>{skills}</div>
        </div>
    );
}