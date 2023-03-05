function Filter(props) {
    return (
        <select className="p-2 m-1 text-black border rounded-md" name="Date">
            {props.html}
        </select>
    );
}

export default Filter;