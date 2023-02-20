function placeholderCard(props) {
    return (
        <div className='mb-3 bg-[#f3f3f3] rounded inline-flex items-center text-sm space-x-2 px-2 py-1'>
            {props.img && <img src={props.img} alt=''/>}
            <p>{props.prefix}{props.content}</p>
        </div>
    );
}

export default placeholderCard;