import saveIcon from '../../icons/saveIcon.png';
import savedIcon from '../../icons/savedIcon.png';
import salaryIcon from "../../icons/salaryIcon.png";
import PlaceholderCard from "./PlaceholderCard";
import suitcaseIcon2 from "../../icons/suitcaseIcon2.png";
import calendarIcon from "../../icons/calendarIcon.png";
import {useEffect, useState} from "react";
import clockIcon from "../../icons/clockIcon.png";
import Urgent from "./Urgent";
import JobPostAge from "./JobPostAge";
import openInNewTabIcon from "../../icons/openInNewTabIcon.png";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {GetData} from "../../Auth/GetUser";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/job-details/:id" component={JobDetailsPage} />
      </Switch>
    </Router>
  );
}

function JobDetailsCard(props) {
    const navigate = useNavigate();
    const [savedJobPost, setSavedJopPost] = useState(false);
    const [user, setUser] = useState([])
    const [companyUser, setCompany] = useState([])
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            if (user.length === 0){
                await GetData().then(r => {
                    setUser(r)
                });
            }
        };
        getUser()
        setSavedJopPost(user.searcher?.savedJobs.includes(props.id))
    },[user]) // eslint-disable-line

    useEffect(()=> {
        async function getCompany(){
            if(!props.companyID){
                return;
            }
            const getCompanyUser = new FormData();
            getCompanyUser.append("companyID", props.companyID)
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/user/typeid`, getCompanyUser).then(async r => {
                setCompany(r.data.userID);
                if (!user.searcher?.searcherID){
                    return;
                }
                const userApplications = new FormData();
                userApplications.append("searcher", user.searcher?.searcherID)
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/application/filter`, userApplications).then(res => {
                    for (const appl of res.data.applications) {
                        if (appl.searcher === user.searcher?.searcherID) {
                            setHasApplied(true);
                        }
                    }
                });
            })
        }
        getCompany();
    },[props.companyID, user]) // eslint-disable-line

    async function saveJobPost() {
        if (user.userID){
            if(!savedJobPost){
                const savedJobs = user.searcher?.savedJobs;
                savedJobs.push(props.id)
                const newUser = new FormData()
                for (const job of savedJobs){
                    newUser.append("savedJobs[]", job)
                }
                await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/users/${user.userID}`,newUser)
            }
            else{
                const savedJobs = user.searcher?.savedJobs;
                const index = savedJobs.indexOf(props.id)
                if(index > -1){
                    savedJobs.splice(index,1)
                    const newUser = new FormData()
                    for (const job of savedJobs){
                        newUser.append("savedJobs[]", job)
                    }
                    await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/users/${user.userID}`,newUser)
                }
                else{
                    console.log("job not saved")
                }
            }
            setSavedJopPost(!savedJobPost);
        }
        else{
            navigate("/login")
        }
    }

    return (
        <div className={`px-5 py-8 border-2 border-darker-grey rounded-xl bg-white overflow-y-scroll max-h-[95vh] sticky top-12 ${props.fullScreen ? 'max-w-[1200px]' : 'max-w-[800px]'}`}>
            <p className='font-bold text-xl'>{props.title}</p>
            <a href={'/profile/'+companyUser} target='_blank' rel={"noreferrer"}>{props.companyName}</a>
            <p className='mb-5'>{companyUser.location}</p>

            <div className='flex space-x-5'>
                <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white' onClick={() => {navigate(`/apply/${props.id}`)}} disabled={hasApplied}>{hasApplied ? "Applied" : "Apply Now"}</button>
                { user.searcher && <button className='bg-darker-grey rounded-md w-11 flex items-center justify-center' onClick={saveJobPost}><img src={savedJobPost ? savedIcon : saveIcon} alt=''/></button>}
                {!props.fullScreen &&
                    <button className='bg-darker-grey rounded-md w-11 flex items-center justify-center'><a href={`/viewjob/${props.id}`} target='_blank' rel='noreferrer'><img src={openInNewTabIcon} alt=''/></a></button>
                }
            </div>

            <div className='bg-darker-grey h-[0.1px] my-5'></div>

            <div>
                <p className='text-xl font-bold mb-4'>Job Details</p>

                <div className='mb-1 flex space-x-1.5'>
                    <img src={salaryIcon} alt=''/>
                    <p className='text-sm font-bold'>Salary</p>
                </div>
                <PlaceholderCard prefix='£' content={`${props.salary[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/${props.salary[1]}`}/>

                <div className='mb-1 flex space-x-1.5'>
                    <img className='w-[20px]' src={suitcaseIcon2} alt=''/>
                    <p className='text-sm font-bold'>Job type</p>
                </div>
                <div className='space-x-1.5'>
                    {props.types.map(type => {
                        return <PlaceholderCard content={type}/>;
                    })}
                </div>

                <div className='mb-1 flex space-x-1.5'>
                    <img src={calendarIcon} alt=''/>
                    <p className='text-sm font-bold'>Shift and schedule</p>
                </div>
                <div className='space-x-1.5'>
                    {props.schedule.map(schedule => (
                        <PlaceholderCard content={schedule}/>
                    ))}
                </div>
            </div>

            <div className='bg-darker-grey h-[0.1px] my-5'></div>

            <p className='text-xl font-bold mb-4'>Qualifications</p>

            <div className='space-x-1.5'>
                {props.qualifications.map(qualification => (
                    <PlaceholderCard content={qualification}/>
                ))}
            </div>

            <div>
                <div className='bg-darker-grey h-[0.1px] my-5'></div>

                <p className='text-xl font-bold mb-4'>Requirements</p>

                <div className='space-x-1.5'>
                    {props.requirements.map(requirement => {
                        requirement = requirement.split(',');
                        return <PlaceholderCard content={`${requirement[0]} (${requirement[1]} ${requirement[2]})`}/>;
                    })}
                </div>
            </div>

            <div className='bg-darker-grey h-[0.1px] my-5'></div>

            <p className='text-xl font-bold mb-4'>Benefits</p>

            <div className='space-x-1.5'>
                {props.benefits.map(benefit => (
                    <PlaceholderCard content={benefit}/>
                ))}
            </div>

            <div className='bg-darker-grey h-[0.1px] my-5'></div>

            <p className='text-xl font-bold mb-4'>Job Description</p>

            <p className='text-sm'>{props.description}</p>

            <div className='bg-darker-grey h-[0.1px] my-5'></div>

            <Urgent urgent={props.urgent} icon={clockIcon}/>

            <JobPostAge age={props.age}/>

            {openShareModal &&
                <div>
                    <div className='fixed h-screen w-screen top-0 left-0 bg-dim-background'/>
                    <div className='fixed w-[300px] h-[300px] bg-white m-auto top-0 bottom-0 left-0 right-0 rounded-md'>
                        <button className='absolute top-4 right-4 bg-lighter-grey rounded-md w-7 h-7' onClick={() => setOpenShareModal(false)}>X</button>

                        <div className='inline'>
                            <p className='mt-14 font-bold text-xl flex items-center justify-center'>Share this job post</p>

                            <div className='grid items-center justify-center'>
                                <div className='mt-10 bg-lighter-grey rounded inline-flex items-center text-lg space-x-3 px-2 py-1 cursor-pointer' onClick={copyJobPostLink}>
                                    <img src={copyIcon} alt='copy icon'/>
                                    <p>Copy link</p>
                                </div>

                                <div className='mt-7 bg-lighter-grey rounded inline-flex items-center text-lg space-x-3 px-2 py-1 cursor-pointer' onClick={emailJobPost}>
                                    <img src={emailIcon} alt=''/>
                                    <p>Email</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default JobDetailsCard;
