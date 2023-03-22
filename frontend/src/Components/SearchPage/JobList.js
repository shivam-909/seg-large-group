import {useEffect, useState} from "react";
import JobPostCard from "./JobPostCard";
import JobDetailsCard from "./JobDetailsCard";

export default function JobList(props) {
    const [count, setCount] = useState(0);
    const [total] = useState(props.jobs.length);
    const increase = 9;
    const pageCount = Math.ceil(total / increase) || 1;
    let currentPage = 1;
    const [cardList, setCardList] = useState([]);
    const [selectedJob, setSelectedJob] = useState(props.jobs[0]);

    async function createCard(job){
        setCardList(current => [...current, <div id={job.id} onClick={() => {selectJob(job)}}>
            <JobPostCard
                title={job.title} age={job.age} location={job.location} types={job.schedule}
                companyName={job.companyName} salary={`${job.compensation[0]}/${job.compensation[1]}`} urgent={job.urgent} requirements={job.requirements}
                benefits={job.benefits}/>
        </div>])
    };

    async function addCards(pageIndex){
        currentPage = pageIndex;
        const startRange = (pageIndex - 1) * increase;
        const endRange = currentPage >= pageCount ? total : pageIndex * increase;
        setCount(endRange)
        for (let i = startRange; i <= endRange-1; i++) {
            await createCard(props.jobs[i]);
        }
    };

    let throttleTimer;
    async function throttle(callback, time){
        if (throttleTimer) return;
        throttleTimer = true;
        setTimeout(() => {
            callback();
            throttleTimer = false;
        }, time);
    };

    const removeInfiniteScroll = () => {
        window.removeEventListener("scroll", handleInfiniteScroll);
    };
    async function handleInfiniteScroll(){
        await throttle(async () => {
            const endOfPage =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
            if (endOfPage) {
                await addCards(currentPage + 1);
            }
            if (currentPage >= pageCount) {
                removeInfiniteScroll();
            }
        }, 500);
    };

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
        window.addEventListener("scroll", handleInfiniteScroll);
        async function addCardScroll(){
            await addCards(currentPage);
        }
        addCardScroll();
    },[]) // eslint-disable-line

    return (
        <div>
            <div className='flex items-start justify-center space-x-5 mx-8'>
                <div className='space-y-3'>
                    {cardList}
                    <span>Showing {count} of {total} jobs</span>
                </div>
                <JobDetailsCard className={"top-48"}
                    id={selectedJob.id} age={selectedJob.age} urgent={selectedJob.urgent}
                    title={selectedJob.title} location={selectedJob.location} companyName={selectedJob.companyName} salary={`${selectedJob.compensation[0]}/${selectedJob.compensation[1]}`}
                    types={selectedJob.type} schedule={selectedJob.schedule}
                    qualifications={selectedJob.qualifications}
                    benefits={selectedJob.benefits}
                    description={selectedJob.description}/>
            </div>
        </div>
    );
}