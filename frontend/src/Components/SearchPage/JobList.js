import {useEffect, useState} from "react";
import JobPostCard from "./JobPostCard";
import JobDetailsCard from "./JobDetailsCard";

export default function JobList(props) {
    const increase = 9;
    const [count, setCount] = useState(0);
    const [pageCount, setPgCount] = useState(Math.ceil(props.jobs.length / increase) || 1);
    let currentPage = 1;
    const [cardList, setCardList] = useState([]);
    const [selectedJob, setSelectedJob] = useState(props.jobs[0]);

    async function createCard(job){
        if(!job){
            return;
        }
        setCardList(current => [...current, <div id={job.id} onClick={() => {selectJob(job)}}>
            <JobPostCard
                title={job.title} age={job.age} location={job.location} types={job.schedule}
                companyName={job.companyName} salary={`${job.compensation[0]}/${job.compensation[1]}`} urgent={job.urgent} requirements={job.requirements}
                benefits={job.benefits}/>
        </div>])
    }

    async function addCards(pageIndex){
        currentPage = pageIndex;
        const startRange = (pageIndex - 1) * increase;
        const endRange = currentPage >= pageCount ? props.jobs.length : pageIndex * increase;
        setCount(endRange)
        for (let i = startRange; i <= endRange-1; i++) {
            await createCard(props.jobs[i]);
        }
    }

    let throttleTimer;
    async function throttle(callback, time){
        if (throttleTimer) return;
        throttleTimer = true;
        setTimeout(() => {
            callback();
            throttleTimer = false;
        }, time);
    }

    function selectJob(job) {
        setSelectedJob(job);
        const currentJob = document.getElementById(job.id);
        currentJob.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    }

    useEffect(() => {
        async function handleInfiniteScroll(){
            await throttle(async () => {
                const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
                console.log(currentPage)
                if (currentPage >= pageCount) {
                    window.removeEventListener("scroll", handleInfiniteScroll);
                } else if (endOfPage) {
                    addCards(currentPage + 1)
                }
            },100);
        }
        window.removeEventListener("scroll", handleInfiniteScroll, true);
        setCardList([]);
        setSelectedJob(props.jobs[0]);
        setCount(0);
        currentPage = 1; // eslint-disable-line
        setPgCount(Math.ceil(props.jobs.length / increase) || 1)
        async function addCardScroll() {
            await addCards(currentPage);
        }
        addCardScroll();
        window.addEventListener('scroll', handleInfiniteScroll, true)
        return () => {window.removeEventListener("scroll",handleInfiniteScroll,true)}
    },[props.jobs])  // eslint-disable-line

    return (
        <div>
            <div className='flex items-start justify-center space-x-5 mx-8'>
                <div className='space-y-3 pb-12'>
                    {cardList}
                    <span className='pl-2'>Showing {count} of {props.jobs.length} jobs</span>
                </div>
                {selectedJob && <JobDetailsCard
                    id={selectedJob.id} age={selectedJob.age} urgent={selectedJob.urgent}
                    title={selectedJob.title} location={selectedJob.location}
                    companyName={selectedJob.companyName}
                    companyID={selectedJob.companyID}
                    salary={selectedJob.compensation}
                    types={selectedJob.type} schedule={selectedJob.schedule}
                    qualifications={selectedJob.qualifications}
                    requirements={selectedJob.requirements}
                    benefits={selectedJob.benefits}
                    description={selectedJob.description}
                    fullScreen={false}
                />}
            </div>
        </div>
    );
}