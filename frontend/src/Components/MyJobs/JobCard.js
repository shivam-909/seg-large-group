import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";
import RefreshToken from "../../Auth/RefreshToken";

export default function JobCard(props) {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className='border-2 border-darker-grey rounded-xl w-full p-4 m-2 shadow-md'>
                {props.status === "Applied" &&
                    <div className={"float-right"}>
                    <button onClick={() => {setIsOpen(true)}} className={"px-5 pb-2"}><i className="fa-solid fa-ellipsis-vertical text-2xl"></i></button>
                        <UpdateJobStatus modalIsOpen={modalIsOpen} closeModal={() => {setIsOpen(false)}} id={props.id}/> </div>}
                <div>
                    {props.status === "Saved" && <button onClick={() => {navigate("/apply/"+props.jobID)}} className={"border-2 border-blue rounded-md px-5 py-1 text-white bg-blue float-right font-bold"}>Apply now</button>}
                    <p onClick={() => {window.open("/viewjob/"+props.jobID, "_blank")}} className='font-bold text-xl hover:cursor-pointer underline w-auto'>{props.title}</p>
                    <p>{props.company}</p>
                    <p className='mb-1'>{props.location}</p>
                </div>
            </div>
        </div>
    );
}

export function UpdateJobStatus(props){
    const navigate = useNavigate();

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '0.375rem',
            fontsize: '38px',
            boxShadowColor: 'rgba(0, 0, 0, 0.75)',
            width: '400px',
        },
    };

    async function archive() {
        const formData = new FormData();
        formData.append("status","Archived");
        await RefreshToken();
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/applications/${props.id}`,formData).then(navigate(0))
    }

    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={props.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                overlayClassName="Overlay"
            >
                <button onClick={props.closeModal} className={"float-left"}><i className="fa-regular fa-circle-xmark text-red text-2xl"></i></button>
                <div className={"justify-center flex grid items-center text-center"}>
                    <div className={"text-2xl mb-5"}>Change Status</div>
                    <div className={"text-xl hover:cursor-pointer border-2 border-dark-theme-grey rounded-md"} onClick={archive}><i className="fa-sharp fa-solid fa-folder pr-2"></i>Archive</div>
                </div>
            </Modal>
        </div>
    );
}