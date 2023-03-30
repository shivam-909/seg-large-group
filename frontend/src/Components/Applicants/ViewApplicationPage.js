import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function ViewApplicationPage() {
    const {id} = useParams();
    const [ID, setID] = useState(id);
    const [application, setApplication] = useState({});
    const [searcher, setSearcher] = useState({})
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const getApplicationValues = async () => {
        return new Promise (async (resolve, reject) => {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/applications/${ID}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    setID(null);
                    reject(err)
                });
        });
    }

    const getUser = async (searcherID) => {
        return new Promise (async (resolve, reject) => {
            const formData = new FormData();
            formData.append("searcherID", searcherID);
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/user/typeid`,formData)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => reject(err));
        });
    }

    const getSearcher = async (searcherID) => {
        return new Promise (async (resolve, reject) => {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/searcher/${searcherID}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => reject(err));
        });
    }

    const getApplication = async () => {
        const application = await getApplicationValues();
        const searcher = await getSearcher(application.searcher)
        const user = await getUser(application.searcher)
        application.QnAs = Object.entries(application.QnAs);
        setApplication(application);
        setSearcher(searcher);
        setUser(user);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        getApplication().catch(err => console.log(err));
    }, []); // eslint-disable-line

    return (
        <div>
            {!loading ?  (ID ?
                    <div>
                        <Navbar/>
                        <div className='mt-36 flex flex-col items-center'>
                            <div>
                                <button onClick={() => {navigate(-1)}} className={"mb-5 text-3xl text-red"}><i className="fa-regular fa-circle-xmark"></i></button>
                                <div className={"text-4xl font-bold underline hover:cursor-pointer"} onClick={() => navigate("/profile/"+user.userID)}>
                                    {searcher.firstName} {searcher.lastName}
                                    <img src={user.pfpUrl} className={"rounded-full float-right bottom-10 relative"} width={"100px"} height={"100px"} alt={"avatar"}/>
                                </div>
                                <div className='bg-darker-grey h-[0.1px] my-6'></div>
                                <div className='pt-6'>
                                    {application.QnAs &&
                                        <div className='space-y-5 pb-12'>
                                            <p className='font-bold text-3xl flex flex-col'>Screening questions</p>
                                            {application.QnAs.map(question => {
                                                return (
                                                    <div className='flex flex-col justify-center space-y-5 py-2.5'>
                                                        <p className='text-xl'>{question[0]}</p>
                                                        <textarea name="answer" className='border rounded-md p-1 resize-none w-full h-[75px]' value={question[1]} disabled></textarea>
                                                    </div>
                                                )
                                            })}
                                            <div className='pt-6'>
                                                <div className='bg-darker-grey h-[0.1px]'></div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div>
                                    <p className='font-bold text-3xl pb-10'>CV</p>
                                    {application.cv ?
                                        <div>
                                            <div onClick={() => {window.location=application.cv[1]}}
                                                className='border rounded-md border-dark-theme-grey p-2 space-y-5 inline-block cursor-pointer'>
                                                <Document file={application.cv[1]}>
                                                    <Page pageNumber={1} className='border rounded-md overflow-ellipsis'/>
                                                </Document>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <p className='pb-5'>No CV.</p>
                                        </div>
                                    }
                                </div>
                                <div className='bg-darker-grey h-[0.1px] my-12'></div>
                                <div className={"mb-32"}>
                                    <p className='font-bold text-3xl pb-5'>Cover Letter </p> <textarea id="coverLetterInput" className='border rounded-md p-1 resize-none w-full h-[200px]' value={application.coverLetter} disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <Navbar/>
                        <div className='mt-36 flex flex-col items-center'>
                            <p className='text-3xl'>Application not found</p>
                        </div>
                    </div>
            ) : <div className='mt-36 flex flex-col items-center'><Loading className={"h-10 w-10 border-[3px] border-dark-theme-grey"}/></div>}
        </div>
    );
}