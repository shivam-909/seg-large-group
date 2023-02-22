function JobPostAge(props) {
    return (
        <div>
            {props.age < 2 ? <p className='mt-2 text-sm'>Posted {props.age===0 ? 'today' : '1 day ago'}</p> : <p className='mt-2 text-sm'>Posted {props.age} days ago</p>}
        </div>
    );
}

export default JobPostAge;