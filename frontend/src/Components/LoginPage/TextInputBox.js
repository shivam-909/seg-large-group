function TextInputBox(props) {
    return (
        <input className='p-2 border-2 rounded-md border-dark-theme-grey bg-white' id={props.id} defaultValue={props.cache} placeholder={props.placeholder}/>
    );
}

export default TextInputBox;