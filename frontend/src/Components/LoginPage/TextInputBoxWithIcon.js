function TextInputBoxWithIcon(props) {
    return (
        <div className='p-2 border-2 rounded-md border-dark-theme-grey relative ::-ms-reveal:display-none'>
            <input className='rounded-md bg-white outline-none' id={props.id} type={props.type} onBlur={props.onBlur} onChange={props.onChange} defaultValue={props.cache} placeholder={props.placeholder}/>
            {props.icon &&
                <div className='absolute top-2 right-2'>
                    {props.icon}
                </div>
            }
        </div>
    );
}

export default TextInputBoxWithIcon;