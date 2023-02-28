import { useState } from "react";

function BinaryOption(props) {
    let [selected, setSelected] = useState(props.option1);
    function alternate(){
        selected === props.option1 ? setSelected(props.option2) : setSelected(props.option1)
        if (selected === props.option2){
            highlight(props.option2,true)
            highlight(props.option1, false)
        }
        else{
            highlight(props.option2,false)
            highlight(props.option1, true)
        }
    }
    function highlight(itemName, flag){
        let item = document.getElementById(itemName)
        item.style.backgroundColor = flag ? "#d6d6d6" : "#5A5A5A";
        item.style.color = flag ? "black" : "white";
    }
    return (
        <div className='items-center justify-center flex relative'>
            {/*eslint-disable-next-line*/}
            <button id={props.option1} disabled={selected===props.option1} className="bg-grey-contrast text-white border-2 w-full rounded-md rounded-r-none border-dark-theme-grey p-1 font-bold" onClick={() => {alternate(); {props.function1()}}}>{props.option1}</button>
            {/*eslint-disable-next-line*/}
            <button id={props.option2} disabled={selected===props.option2} className="bg-lighter-grey border-2 w-full rounded-md rounded-l-none border-dark-theme-grey p-1 font-bold" onClick={() => {alternate(); {props.function2()}}}>{props.option2}</button>
        </div>
    );
}

export default BinaryOption;