function TextInputBox(props) {
    return (
        <input className={'p-2 border-2 rounded-md border-dark-theme-grey bg-white ' + props.className} id={props.id} type={props.type} onChange={props.onChange} onBlur={props.onBlur} defaultValue={props.cache} placeholder={props.placeholder}/>
    );
}

export default TextInputBox;