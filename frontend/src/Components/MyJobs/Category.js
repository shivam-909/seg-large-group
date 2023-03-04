import React, {useEffect, useState} from "react";
import JobCard from "./JobCard";

export default function Category(props) {
    const [jobsList, setJobsList] = useState([]);
    function addCard(title, company, location){
        setJobsList( [...jobsList, <JobCard title={title} company={company} location={location}/>]);
    }
    //Temporary way to show cards
    function initializeCards(){
        addCard("Software Engineer", "Expedia", "London")
    }
    return (
        <div className='items-center justify-center flex relative'>
            <button onClick={initializeCards}>Add Card</button>
            <div className={"display-block"}>
                {jobsList}
            </div>
        </div>
    );
}