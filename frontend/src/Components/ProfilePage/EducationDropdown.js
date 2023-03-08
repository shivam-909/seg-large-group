import './Skills.css';
import {useEffect} from "react";

export default function EducationDropdown(props) {
    function deleteEducation(){
        document.getElementById("Education" + props.id).remove();
    }
    return (
        <div id={"Education" + props.id}>
            <button className={"delete"} onClick={deleteEducation}><i className="fa-solid fa-trash"></i></button>
            <div className={"value w-[35%]"}>
                <select className={"w-full"}>
                    <option value={"GCSE"}>GCSE</option>
                    <option value={"A-Levels"}>A-levels</option>
                    <option value={"Bachelor's"}>Bachelor's</option>
                    <option value={"Master's"}>Master's</option>
                    <option value={"PhD's"}>PhD</option>
                </select>
            </div>
            <div className={"w-[50%]"}>
                <input id={"subject"} className={"grade"} placeholder={"Subject"}/>
                <input id={"grade"} className={"grade"} placeholder={"Grade"}/>
            </div>
        </div>
    );
}