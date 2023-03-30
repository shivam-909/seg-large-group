import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import Modal from "react-modal";
import {UpdateApplicantStatus} from "../Applicants/ApplicantCard";

export default function CompanyJobCard(props) {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);

    let date = new Date(Date(props.date));
    let format = date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString()
    return (
        <div className='border-2 border-darker-grey rounded-xl w-full p-4 m-2 shadow-md'>
            <ConfirmDeleteModal id={props.id} modalIsOpen={modalIsOpen} closeModal={() => {setIsOpen(false)}}/>
            <div className={"float-right grid grid-cols-1 space-y-2"}>
                <button onClick={() => {navigate("/jobs/edit/" + props.id)}} className={""}><i className="fa-solid fa-pen-to-square text-xl"></i></button>
                <button onClick={async () => {navigate("/jobs/applicants/"+props.id)}} className={"bottom-0"}><i className="fa-solid fa-users text-xl"></i></button>
                <button onClick={() => {setIsOpen(true)}} className={"bottom-0"}><i className="fa-solid fa-trash text-red text-xl"></i></button>
            </div>
            <div onClick={() => {navigate("/viewjob/"+props.id)}} className={"hover:cursor-pointer"}>
                <p className='font-bold text-xl'>{props.title}</p>
                <p>{Array.isArray(props.schedule) ? props.schedule?.map(schedule => schedule + " "): props.schedule}</p>
                <p>{props.location}</p>
                <p>{format}</p>
            </div>
        </div>
    );
}

export function ConfirmDeleteModal(props){
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
            width: 'auto',
        },
    };

    async function deleteJob(){
        await axios.delete("http://localhost:8000/api/jobs/" + props.id);
        window.location.reload(false)
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
                    <div className={"text-2xl ml-5"}>Are you sure you want to delete this job?</div>
                    <div className={"border-b-2 border-grey flex relative mb-5"}/>
                    <div className={"grid grid-cols-2"}>
                        <button onClick={props.closeModal} className={"border-2 border-dark-theme-grey bg-[#ccc] rounded-md text-lg p-1 font-bold mr-2"}>Cancel</button>
                        <button onClick={() => {deleteJob()}} className={"border-2 border-[#000] bg-red rounded-md p-1 text-lg text-white font-bold ml-2"}>Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}