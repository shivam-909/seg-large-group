import {Location} from "../ProfilePage/Location";
import React from "react";

function SearchBar(props) {
    return (
        <div className='flex items-start justify-center space-x-4'>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0FpC_LZEQb2iyXwOEcyM57llwjE9hBOQ&libraries=places"/>
            <div className='w-1/4'>
                <input id='jobTitleInput' className="p-2 border rounded-md border-dark-theme-grey min-w-full" placeholder='Job title' onChange={props.onJobTitleInputChange}/>
                {props.displayJobTitleInputErrorMessage &&
                    <p id='jobTitleInputErrorMessage' className='text-sm text-red'>Please enter a job title.</p>
                }
            </div>
            <div className='w-1/4'>
                <Location disabled={false} defaultLocation={""} onChange={props.onLocationInputChange}/>
                {props.displayLocationInputErrorMessage &&
                    <p id='locationInputErrorMessage' className='text-sm text-red'>Please enter a location.</p>
                }
            </div>
            <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white' onClick={props.onclick}>Search</button>
        </div>
    );
}

export default SearchBar;