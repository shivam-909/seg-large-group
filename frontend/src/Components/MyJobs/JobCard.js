export default function JobCard(props) {
    return (
        <div className='border-2 border-darker-grey rounded-xl w-full p-4 m-2'>
            <p className='font-bold text-xl'>{props.title}</p>
            <p>{props.company}</p>
            <p className='mb-3'>{props.location}</p>
        </div>
    );
}