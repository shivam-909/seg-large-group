import salaryIcon from '../../icons/salaryIcon.png';
import suitcaseIcon from '../../icons/suitcaseIcon.png';
import clockIcon from '../../icons/clockIcon.png';
import PlaceholderCard from "./PlaceholderCard";
import Urgent from "./Urgent";
import JobPostAge from "./JobPostAge";
function JobPostCard(props) {
    return (
        <div className='border-2 border-darker-grey rounded-xl p-4 w-[450px] cursor-pointer'>
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
            <div data-testid="urgent-status">
              <Urgent urgent={props.urgent} icon={clockIcon}/>
            </div>

            {props.requirements.length > 0 &&
                <div>
                    <p className='italic text-xs my-1'>Requirements</p>
                    <div className='space-x-1.5'>
                        {props.requirements.map(requirement => {
                            requirement = requirement.split(',');
                            return <PlaceholderCard content={`${requirement[0]} (${requirement[1]} ${requirement[2]})`}/>;
                        })}
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

            <JobPostAge age={props.age}/>
        </div>
    );
}

export default JobPostCard;
