import JobPostCard from "./JobPostCard";

function TempCard() {
    return (
        <JobPostCard
            title='Web Developer' age={2} location='London' types={['Full-time', 'Part-time']}
            companyName='Expedia' salary='30,000/year' urgent={true} requirements={['C#: 2 years']}
            benefits={['Free transport']}
        />
    );
}

export default TempCard;