import {useParams} from "react-router-dom";
import JobDetailsCard from "../SearchPage/JobDetailsCard";
import Navbar from "../Navbar/Navbar";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function JobPage() {
    const {id} = useParams();
    const [job, setJob] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getJob = async () => {
            await axios.get("http://localhost:8000/api/jobs/"+id)
                .then(async response => {
                    setJob(response.data)
                    setCompanyName(await axios.get("http://localhost:8000/api/company/" + response.data.companyID).then(company => company.data.companyName));
                    setLoading(false);
                })
                .catch(() => setLoading(false));
            console.log(job)
        };
        getJob()
    },[]) // eslint-disable-line

    return (
        <div>
            <Navbar/>
            {isLoading ?
                <div className='flex items-center justify-center mt-48'>
                    <Loading className='w-16 h-16 border-[6px] border-dark-theme-grey'/>
                </div>
                :
                <div>
                    {job ?
                        <div className='pt-24 pb-12 flex flex-col items-center justify-center bg-lighter-grey'>
                            <JobDetailsCard
                                id={id} age={job.age} urgent={job.urgent}
                                title={job.title} location={job.location}
                                companyName={companyName}
                                salary={job.compensation}
                                types={job.type} schedule={job.schedule}
                                qualifications={job.qualifications}
                                requirements={job.requirements}
                                benefits={job.benefits}
                                description={job.description}
                                fullScreen={true}
                            />
                        </div>
                        :
                        <div>
                            <p className='text-center text-2xl flex items-center justify-center mt-48'>Job not found.</p>
                        </div>
                    }
                </div>
            }
        </div>
    );
}