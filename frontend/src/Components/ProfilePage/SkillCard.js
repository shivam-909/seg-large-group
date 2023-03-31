import './Skills.css';
import {useState} from "react";

export default function SkillCard(props) {
    const [valid, setValid] = useState(true);

    function deleteSkill(){
        document.getElementById("Skill" + props.id).remove();

    }
    const validate = function(field, regex){
        let obj = document.getElementById(field);
        if (regex.test(obj.value)){
            setValid(true)
        }
        else{
            setValid(false);
        }
    }
    return (
        <div id={"Skill" + props.id} className={"grid grid-cols-2 gap-2 my-2"} data-testid='Skill'>
           <label htmlFor={"skillInput" + props.id}>Skill</label>
            <input id={"skillInput" + props.id} onChange={() => {validate("skillInput"+props.id,/^([^,]*)$/)}} className={"key"} placeholder={"Skill"} editable={"true"} defaultValue={props.skill}/>
            <div>
            <div className={"value w-[70%] float-left"}>
                <label htmlFor={"skillDuration"}>Duration</label>
                <input id={"skillDuration"} className={"duration"} placeholder={"Duration"} type={"number"} min={"0"} editable={"true"} defaultValue={props.duration}/>
                <label htmlFor={"skillInterval"}>Interval</label>
                <select id={"skillInterval"} defaultValue={props.interval} className={"w-[60%]"} editable={"true"}>
                    <option value={"weeks"}>Week/s</option>
                    <option value={"months"}>Month/s</option>
                    <option value={"years"}>Year/s</option>
                </select>
            </div>
            <button className={"delete w-[24%]"} onClick={deleteSkill} editable={"true"}><i className="fa-solid fa-trash"></i>Delete</button>
            </div>

            {!valid && <div className={"text-red"} data-testid='Error'>
            Please remove all commas
            </div>}
        </div>
    );
}
