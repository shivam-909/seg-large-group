function placeholderCard(props) {
    return (
        <div className='mb-3 bg-lighter-grey rounded inline-flex items-center text-sm space-x-2 px-2 py-1' onClick={props.onclick}>
            {props.img && <img src={props.img} alt=''/>}
            <p>{props.prefix}{props.content}</p>
        </div>
    );
}

export default placeholderCard;