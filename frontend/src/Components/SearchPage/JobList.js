import {useEffect, useState} from "react";
import JobPostCard from "./JobPostCard";

export default function JobList(props) {
    const [count, setCount] = useState(0);
    const [total] = useState(props.length);
    const increase = 9;
    const pageCount = Math.ceil(total / increase) || 1;
    let currentPage = 1;
    const [cardList, setCardList] = useState([]);

    async function createCard(job){
        setCardList(current => [...current, <div id={job.id}>
            <JobPostCard
                title={job.title} age={job.age} location={job.location} types={job.schedule}
                companyName={job.companyName} salary={`${job.compensation[0]}/${job.compensation[1]}`} urgent={job.urgent} requirements={job.requirements}
                benefits={job.benefits}/>
        </div>])
    };

    async function addCards(pageIndex){
        console.log("jobs:" + props.jobs?.id)
        currentPage = pageIndex;
        const startRange = (pageIndex - 1) * increase;
        const endRange = currentPage >= pageCount ? total : pageIndex * increase;
        setCount(endRange)
        for (let i = startRange + 1; i <= endRange; i++) {
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

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        async function addCardScroll(){
            await addCards(currentPage);
        }
        addCardScroll();
    },[]) // eslint-disable-line

    return (
        <div>
            <div id="container"></div>
            {cardList}
            <span>Showing {count} of {total} jobs
            </span>
        </div>
    );
}