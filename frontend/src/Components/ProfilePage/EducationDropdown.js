import './Skills.css';
import React, {useState} from "react";

export default function EducationDropdown(props) {
    const [valid, setValid] = useState(true);
    function deleteEducation(){
        document.getElementById("Education" + props.id).remove();
    }
    const validate = function(){
        const regex = /^([^,]*)$/
        let grade = document.getElementById("grade"+props.id).value;
        let subject = document.getElementById("subject"+props.id).value;
        if (regex.test(grade) && regex.test(subject)){
            setValid(true)
        }
        else{
            setValid(false);
        }
    }
    return (
        <div id={"Education" + props.id} className={"my-2 border-2 border-[#c3c3c3] rounded-md p-2 grid grid-cols-2 gap-2"}>
            <input id={"subject"+props.id} onChange={validate} className={"grade w-full"} placeholder={"Subject"} editable={"true"} defaultValue={props.subject}/>
            <div>
            <button className={"delete"} onClick={deleteEducation} editable={"true"}><i className="fa-solid fa-trash"></i></button>
            <div id={"course"} className={"value w-[70%]"}>
                <select defaultValue={props.type} className={"w-full"} editable={"true"}>
                    <option value={"GCSEs"}>GCSE</option>
                    <option value={"A-Levels"}>A-levels</option>
                    <option value={"Bachelor's"}>Bachelor's</option>
                    <option value={"Master's"}>Master's</option>
                    <option value={"PhD's"}>PhD</option>
                </select>
            </div>
            </div>
            <input id={"grade"+props.id} onChange={validate} defaultValue={props.grade} className={"grade w-full"} placeholder={"Grade"} editable={"true"}/>
            <div className={"value"}>
                <input id={"educationDuration"} defaultValue={props.duration} className={"duration"} placeholder={"Duration"} type={"number"} min={"0"} editable={"true"}/>
                <select className={"w-[60%]"} defaultValue={props.interval} editable={"true"}>
                    <option value={"weeks"}>Week/s</option>
                    <option value={"months"}>Month/s</option>
                    <option value={"years"}>Year/s</option>
                </select>
            </div>
            {!valid && <div className={"text-red"}>Please remove all commas</div>}
        </div>
    );
}