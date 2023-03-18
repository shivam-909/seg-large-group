import {useState} from "react";
import Navbar from "../Navbar/Navbar";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import {useParams} from "react-router-dom";

export default function ApplyPage() {
    const {id} = useParams();

    // TODO: Show 'Error 404 Not Found' page if no id is provided
    // TODO: Fetch job details using id

    const screeningQuestions = [
        ['Please list 2-3 dates and time ranges when you could do an interview.', false],
        ['How many years of Zoho development experience do you have?', true],
        ['Are you authorised to work in the United Kingdom?', true],
        ['Will you be able to reliably commute or relocate to Romford, Greater London for this job?', true],
    ];
    const [CV, setCV] = useState(['Cem Ratip CV', 'https://seg-joblink.s3.eu-west-2.amazonaws.com/Cem+Ratip+CV.pdf']);

    function validateApplication() {
        if (!screeningQuestions.empty) {
            const answers = document.getElementsByTagName('textarea');
            const scrollElementIntoView = [];
            Array.from(answers).forEach(answer => {
                if (answer.required) {
                    answer.className = 'border rounded-md p-1 resize-none w-full h-[75px]';
                    if (answer.value === '') {
                        answer.className = 'border border-red rounded-md p-1 resize-none w-full h-[75px]';
                        scrollElementIntoView.push(answer);
                    }
                }
            });
            if (scrollElementIntoView.length > 0) {
                scrollElementIntoView[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        if (!CV) {
            const uploadBtn = document.getElementById('upload');
            uploadBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function uploadFile(e) {
        const file = e.target.files[0];
        // const fileUrl =
        setCV([file.name, '']);
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
                        {screeningQuestions.length > 0 &&
                            <div className='space-y-5 pb-12'>
                                <p className='font-bold text-3xl flex flex-col'>Screening questions</p>
                                {screeningQuestions.map(question => {
                                    return (
                                        <div className='flex flex-col justify-center space-y-5 py-2.5'>
                                            <p className='text-xl'>{question[0]}{question[1] && <span className='text-red'> *</span>}</p>
                                            <textarea className='border rounded-md p-1 resize-none w-full h-[75px]' required={question[1]}></textarea>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                    <div className='pb-12'>
                        <p className='font-bold text-3xl pb-10'>Select your CV</p>
                        {CV ?
                            <div>
                                <div className='border rounded-md border-dark-theme-grey p-2 space-y-5 inline-block cursor-pointer'>
                                    <div className='flex justify-between items-center pt-2'>
                                        <p>{CV[0]}</p>
                                        <i className="fas fa-check-circle fa-xl pr-1 text-dark-theme-grey"></i>
                                    </div>
                                    <Document file={CV[1]}>
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
                    <div>
                        <p className='font-bold text-3xl pb-5'>Write a cover letter <span className='text-lg'>(optional)</span></p>
                        <textarea className='border rounded-md p-1 resize-none w-full h-[200px]'></textarea>
                    </div>
                </div>
                <div className='py-12'>
                    <button className='bg-dark-theme-grey rounded-md py-2.5 px-4 font-bold text-white' onClick={validateApplication}>Submit Application</button>
                </div>
            </div>
        </div>
    );
}