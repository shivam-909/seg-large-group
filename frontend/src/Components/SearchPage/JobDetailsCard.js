import saveIcon from '../../icons/saveIcon.png';
import savedIcon from '../../icons/savedIcon.png';
import salaryIcon from "../../icons/salaryIcon.png";
import PlaceholderCard from "./PlaceholderCard";
import suitcaseIcon2 from "../../icons/suitcaseIcon2.png";
import calendarIcon from "../../icons/calendarIcon.png";
import shareIcon from "../../icons/shareIcon.png";
import emailIcon from "../../icons/emailIcon.png";
import copyIcon from "../../icons/copyIcon.png";
import {useState} from "react";
import clockIcon from "../../icons/clockIcon.png";
import Urgent from "./Urgent";
import JobPostAge from "./JobPostAge";
import openInNewTabIcon from "../../icons/openInNewTabIcon.png";

function JobDetailsCard(props) {
    const [openShareModal, setOpenShareModal] = useState(false);
    const [savedJobPost, setSavedJopPost] = useState(false);

    function saveJobPost() {
        // TODO: implement
        setSavedJopPost(!savedJobPost);
    }

    function emailJobPost() {
        // TODO: implement
        console.log('Email job post');
    }

    function copyJobPostLink() {
        navigator.clipboard.writeText(`${process.env.FRONTEND_BASE_URL}${props.id}`);
    }

    return (
        <div className='max-h-screen overflow-y-scroll border-2 border-darker-grey rounded-xl px-5 py-8 top-0 max-w-[800px] sticky'>
            <p className='font-bold text-xl'>{props.title}</p>
            <a href='/' target='_blank'>{props.companyName}</a>
            <p className='mb-5'>{props.location}</p>

            <div className='flex space-x-5'>
                <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white'><a href='/' target='_blank'>Apply Now</a></button>
                <button className='bg-darker-grey rounded-md w-11 flex items-center justify-center' onClick={() => setOpenShareModal(true)}><img src={shareIcon} alt=''/></button>
                <button className='bg-darker-grey rounded-md w-11 flex items-center justify-center' onClick={saveJobPost}><img src={savedJobPost ? savedIcon : saveIcon} alt=''/></button>
                <button className='bg-darker-grey rounded-md w-11 flex items-center justify-center'><a href='/' target='_blank'><img src={openInNewTabIcon} alt=''/></a></button>
            </div>

            <div className='bg-darker-grey h-[0.1px] my-5'></div>

            <div>
                <p className='text-xl font-bold mb-4'>Job Details</p>

                <div className='mb-1 flex space-x-1.5'>
                    <img src={salaryIcon} alt=''/>
                    <p className='text-sm font-bold'>Salary</p>
                </div>
                <PlaceholderCard prefix='£' content={props.salary}/>

                <div className='mb-1 flex space-x-1.5'>
                    <img className='w-[20px]' src={suitcaseIcon2} alt=''/>
                    <p className='text-sm font-bold'>Job type</p>
                </div>
                <div className='space-x-1.5'>
                    {props.types.map(type => (
                        <PlaceholderCard content={type}/>
                    ))}
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
                                    <img src={copyIcon} alt=''/>
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