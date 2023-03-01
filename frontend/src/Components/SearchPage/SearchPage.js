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
            {loadResults ?
                <div className='space-y-12'>
                    <Filters/>
                    <div className='flex items-start justify-center space-x-5 mx-8'>
                        <div className='space-y-3'>
                            <TempCard/>
                            <TempCard/>
                            <TempCard/>
                            <TempCard/>
                            <TempCard/>
                            <TempCard/>
                        </div>
                        <TempDetail/>
                    </div>
                </div>
                :
                <div className='pt-12 space-y-24'>
                    <div className='flex flex-col items-center justify-center space-y-5'>
                        <p>Looking for a job? <a className='font-bold' href='/'>Upload your CV.</a></p>
                        <p>Looking for your next hire? <a className='font-bold' href='/'>Post a job.</a></p>
                    </div>
                    <div className='bg-darker-grey min-w-screen flex items-center justify-center'>
                        <p>ADVERTISE THE APP HERE</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default SearchPage;
