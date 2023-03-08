import './Skills.css';
import React from "react";

export default function EducationDropdown(props) {
    function deleteEducation(){
        document.getElementById("Education" + props.id).remove();
    }
    return (
        <div id={"Education" + props.id} className={"my-2 w-[109%] border-2 border-[#c3c3c3] rounded-md p-2 grid grid-cols-2 gap-2"}>
            <input id={"subject"} className={"grade w-full"} placeholder={"Subject"}/>
            <div>
            <button className={"delete"} onClick={deleteEducation}><i className="fa-solid fa-trash"></i></button>
            <div className={"value w-[70%]"}>
                <select className={"w-full"}>
                    <option value={"GCSE"}>GCSE</option>
                    <option value={"A-Levels"}>A-levels</option>
                    <option value={"Bachelor's"}>Bachelor's</option>
                    <option value={"Master's"}>Master's</option>
                    <option value={"PhD's"}>PhD</option>
                </select>
            </div>
            </div>
            <input id={"grade"} className={"grade w-full"} placeholder={"Grade"}/>
            <div className={"value"}>
                <input id={props.name + "duration"} className={"duration"} placeholder={"Duration"} type={"number"} min={"0"}/>
                <select className={""}>
                    <option value={"weeks"}>Week/s</option>
                    <option value={"months"}>Month/s</option>
                    <option value={"years"}>Year/s</option>
                </select>
            </div>
        </div>
    );
}