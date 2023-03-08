import './Skills.css';
import React from "react";

export default function EducationDropdown(props) {
    function deleteEducation(){
        document.getElementById("Education" + props.id).remove();
    }
    return (
        <div id={"Education" + props.id} className={"my-2 w-[109%] border-2 border-[#c3c3c3] rounded-md p-2 grid grid-cols-2 gap-2"}>
            <input id={props.id + "subject"} className={"grade w-full"} placeholder={"Subject"} editable={"true"}/>
            <div>
            <button className={"delete"} onClick={deleteEducation} editable={"true"}><i className="fa-solid fa-trash"></i></button>
            <div id={props.id + "course"} className={"value w-[70%]"}>
                <select className={"w-full"} editable={"true"}>
                    <option value={"GCSE"}>GCSE</option>
                    <option value={"A-Levels"}>A-levels</option>
                    <option value={"Bachelor's"}>Bachelor's</option>
                    <option value={"Master's"}>Master's</option>
                    <option value={"PhD's"}>PhD</option>
                </select>
            </div>
            </div>
            <input id={props.id + "grade"} className={"grade w-full"} placeholder={"Grade"} editable={"true"}/>
            <div className={"value"}>
                <input id={props.id + "duration"} className={"duration"} placeholder={"Duration"} type={"number"} min={"0"} editable={"true"}/>
                <select className={""} editable={"true"}>
                    <option value={"weeks"}>Week/s</option>
                    <option value={"months"}>Month/s</option>
                    <option value={"years"}>Year/s</option>
                </select>
            </div>
        </div>
    );
}