export default function CompanyJobCard(props) {
    let date = new Date(Date(props.date));
    let format = date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString()
    return (
        <div className='border-2 border-darker-grey rounded-xl w-full p-4 m-2'>
            <button className={"float-right"}><i className="fa-solid fa-pen-to-square text-xl"></i></button>
            <p className='font-bold text-xl'>{props.title}</p>
            <p>{props.schedule}</p>
            <p>{props.location}</p>
            <p className='mb-2'>{format}</p>
        </div>
    );
}