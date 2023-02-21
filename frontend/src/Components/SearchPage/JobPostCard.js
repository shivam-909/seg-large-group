import salaryIcon from '../../icons/salaryIcon.png';
import suitcaseIcon from '../../icons/suitcaseIcon.png';
import clockIcon from '../../icons/clockIcon.png';
import PlaceholderCard from "./PlaceholderCard";
function JobPostCard(props) {
    return (
        <div className='border-2 border-darker-grey rounded-xl w-[410px] p-4'>
            {props.age <= 3 && <p className='text-xs mb-1 text-green'>new</p>}
            <p className='font-bold text-xl'>{props.title}</p>
            <p>{props.companyName}</p>
            <p className='mb-3'>{props.location}</p>

            <PlaceholderCard img={salaryIcon} prefix='£' content={props.salary}/>

            <div className='space-x-1.5'>
                {props.types.map(type => (
                    <PlaceholderCard img={suitcaseIcon} content={type}/>
                ))}
            </div>

            {props.urgent &&
                <div className='flex items-center space-x-1 mb-3'>
                    <img src={clockIcon} alt=''/>
                    <p className='text-sm'>Urgently needed</p>
                </div>
            }

            {props.requirements.length > 0 &&
                <div>
                    <p className='italic text-xs my-1'>Requirements</p>
                    <div className='space-x-1.5'>
                        {props.requirements.map(requirement => (
                            <PlaceholderCard content={requirement}/>
                        ))}
                    </div>
                </div>
            }

            {props.benefits.length > 0 &&
                <div>
                    <p className='italic text-xs my-1'>Benefits</p>
                    <div className='space-x-1.5'>
                        {props.benefits.map(benefit => (
                            <PlaceholderCard content={benefit}/>
                        ))}
                    </div>
                </div>
            }

            {props.age < 2 ? <p className='mt-2 text-sm'>Posted {props.age===0 ? 'today' : '1 day ago'}.</p> : <p className='mt-2 text-sm'>Posted {props.age} days ago</p>}
        </div>
    );
}

export default JobPostCard;