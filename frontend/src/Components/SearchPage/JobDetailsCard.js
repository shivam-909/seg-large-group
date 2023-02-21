import saveIcon from '../../icons/saveIcon.png';
import {ScrollView} from 'react-native';
import salaryIcon from "../../icons/salaryIcon.png";
import PlaceholderCard from "./PlaceholderCard";
import suitcaseIcon2 from "../../icons/suitcaseIcon2.png";
import calendarIcon from "../../icons/calendarIcon.png";
function JobDetailsCard(props) {
    function saveJobPost() {
        // TODO: implement
        console.log('Save job post');
    }

    return (
        <div className='border-2 border-darker-grey rounded-xl w-5/12 px-5 py-8 max-h-screen'>
            <p className='font-bold text-xl'>{props.title}</p>
            <a href='/' target='_blank'>{props.companyName}</a>
            <p className='mb-5'>{props.location}</p>

            <div className='flex space-x-5'>
                <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white'><a href='/' target='_blank'>Apply Now</a></button>
                <button className='bg-darker-grey rounded-md w-11 flex items-center justify-center' onClick={saveJobPost}><img src={saveIcon} alt=''/></button>
            </div>

            <div className='bg-darker-grey h-[0.1px] my-5'></div>

            <ScrollView>
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
            </ScrollView>
        </div>
    );
}

export default JobDetailsCard;