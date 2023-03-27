import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import Modal from "react-modal";

export default function ApplicantCard(props) {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);
    return (
        <div className='border-2 border-darker-grey rounded-xl w-full p-4 m-2'>
            <div className={"float-right"}>
                <button onClick={() => {setIsOpen(true)}} className={"px-5 pb-2"}><i className="fa-solid fa-ellipsis-vertical text-2xl"></i></button>
                <UpdateApplicantStatus modalIsOpen={modalIsOpen} closeModal={() => {setIsOpen(false)}} id={props.id}/> </div>
            <img className={"rounded-full float-left mr-2"} src={props.pfpUrl} alt="Avatar" height={"80"} width={"80"}/>
            <div className={'hover:cursor-pointer'} onClick={() => {navigate("/application/"+props.id)}} >
                <p className='font-bold text-xl'>{props.name}</p>
                <p>{props.email}</p>
                <p className={(props.status === "Rejected" ? "text-red" : props.status === "Hired" ? "text-green" : "text-blue") + " font-bold"}>{props.status}</p>
            </div>
        </div>
    );
}
export function UpdateApplicantStatus(props){
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

    async function changeStatus(newStatus){
        const formData = new FormData();
        formData.append("status",newStatus)
        await axios.patch("http://localhost:8000/api/applications/"+props.id,formData).then(navigate(0))
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
                    <div className={"space-y-2"}>
                        <div className={"text-xl hover:cursor-pointer border-2 border-dark-theme-grey rounded-md text-blue font-bold"} onClick={() => {changeStatus("Applied")}}><i className="fa-sharp fa-solid fa-folder pr-2"></i>Applied</div>
                        <div className={"text-xl hover:cursor-pointer border-2 border-dark-theme-grey rounded-md text-green font-bold"} onClick={() => {changeStatus("Hired")}}><i className="fa-sharp fa-solid fa-folder pr-2"></i>Hired</div>
                        <div className={"text-xl hover:cursor-pointer border-2 border-dark-theme-grey rounded-md font-bold"} onClick={() => {changeStatus("Interview")}}><i className="fa-sharp fa-solid fa-folder pr-2"></i>Interview</div>
                        <div className={"text-xl hover:cursor-pointer border-2 border-dark-theme-grey rounded-md text-red font-bold"} onClick={() => {changeStatus("Rejected")}}><i className="fa-sharp fa-solid fa-folder pr-2"></i>Reject</div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}