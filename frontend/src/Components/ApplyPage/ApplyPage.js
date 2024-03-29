import {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {GetData} from "../../Auth/GetUser";
import Loading from "../Loading/Loading";
import RefreshToken from "../../Auth/RefreshToken";
import {pdfjs} from "react-pdf/dist/cjs/entry.webpack";

export default function ApplyPage() {
    const {id} = useParams();
    const [ID, setID] = useState(id);
    const [searcherID, setSearcherID] = useState('');
    const [companyID, setCompanyID] = useState('');
    const [job, setJob] = useState({});
    const newCVId = crypto.randomUUID();
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const getUser = async () => {
        await RefreshToken();
        return await GetData();
    }

    const getJob = async () => {
        return new Promise (async (resolve, reject) => {
            await RefreshToken();
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/jobs/${ID}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    setID(null);
                    reject(err)
                });
        });
    }

    const getCompany = async (companyID) => {
        return new Promise (async (resolve, reject) => {
            await RefreshToken();
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/company/${companyID}`)
                .then(response => {
                    resolve(response.data);
                })
            .catch(err => reject(err));
        });
    }

    const getSearcher = async (searcherID) => {
        return new Promise (async (resolve, reject) => {
            await RefreshToken();
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/searcher/${searcherID}`)
                .then(response => {
                    resolve(response.data);
                })
            .catch(err => reject(err));
        });
    }

    const getApplication = async () => {
        await RefreshToken();
        const user = await getUser();
        setSearcherID(user.searcherID);
        const job = await getJob();
        job.screeningQuestions = Object.entries(job.screeningQuestions);
        const company = await getCompany(job.companyID);
        setCompanyID(job.companyID);
        const searcher = await getSearcher(user.searcherID);
        setJob({...job, company: company.companyName, cv: searcher.cv});
        setLoading(false);
    }

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        setLoading(true);
        getApplication().catch(err => console.log(err));
    }, []); // eslint-disable-line


    async function validateApplication() {
        let valid = true;
        if (job.screeningQuestions.length > 0) {
            const answers = document.getElementsByTagName('textarea');
            const scrollElementIntoView = [];
            Array.from(answers).forEach(answer => {
                if (answer.required) {
                    if (answer.id === 'coverLetterInput') {
                        answer.className = 'border rounded-md p-1 resize-none w-full h-[200px]';
                    }
                    else {
                        answer.className = 'border rounded-md p-1 resize-none w-full h-[75px]';
                    }
                    if (answer.value.trim() === '') {
                        if (answer.id === 'coverLetterInput') {
                            answer.className = 'border border-red rounded-md p-1 resize-none w-full h-[200px]';
                        }
                        else {
                            answer.className = 'border border-red rounded-md p-1 resize-none w-full h-[75px]';
                        }
                        scrollElementIntoView.push(answer);
                    }
                }
            });
            if (scrollElementIntoView.length > 0) {
                valid = false;
                scrollElementIntoView[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        if (!job.cv) {
            valid = false;
            const uploadBtn = document.getElementById('upload');
            uploadBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (valid) {
            await submitApplication();
        }
        else {
            console.log("error")
        }
    }

    async function submitApplication() {
        const answers = document.getElementsByName('answer');
        const QnAs = {};
        job.screeningQuestions.forEach((question,i) => {
            QnAs[question[0]] = answers[i].value;
        });
        const coverLetter = document.getElementById('coverLetterInput').value;

        const applicationFormData = new FormData();
        applicationFormData.append('jobListing', ID);
        applicationFormData.append('searcher', searcherID);
        applicationFormData.append('cv[]', job.cv[0]);
        applicationFormData.append('cv[]', job.cv[1]);
        applicationFormData.append('status', 'Applied');
        applicationFormData.append('QnAs', JSON.stringify(QnAs));
        applicationFormData.append('coverLetter', coverLetter);

        const notificationFormData = new FormData();
        notificationFormData.append('content', 'NewApplicant')

        const formData = new FormData();
        formData.append("companyID", companyID);

        await RefreshToken();

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/user/typeid`, formData)
            .then(response => {
                notificationFormData.append("userID", response.data.userID);
            });

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/applications/add`, applicationFormData)
            .then(response => notificationFormData.append('application', response.data.id))
            .catch(err => console.log(err));

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/notifications/add`, notificationFormData)
            .catch(err => console.log(err));

        navigate("/jobs");
    }

    function uploadFile(e) {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append('file', file);
        if (file) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}api/storage/cv/${newCVId}`, formData)
                .then(response => {
                    setJob({...job, cv: [file.name, response.data.URL]});
                });
        }
    }

    return (
        <div>
            {!loading ?  (ID ?
                <div data-testid='navbar'>
                    <Navbar/>
                    <div className='mt-36 flex flex-col items-center'>
                        <div>
                            <div>
                                <p className='text-xl pb-5'>You are applying for the role of:</p>
                                <p className='font-bold text-xl'>{job.title}</p>
                                <p className='text-xl'>{job.company}</p>
                                <p className='text-xl'>{job.location}</p>
                                {job.compensation &&
                                    <p className='text-xl'>{`£${job.compensation[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/${job.compensation[1]}`}</p>
                                }
                                <button className='text-xl pt-3'><a className='underline' href={`/viewjob/${ID}`} target='_blank' rel='noreferrer'>View job</a></button>
                            </div>
                            <div className='bg-darker-grey h-[0.1px] my-5'></div>
                            <div className='pt-6'>
                                {job.screeningQuestions &&
                                    <div className='space-y-5 pb-12'>
                                        <p className='font-bold text-3xl flex flex-col'>Screening questions</p>
                                        {job.screeningQuestions.map(question => {
                                            return (
                                                <div className='flex flex-col justify-center space-y-5 py-2.5'>
                                                    <p className='text-xl'>{question[0]}{question[1] && <span className='text-red'> *</span>}</p>
                                                    <textarea name="answer" className='border rounded-md p-1 resize-none w-full h-[75px]' required={question[1]}></textarea>
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
                                <p className='font-bold text-3xl pb-10'>Select your CV</p>
                                {job.cv ?
                                    <div>
                                        <div
                                            className='border rounded-md border-dark-theme-grey p-2 space-y-5 inline-block cursor-pointer'>
                                            <div className='flex justify-between items-center pt-2'>
                                                <p>{job.cv[0]}</p>
                                                <i className="fas fa-check-circle fa-xl pr-1 text-dark-theme-grey"></i>
                                            </div>
                                            <Document file={job.cv[1]}>
                                                <Page pageNumber={1} className='border rounded-md overflow-ellipsis'/>
                                            </Document>
                                        </div>
                                        <div className='pt-5'>
                                            <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white'>
                                                <input id="upload" type="file" accept=".pdf" onChange={uploadFile}
                                                       className='hidden'/>
                                                <label htmlFor="upload" className='cursor-pointer'><i
                                                    className="fa-solid fa-upload"></i> Replace</label>
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <p className='pb-5'>You have not uploaded a cv.</p>
                                        <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white'>
                                            <input id="upload" type="file" accept=".pdf" onChange={uploadFile} className='hidden'/>
                                            <label htmlFor="upload" className='cursor-pointer'><i className="fa-solid fa-upload"></i> Upload</label>
                                        </button>
                                    </div>
                                }
                            </div>
                            <div className='bg-darker-grey h-[0.1px] my-12'></div>
                            <div>
                                <p className='font-bold text-3xl pb-5'>Write a cover letter {!job.coverLetterRequired ?
                                    <span className='text-lg'>(optional)</span> : <span className='text-red'> *</span>}</p>
                                <textarea id="coverLetterInput" className='border rounded-md p-1 resize-none w-full h-[200px]' required={job.coverLetterRequired}></textarea>
                            </div>
                        </div>
                        <div className='py-12'>
                            <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white' onClick={validateApplication}>Submit Application</button>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <Navbar/>
                    <div className='mt-36 flex flex-col items-center'>
                        <p className='text-3xl'>Job not found</p>
                    </div>
                </div>
            ) : <div className='mt-36 flex flex-col items-center'><Loading/></div>}
        </div>
    );
}