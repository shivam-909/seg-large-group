import './Skills.css';

export default function EducationDropdown(props) {
    function deleteEducation(){
        document.getElementById("Education" + props.id).remove();
    }
    return (
        <div id={"Education" + props.id} className={"mb-5 w-[109%] border-2 border-[#c3c3c3] rounded-md p-2"}>
            <button className={"delete"} onClick={deleteEducation}><i className="fa-solid fa-trash"></i></button>
            <div className={"value"}>
                <select className={"w-full"}>
                    <option value={"GCSE"}>GCSE</option>
                    <option value={"A-Levels"}>A-levels</option>
                    <option value={"Bachelor's"}>Bachelor's</option>
                    <option value={"Master's"}>Master's</option>
                    <option value={"PhD's"}>PhD</option>
                </select>
            </div>
            <div className={"w-[50%]"}>
                <input id={"subject"} className={"grade w-full"} placeholder={"Subject"}/>
                <input id={"grade"} className={"grade w-full"} placeholder={"Grade"}/>
            </div>
        </div>
    );
}