import '../ProfilePage/Skills.css';
import React from "react";

export default function QuestionCard(props) {
    function deleteSkill(){
        document.getElementById(props.name + props.id).remove();
    }
    return (
        <div id={"Question" + props.id} className={"my-2"}>
            <input id={"Question"} className={"key w-[72%]"} placeholder={"Question"} editable={"true"} defaultValue={props.defaultVal}/>
            <div>
                <button className={"delete w-[12%]"} onClick={deleteSkill} editable={"true"}><i className="fa-solid fa-trash"></i></button>
            </div>
            <label><input type="checkbox" id={"QuestionRequired"} defaultChecked={props.defaultChecked} value={"required"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-[5px] m-[2px] rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey float-right text-center"}>Required</span></label>
        </div>
    );
}