import '../ProfilePage/Skills.css';
import React from "react";

export default function Card(props) {
    function deleteSkill(){
        document.getElementById("Card" + props.id).remove();
    }
    return (
        <div id={"Card" + props.id} className={"my-2"}>
            <input id={props.name} className={"key w-[72%]"} placeholder={props.name} editable={"true"} defaultValue={props.key}/>
            <div>
                <button className={"delete"} onClick={deleteSkill} editable={"true"}><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>
    );
}