import {useEffect} from "react";
import JobPostCard from "./JobPostCard";
function JobList() {
    // const countElem = document.getElementById("count");
    // const totalElem = document.getElementById("total");
    const limit = 99;
    const increase = 9;
    const pageCount = Math.ceil(limit / increase);
    let currentPage = 1;
    async function createCard(index){
        // <JobPostCard
        // title='Web Developer' age={2} location='London' types={['Full-time', 'Part-time']}
        // companyName='Expedia' salary='30,000/year' urgent={true} requirements={['C#: 2 years']}
        // benefits={['Free transport']}
        // />
        // card.className = "p-6 m-2 border-2 border-black";
        // card.innerHTML = index;
        const card = await document.createElement("div");
        card.innerHTML = "<JobPostCard title='Web Developer' age={2} location='London' types={['Full-time', 'Part-time']} companyName='Expedia' salary='30,000/year' urgent={true} requirements={['C#: 2 years']} benefits={['Free transport']} />"
        const container = await document.getElementById("container");
        // card.setAttribute("title", 'Web Developer');
        // card.age = 2;
        // card.setAttribute("location", 'London');
        // card.setAttribute('types' , "['Full-time', 'Part-time']");
        // card.setAttribute("companyName", "Expedia")
        // card.setAttribute("salary", "30,000/year")
        // card.setAttribute("urgent", "true")
        // card.setAttribute("requirements", "['C#: 2 years']")
        // card.setAttribute("benefits", '["Free transport"]')
        // card.companyName = "Expedia";
        // card.salary = '30,000/year'
        // card.urgent = true;
        // card.requirements = ['C#: 2 years']
        // card.benefits = ['Free transport']
        container.appendChild(card);
    };
    async function addCards(pageIndex){
        currentPage = pageIndex;
        const startRange = (pageIndex - 1) * increase;
        const endRange = currentPage == pageCount ? limit : pageIndex * increase;
        // countElem.innerHTML = " " + endRange;

        for (let i = startRange + 1; i <= endRange; i++) {
            await createCard(i);
        }
    };
    var throttleTimer;
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
        throttle(async () => {
            console.log(currentPage)
            const endOfPage =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
            if (endOfPage) {
                await addCards(currentPage + 1);
            }
            if (currentPage === pageCount) {
                console.log("STOPPED")
                removeInfiniteScroll();
            }
        }, 500);
    };
    if (document.readyState === 'complete') {
        console.log("ready")
        window.addEventListener("scroll", handleInfiniteScroll);
        addCards(currentPage);
    }
    // window.onload = function () {
    //     window.addEventListener("scroll", handleInfiniteScroll);
    //     addCards(currentPage);
    // }
    return (
        <div>
            <div id="container"></div>
            <div className='action'>
                <span>Showing
                    <span id="count"> </span> of
                    <span id="total"> {limit}</span> jobs
                </span>
            </div>
        </div>
    );
}

export default JobList;