function SearchBar(props) {
    return (
      <div>
        <div className='flex items-start justify-center space-x-4'>
            <div className='w-1/4'>
                <input id='jobTitleInput' className="p-2 border rounded-md border-dark-theme-grey min-w-full" placeholder='Job title' onChange={props.onJobTitleInputChange}/>
                {props.displayJobTitleInputErrorMessage &&
                    <p id='jobTitleInputErrorMessage' className='text-sm text-red'>Please enter a job title.</p>
                }
             </div>
            <div className='w-1/4'>
                <input id='locationInput' className="p-2 border rounded-md border-dark-theme-grey min-w-full" placeholder='Location' onChange={props.onLocationInputChange}/>
                {props.displayLocationInputErrorMessage &&
                    <p id='locationInputErrorMessage' className='text-sm text-red'>Please enter a location.</p>
                }
            </div>
            <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white' onClick={props.onclick}>Search</button>
         </div>
         <div>
          <div>
            <label htmlFor="date-select">Date</label>
            <select className="default-dropdown" name="Date" id="date-select">
                <option value="None">Date Posted</option>
                <option value="1">Last 24 hours</option>
                <option value="3">Last 3 days</option>
                <option value="7">Last 7 days</option>
                <option value="14">Last 14 days</option>
            </select>
          </div>
          <div>
            <label htmlFor="distance-select">Distance</label>
            <select className="default-dropdown" name="Distance" id="distance-select">
                <option value="None">Distance</option>
                <option value="5">5 miles</option>
                <option value="10">10 miles</option>
                <option value="15">15 miles</option>
                <option value="20">20 miles</option>
                <option value="25">25 miles</option>
            </select>
          </div>
          <div>
            <label htmlFor="salary-select">Salary</label>
            <select className="default-dropdown" name="Salary" id="salary-select">
                <option value="None">Salary</option>
                <option value="30000">£30,000+</option>
                <option value="45000">£45,000+</option>
                <option value="60000">£60,000+</option>
                <option value="75000">£75,000+</option>
                <option value="90000">£90,000+</option>
            </select>
           </div>
           <div>
            <label htmlFor="type-select">Job Type</label>
            <select className="default-dropdown" name="Type" id="type-select">
                <option value="None">Job Type</option>
                <option value="Permanent">Permanent</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Apprenticeship">Apprenticeship</option>
            </select>
           </div>
           <div>
            <label htmlFor="situation-select">Situation</label>
            <select className="default-dropdown" name="Situation" id="situation-select">
                <option value="None">Situation</option>
                <option value="Office">In-Office</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
            </select>
           </div>
        </div>
     </div>
    );
  }

  export default SearchBar;
