import React, { useEffect, useState} from "react";
import JobList from "./JobList";

export default function Filters(props) {
    const originalJobResults = props.jobs;
    const [tempFilteredJobs, setTempFilteredJobs] = useState(props.jobs);
    const [filteredJobs, setFilteredJobs] = useState(props.jobs);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({});
    const [currentFilterState, setCurrentFilterState] = useState({
        age: 'anyTime',
        distance: 'anyDistance'
    });

    useEffect(() => {
        async function addFilters() {
            const allFilters = {
                age: [],
                distance: [],
                salary: {},
                compensation: [],
                type: [],
                schedule: [],
                qualification: [],
                industry: [],
                location: [],
                company: [],
            };

            props.jobs.forEach(job => {
                allFilters.age.push(job.age);
                allFilters.distance.push(job.distance);
                allFilters.compensation.push([job.compensation[0].replace(',',''), job.compensation[1]]);
                allFilters.type.push(job.type);
                allFilters.schedule.push(job.schedule);
                allFilters.qualification.push(job.qualifications);
                allFilters.industry.push(job.industry);
                allFilters.location.push(job.location);
                allFilters.company.push(job.companyName);
            });

            const salaries = Array.from(new Set(allFilters.compensation));
            let hourly = new Set();
            let daily = new Set();
            let weekly = new Set();
            let monthly = new Set();
            let yearly = new Set();
            salaries.forEach(salary => {
                if (salary[1] === 'hour') {
                    hourly.add(salary[0]);
                }
                else if (salary[1] === 'day') {
                    daily.add(salary[0]);
                }
                else if (salary[1] === 'week') {
                    weekly.add(salary[0]);
                }
                else if (salary[1] === 'month') {
                    monthly.add(salary[0]);
                }
                else if (salary[1] === 'year') {
                    yearly.add(salary[0]);
                }
            });
            const allSalaries = {}
            if (hourly.size > 0) {
                allSalaries.hour = [Math.floor(Math.min(...hourly)/5)*5, Math.ceil(Math.max(...hourly)/5)*5];
            }
            if (daily.size > 0) {
                allSalaries.day = [Math.floor(Math.min(...daily)/10)*10, Math.ceil(Math.max(...daily)/10)*10];
            }
            if (weekly.size > 0) {
                allSalaries.week = [Math.floor(Math.min(...weekly)/50)*50, Math.ceil(Math.max(...weekly)/50)*50];
            }
            if (monthly.size > 0) {
                allSalaries.month = [Math.floor(Math.min(...monthly)/100)*100, Math.ceil(Math.max(...monthly)/100)*100];
            }
            if (yearly.size > 0) {
                allSalaries.year = [Math.floor(Math.min(...yearly)/1000)*1000, Math.ceil(Math.max(...yearly)/1000)*1000];
            }

            const types = Array.from(new Set(allFilters.type.toString().split(',')));
            const schedules = Array.from(new Set(allFilters.schedule.toString().split(',')));
            const qualifications = Array.from(new Set(allFilters.qualification.toString().split(',')));
            const industry = Array.from(new Set(allFilters.industry.toString().split(',')));
            const locations = Array.from(new Set(allFilters.location));
            const companies = Array.from(new Set(allFilters.company));

            setFilters(prevState => {
                return {
                    ...prevState,
                    salary: allSalaries,
                    type: types,
                    schedule: schedules,
                    qualification: qualifications,
                    industry: industry,
                    location: locations,
                    company: companies,
                }
            });
        }
        addFilters();
    }, [props.jobs]);

    function validateSalaryInput(id, min, max) {
        const salaryInput = document.getElementById(id);
        if (salaryInput.value < min || salaryInput.value === '') {
            salaryInput.value = min;
        }
        else if (salaryInput.value > max) {
            salaryInput.value = max;
        }
        updateJobResults();
    }

    async function updateJobResults() {
        const age = document.querySelector('input[name="age"]:checked').value;
        const distance = document.querySelector('input[name="distance"]:checked').value;
        const salaries = document.getElementsByName('salary');
        const schedules = document.querySelectorAll('input[name="schedule"]:checked');
        const types = document.querySelectorAll('input[name="type"]:checked');
        const industries = document.querySelectorAll('input[name="industry"]:checked');
        const locations = document.querySelectorAll('input[name="location"]:checked');
        const companies = document.querySelectorAll('input[name="company"]:checked');

        let allFilteredJobs = originalJobResults;

        // Date posted filter
        if (age !== '') {
            allFilteredJobs = allFilteredJobs.filter(job => job.age < age);
        }

        // Distance filter
        if (distance !== '') {
            allFilteredJobs = allFilteredJobs.filter(job => job.distance < distance);
        }

        // Salary filter
        let newFilteredJobs = [];
        allFilteredJobs.filter(job => { // eslint-disable-line
            salaries.forEach(salary => {
                if (salary.id === job.compensation[1] && parseInt(job.compensation[0].replace(/,/g, '')) >= parseInt(salary.value)) {
                    newFilteredJobs.push(job);
                }
            });
        });
        allFilteredJobs = newFilteredJobs;

        // Job type filter
        if (schedules.length > 0) {
            const allSchedules = [];
            schedules.forEach(schedule => allSchedules.push(schedule.value));
            allFilteredJobs = allFilteredJobs.filter(job => job.schedule.some(schedule => allSchedules.includes(schedule)));
        }

        // On-site/Remote filter
        if (types.length > 0) {
            const allTypes = [];
            types.forEach(type => allTypes.push(type.value));
            allFilteredJobs = allFilteredJobs.filter(job => job.type.some(type => allTypes.includes(type)));
        }

        // Industry filter
        if (industries.length > 0) {
            const allIndustries = [];
            industries.forEach(industry => allIndustries.push(industry.value));
            allFilteredJobs = allFilteredJobs.filter(job => allIndustries.includes(job.industry));
        }

        // Location filter
        if (locations.length > 0) {
            const allLocations = [];
            locations.forEach(location => allLocations.push(location.value));
            allFilteredJobs = allFilteredJobs.filter(job => allLocations.includes(job.location));
        }

        // Company filter
        if (companies.length > 0) {
            const allCompanies = [];
            companies.forEach(company => allCompanies.push(company.value));
            allFilteredJobs = allFilteredJobs.filter(job => allCompanies.includes(job.companyName));
        }
        setTempFilteredJobs(allFilteredJobs);
    }

    function clearFilters() {
        setFilteredJobs(originalJobResults);
        setTempFilteredJobs(originalJobResults);
        document.getElementById('anyTime').checked = true;
        document.getElementById('anyDistance').checked = true;
        const hour = document.getElementById('hour');
        const day = document.getElementById('day');
        const week = document.getElementById('week');
        const month = document.getElementById('month');
        const year = document.getElementById('year');
        if (hour) {
            hour.value = hour.defaultValue;
        }
        if (day) {
            day.value = day.defaultValue;
        }
        if (week) {
            week.value = week.defaultValue;
        }
        if (month) {
            month.value = month.defaultValue;
        }
        if (year) {
            year.value = year.defaultValue;
        }
        document.querySelectorAll('input[name="schedule"]').forEach(schedule => schedule.checked = false);
        document.querySelectorAll('input[name="type"]').forEach(type => type.checked = false);
        document.querySelectorAll('input[name="qualification"]').forEach(qualification => qualification.checked = false);
        document.querySelectorAll('input[name="industry"]').forEach(industry => industry.checked = false);
        document.querySelectorAll('input[name="location"]').forEach(location => location.checked = false);
        document.querySelectorAll('input[name="company"]').forEach(company => company.checked = false);
    }

    function selectRadio(id) {
        document.getElementById(id).checked = true;
        updateJobResults();
    }

    function toggleFilters() {
        if (showFilters) {
            const age = document.querySelector('input[name="age"]:checked');
            console.log(age)
            const distance = document.querySelector('input[name="distance"]:checked');
            console.log(distance)
            // set state of all filters
            setCurrentFilterState(...prevState => {
                return {
                    ...prevState,
                    age: age,
                    distance: distance,
                }
            })
        }
        setShowFilters(!showFilters);
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <button className='underline mb-3' onClick={toggleFilters}>{showFilters ? 'Hide' : 'Show'} filters</button>
            {showFilters &&
                <div>
                    <div className='flex border-x border-t rounded-t-md border-darker-grey space-x-8 pt-3 px-3 mx-4'>
                        <div className='flex flex-col space-y-3 min-w-fit'>
                            <p className='font-bold'>Date posted</p>
                            <label onFocus={() => selectRadio('anyTime')}><label><input type="radio" id={"anyTime"} name={'age'} value={""} className={"peer sr-only"} checked/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Any time</span></label>
                            </label>
                            <label onFocus={() => selectRadio('past24Hours')}><label><input type="radio" id={"past24Hours"} name={'age'} value={"1"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Past 24 hours</span></label>
                            </label>
                            <label onFocus={() => selectRadio('pastWeek')}><label><input type="radio" id={"pastWeek"} name={'age'} value={"7"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Past week</span></label>
                            </label>
                            <label onFocus={() => selectRadio('pastMonth')}><label><input type="radio" id={"pastMonth"} name={'age'} value={"30"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Past month</span></label>
                            </label>
                        </div>

                        <div className='flex flex-col space-y-3 min-w-fit'>
                            <p className='font-bold'>Distance</p>
                            <label onFocus={() => selectRadio('anyDistance')}><label><input type="radio" id={"anyDistance"} name={'distance'} value={""} className={"peer sr-only"} checked/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>Any distance</span></label>
                            </label>
                            <label onFocus={() => selectRadio('1mile')}><label><input type="radio" id={"1mile"} name={'distance'} value={"1"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>1 mile</span></label>
                            </label>
                            <label onFocus={() => selectRadio('5miles')}><label><input type="radio" id={"5miles"} name={'distance'} value={"5"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>5 miles</span></label>
                            </label>
                            <label onFocus={() => selectRadio('10miles')}><label><input type="radio" id={"10miles"} name={'distance'} value={"10"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>10 miles</span></label>
                            </label>
                            <label onFocus={() => selectRadio('15miles')}><label><input type="radio" id={"15miles"} name={'distance'} value={"15"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>15 miles</span></label>
                            </label>
                            <label onFocus={() => selectRadio('25miles')}><label><input type="radio" id={"25miles"} name={'distance'} value={"25"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>25 miles</span></label>
                            </label>
                            <label onFocus={() => selectRadio('35miles')}><label><input type="radio" id={"35miles"} name={'distance'} value={"35"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>35 miles</span></label>
                            </label>
                            <label onFocus={() => selectRadio('50miles')}><label><input type="radio" id={"50miles"} name={'distance'} value={"50"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>50 miles</span></label>
                            </label>
                            <label onFocus={() => selectRadio('100miles')}><label><input type="radio" id={"100miles"} name={'distance'} value={"100"} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>100 miles</span></label>
                            </label>
                        </div>

                        <div className='space-y-2'>
                            <p className='font-bold'>Salary</p>
                            {filters.salary &&
                                Object.keys(filters.salary).map(key => {
                                    const minSalary = filters.salary[key][0];
                                    const maxSalary = filters.salary[key][1];
                                    return (
                                        <div className='flex items-center'>
                                            <p className='pr-0.5'>£</p>
                                            <input className='border border-lighter-grey rounded-md p-1' id={key}
                                                   name='salary' type='number' defaultValue={minSalary} min={minSalary}
                                                   max={maxSalary}
                                                   onBlur={() => validateSalaryInput(key, minSalary, maxSalary)}/>
                                            <p>+/{key}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div>
                            <p className='font-bold'>Job type</p>
                            {filters.schedule.length > 0 &&
                                filters.schedule.map(schedule => {
                                    return (
                                        <div className='space-x-2 space-y-5 mt-5' onClick={updateJobResults}>
                                            <label><input type="checkbox" id={schedule} name={'schedule'} value={schedule} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>{schedule}</span></label>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div className={"min-w-fit"}>
                            <p className='font-bold'>Workplace</p>
                            {filters.type.length > 0 &&
                                filters.type.map(type => {
                                    return (
                                    <div className='space-x-2 space-y-5 mt-5 w-auto' onClick={updateJobResults}>
                                        <label><input type="checkbox" id={type} name={'type'} value={type} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>{type}</span></label>
                                    </div>
                                    );
                                })
                            }
                        </div>

                        <div>
                            <p className='font-bold'>Industry</p>
                            {filters.industry.length > 0 &&
                                filters.industry.map(industry => {
                                    return (
                                        <div className='space-x-2 space-y-5 mt-5 w-auto' onClick={updateJobResults}>
                                            <label><input type="checkbox" id={industry} name={'industry'} value={industry} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>{industry}</span></label>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div className={"min-w-fit"}>
                            <p className='font-bold'>Location</p>
                            {filters.location.length > 0 &&
                                filters.location.map(location => {
                                    return (
                                        <div className='space-x-2 space-y-5 mt-5 w-auto' onClick={updateJobResults}>
                                            <label><input type="checkbox" id={location} name={'location'} value={location} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>{location}</span></label>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div className={"min-w-fit"}>
                            <p className='font-bold'>Company</p>
                            {filters.company.length > 0 &&
                                filters.company.map(company => {
                                    return (
                                        <div className='space-x-2 space-y-5 mt-5 w-auto' onClick={updateJobResults}>
                                            <label><input type="checkbox" id={company} name={'company'} value={company} className={"peer sr-only"}/><span className={"border-2 border-[#ccc] p-1 rounded-md select-none peer-checked:border-dark-theme-grey peer-checked:text-white font-bold peer-checked:bg-dark-theme-grey"}>{company}</span></label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='flex items-center justify-end border-b border-x rounded-b-md border-darker-grey pb-2 pr-2 mx-4 pt-8'>
                        <button className='rounded-md py-2.5 px-4 font-bold text-dark-theme-grey mr-2'
                                onClick={clearFilters}>Clear
                        </button>
                        <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white'
                                onClick={() => setFilteredJobs(tempFilteredJobs)}>Show results ({tempFilteredJobs.length})
                        </button>
                    </div>
                </div>
            }
            <div className='mt-12'>
                <JobList jobs={filteredJobs}/>
            </div>
        </div>
    );
}