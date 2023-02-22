function Urgent(props) {
    return (
        <div>
            {props.urgent &&
                    <div className='flex items-center space-x-1 mb-3'>
                        <img src={props.icon} alt=''/>
                        <p className='text-sm'>Urgently needed</p>
                    </div>
            }
        </div>
    );
}

export default Urgent;