function SearchBar() {
    return (
    <div>
        <div>
            <input className="default-input" placeholder="What"/>
            <input className="default-input" placeholder="Where"/>
            <button className="default-button">Search</button>
        </div>
        <div>
            <select className="default-dropdown" name="Date">
                <option value="None">Date Posted</option>
                <option value="1">Last 24 hours</option>
                <option value="3">Last 3 days</option>
                <option value="7">Last 7 days</option>
                <option value="14">Last 14 days</option>
            </select>
            <select className="default-dropdown" name="Distance">
                <option value="None">Distance</option>
                <option value="5">5 miles</option>
                <option value="10">10 miles</option>
                <option value="15">15 miles</option>
                <option value="20">20 miles</option>
                <option value="25">25 miles</option>
            </select>
            <select className="default-dropdown" name="Salary">
                <option value="None">Salary</option>
                <option value="30000">£30,000+</option>
                <option value="45000">£45,000+</option>
                <option value="60000">£60,000+</option>
                <option value="75000">£75,000+</option>
                <option value="90000">£90,000+</option>
            </select>
            <select className="default-dropdown" name="Type">
                <option value="None">Job Type</option>
                <option value="Permanent">Permanent</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Apprenticeship">Apprenticeship</option>
            </select>
            <select className="default-dropdown" name="Situation">
                <option value="None">Situation</option>
                <option value="Office">In-Office</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
            </select>
        </div>
    </div>
    );
  }
  
  export default SearchBar;
  