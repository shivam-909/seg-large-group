import SearchBar from "./SearchBar";
import {useState} from "react";
import TempCard from "./TempCard";
import TempDetail from "./TempDetail";
import Filters from "./Filters";

function SearchPage() {
    const [loadResults, setLoadResults] = useState(false);
    const [showJobTitleInputErrorMessage, setShowJobTitleInputErrorMessage] = useState(false);
    const [showLocationInputErrorMessage, setShowLocationInputErrorMessage] = useState(false);

    function showResults() {
        if (isJobTitleInputValid() & isLocationInputValid()) {
            setLoadResults(true);
        }
    }

    function isJobTitleInputValid() {
        if (document.getElementById('jobTitleInput').value === '') {
            setShowJobTitleInputErrorMessage(true);
            return false;
        }
        return true;
    }

    function isLocationInputValid() {
        if (document.getElementById('locationInput').value === '') {
            setShowLocationInputErrorMessage(true);
            return false
        }
        return true;
    }

    return (
        <div className='mt-24 space-y-5 flex-col'>
            <SearchBar onclick={showResults} onJobTitleInputChange={() => setShowJobTitleInputErrorMessage(false)} onLocationInputChange={() => setShowLocationInputErrorMessage(false)} displayJobTitleInputErrorMessage={showJobTitleInputErrorMessage} displayLocationInputErrorMessage={showLocationInputErrorMessage}/>
            {loadResults &&
                <div className='space-y-12'>
                    <Filters/>
                    <div className='flex mx-96 space-x-5 pl-72'>
                        <div className="justify-end inline-grid space-y-3">
                            <TempCard/>
                            <TempCard/>
                            <TempCard/>
                            <TempCard/>
                            <TempCard/>
                            <TempCard/>
                        </div>
                        <div className='w-1/2'>
                            <TempDetail/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default SearchPage;
