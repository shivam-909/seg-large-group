import salaryIcon from './salaryIcon.png';
import suitcaseIcon from './suitcaseIcon.png';
import clockIcon from './clockIcon.png';
import PlaceholderCard from "./PlaceholderCard";
function JobPostCard(props) {
    return (
        <div className='border-2 border-[#d8d4d4] rounded-xl w-[410px] p-4'>
            {props.age <= 3 && <p className='text-xs text-green-600 mb-1'>new</p>}
            <p className='font-bold'>{props.title}</p>
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

            {props.benefits &&
                <div>
                    <p className='italic text-xs my-1'>Benefits</p>
                    <div className='space-x-1.5'>
                        {props.benefits.map(benefit => (
                            <PlaceholderCard content={benefit}/>
                        ))}
                    </div>
                </div>
            }

            <p className='mt-2 text-sm'>Posted {props.age} day{props.age!=='1' && 's'} ago</p>
        </div>
    );
}

export default JobPostCard;