import {useParams} from "react-router-dom";
import JobDetailsCard from "../SearchPage/JobDetailsCard";
import Navbar from "../Navbar/Navbar";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import {GetData} from "../../Auth/GetUser";

export default function JobPage() {
    const {id} = useParams();
    const [job, setJob] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            if (user.length === 0){
                await GetData().then(r => {
                    setUser(r)
                });
            }
        };
        getUser()
    },[user]) // eslint-disable-line

    useEffect(() => {
        const getJob = async () => {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/jobs/${id}`)
                .then(async response => {
                    setJob(response.data)
                    setCompanyName(await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/company/${response.data.companyID}`).then(company => company.data.companyName));
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        };
        getJob()
    },[user]) // eslint-disable-line

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
                                companyID={job.companyID}
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