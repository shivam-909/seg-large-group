import {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function ApplyPage() {
    const {id} = useParams();

    // TODO: Show 'Error 404 Not Found' page if no id is provided

    const [job, setJob] = useState({
        title: '',
        company: '',
        location: '',
        salary: '',
        coverLetterRequired: true,
        CV: [],
        screeningQuestions: [
            ['Please list 2-3 dates and time ranges when you could do an interview.', false],
            ['How many years of Zoho development experience do you have?', true],
            ['Are you authorised to work in the United Kingdom?', true],
            ['Will you be able to reliably commute or relocate to Romford, Greater London for this job?', true],
        ],
    });
    // const [CV, setCV] = useState(['Cem Ratip CV', 'https://seg-joblink.s3.eu-west-2.amazonaws.com/Cem+Ratip+CV.pdf']);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/jobs/${id}`)
            .then(response => response.json())
            .then(data => {
                axios.get(`http://localhost:8000/api/user/${data.companyID}`)
                    .then(response => response.json())
                    .then (data => {
                        setJob({...job, company: data.companyName});
                    })
                // TODO: Get user's CV

                setJob({
                    ...job,
                    title: data.title,
                    location: data.location,
                    salary: data.salary,
                    screeningQuestions: data.screeningQuestions,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [job, id]);

    function validateApplication() {
        if (!job.screeningQuestions.empty) {
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
                    if (answer.value === '') {
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
                scrollElementIntoView[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        if (!job.CV) {
            const uploadBtn = document.getElementById('upload');
            uploadBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function uploadFile(e) {
        const file = e.target.files[0];
        const fileUrl = ''; // TODO: Upload file to S3 and get URL
        setJob({...job, CV: [file.name, fileUrl]});
    }

    return (
        <div>
            <Navbar/>
            <div className='mt-36 flex flex-col items-center'>
                <div>
                    <div>
                        <p className='text-xl pb-5'>You are applying for the role of:</p>
                        <p className='font-bold text-xl'>Java Developer</p>
                        <p className='text-xl'>Expedia</p>
                        <p className='text-xl'>London</p>
                        <p className='text-xl'>£36,000/year</p>
                        <button className='text-xl pt-3'><a className='underline' href='/' target='_blank'>View job</a></button>
                    </div>
                    <div className='bg-darker-grey h-[0.1px] my-5'></div>
                    <div className='pt-6'>
                        {job.screeningQuestions.length > 0 &&
                            <div className='space-y-5 pb-12'>
                                <p className='font-bold text-3xl flex flex-col'>Screening questions</p>
                                {job.screeningQuestions.map(question => {
                                    return (
                                        <div className='flex flex-col justify-center space-y-5 py-2.5'>
                                            <p className='text-xl'>{question[0]}{question[1] && <span className='text-red'> *</span>}</p>
                                            <textarea className='border rounded-md p-1 resize-none w-full h-[75px]' required={question[1]}></textarea>
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
                        {job.CV.length > 0?
                            <div>
                                <div className='border rounded-md border-dark-theme-grey p-2 space-y-5 inline-block cursor-pointer'>
                                    <div className='flex justify-between items-center pt-2'>
                                        <p>{job.CV[0]}</p>
                                        <i className="fas fa-check-circle fa-xl pr-1 text-dark-theme-grey"></i>
                                    </div>
                                    <Document file={job.CV[1]}>
                                        <Page pageNumber={1} className='border rounded-md overflow-ellipsis'/>
                                    </Document>
                                </div>
                                <div className='pt-5'>
                                    <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white'>
                                        <input id="upload" type="file" accept=".pdf" onChange={uploadFile} className='hidden'/>
                                        <label htmlFor="upload" className='cursor-pointer'><i className="fa-solid fa-upload"></i> Replace</label>
                                    </button>
                                </div>
                            </div>
                            :
                            <div>
                                <p className='pb-5'>You have not uploaded a CV.</p>
                                <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white'>
                                    <input id="upload" type="file" accept=".pdf" onChange={uploadFile} className='hidden'/>
                                    <label htmlFor="upload" className='cursor-pointer'><i className="fa-solid fa-upload"></i> Upload</label>
                                </button>
                            </div>
                        }
                    </div>
                    <div className='bg-darker-grey h-[0.1px] my-12'></div>
                    <div>
                        <p className='font-bold text-3xl pb-5'>Write a cover letter {!job.coverLetterRequired && <span className='text-lg'>(optional)</span>}</p>
                        <textarea id="coverLetterInput" className='border rounded-md p-1 resize-none min-w-[750px] h-[200px]' required={job.coverLetterRequired}></textarea>
                    </div>
                </div>
                <div className='py-12'>
                    <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white' onClick={validateApplication}>Submit Application</button>
                </div>
            </div>
        </div>
    );
}