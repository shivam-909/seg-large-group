import '../ProfilePage/Skills.css';
import React from "react";

export default function Card(props) {
    function deleteSkill() {
        document.getElementById(props.name + props.id).remove();
    }

    return (
        <div data-testid='id-input' id={props.name + props.id} tag={props.name} className={"my-2"}>
            <input id={props.name} className={"key w-[85%]"} placeholder={props.name} editable={"true"}
                   defaultValue={props.defaultVal}/>
            <div data-testid='delete-button'>
                <button className={"delete w-[12%]"} onClick={deleteSkill} editable={"true"}><i
                    className="fa-solid fa-trash"></i></button>
            </div>
        </div>
    );
}
