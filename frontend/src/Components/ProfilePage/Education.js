import React, {useEffect} from "react";
import {useState} from "react";
import EducationDropdown from "./EducationDropdown";

export default function Education(props) {
    const [education, setEducation] = useState([]);
    const [count, setCount] = useState(education.length);

    useEffect(() => {
        if (props.profile.length === 0){
            return;
        }
        setEducation([])
        for (const qualification of props.profile.searcher?.qualifications){
            let qual = qualification.split(",")
            createSkill(qual[0], qual[1], qual[2], qual[3], qual[4])
        }
    },[props.profile]) // eslint-disable-line

    function createSkill(subject, type, grade){
        setEducation( [...education, <EducationDropdown name={"Education"} id={count} editing={props.isEditing} subject={subject} type={type} grade={grade}/>]);
        setCount(count + 1);
    }
    return (
        <div className={"p-2"}>
            <p className={"mb-2"}><strong>Education: </strong> {props.isEditing && (<button className={"float-right bg-dark-theme-grey rounded-md border-2 border-dark-theme-grey text-l text-white w-8 h-8"} onClick={() => {createSkill("", "", "")}}><i className="fa-solid fa-plus"></i></button>)}
            </p>
            <div id={"fillEducation"} className={"inline-block"}>{education}</div>
        </div>
    );
}