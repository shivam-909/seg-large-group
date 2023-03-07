import React from "react";
import {useState} from "react";
import KeyValueBox from "./KeyValueBox";

export default function Education(props) {
    const [education, setEducation] = useState([]);
    const [count, setCount] = useState(education.length);

    function createSkill(){
        setEducation( [...education, <KeyValueBox name={"Education"} id={count}/>]);
        setCount(count + 1);
    }
    return (
        <div className={"p-2"}>
            <p className={"mb-2"}><strong>Education: </strong> {props.isEditing && (<button className={"float-right bg-[#4b6df2] rounded-md border-2 border-dark-theme-grey text-l text-white w-8 h-8"} onClick={createSkill}><i className="fa-solid fa-plus"></i></button>)}
            </p>
            <div id={"fillEducation"} className={"inline-block"}>{education}</div>
        </div>
    );
}