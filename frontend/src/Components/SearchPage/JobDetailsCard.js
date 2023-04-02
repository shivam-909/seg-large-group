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

function JobDetailsCard(props) {
    const navigate = useNavigate()
    const [savedJobPost, setSavedJopPost] = useState(false);
    const [user, setUser] = useState([])
    const [companyUser, setCompany] = useState([])
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            if (user.length === 0){
                await GetData().then(r => {
                    if (r !== undefined) {
                        setUser(r)
                    }
                }).catch(e => console.log(e));
            }
        };
        getUser()
        setSavedJopPost(user.searcher?.savedJobs.includes(props.id))
    },[user]) // eslint-disable-line
    useEffect(() => {
        setSavedJopPost(user.searcher?.savedJobs.includes(props.id))
    },[props.id]) // eslint-disable-line
    useEffect(()=> {
        async function getCompany(){
            if(!props.companyID){
                return;
            }
            const getCompanyUser = new FormData();
            getCompanyUser.append("companyID", props.companyID)
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/user/typeid`, getCompanyUser).then(async r => {
                setCompany(r.data.userID);
                if (!user.searcher?.searcherID) {
                    setHasApplied(false);
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
                const token = localStorage.getItem("access");
                if (token) {
                    await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/users`, newUser, {headers: {Authorization: `Bearer ${user.token}`}});
                }
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
                    const token = localStorage.getItem("access");
                    if (token) {
                        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/users`, newUser, {headers: {Authorization: `Bearer ${user.token}`}});
                    }
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
        <div className={`px-5 py-8 border-2 border-darker-grey rounded-xl bg-white overflow-y-scroll max-h-[95vh] sticky top-14 ${props.fullScreen ? 'max-w-[1200px]' : 'max-w-[800px]'}`}>
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
        </div>
    );
}

export default JobDetailsCard;