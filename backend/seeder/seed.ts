import DB from "../db/db";

import {randomUUID} from "crypto";
import {faker} from '@faker-js/faker';

import JobListing from "../models/job";
import {Company, Searcher, User} from "../models/user";
import {Status} from "../models/enums/status.enum";
import Application from "../models/application";
import {companyNotification, searcherNotification} from "../models/enums/userNotification.enum";
import bcrypt from "bcrypt";
import * as jobsdb from "../db/jobs";
import * as usersdb from "../db/users";
import * as companiesdb from "../db/companies";
import * as applicationsdb from "../db/applications";
import * as notificationsdb from "../db/notifications";
import * as searcherdb from "../db/searchers";
import {
    ErrorCompanyNotFound,
    ErrorNoCompaniesExist,
    ErrorUserNotFound
} from "../service/public";
import {RetrieveUserByCompanyID, RetrieveUserBySearcherID} from "../db/users";
import {RetrieveJobListing} from "../db/jobs";

//CONTROL
const numCompanies = 5
const numSearchers = 10
const numJobListings = 100
const numApplications = 20

//=====================================================USERS=====================================================

async function GenerateUser(): Promise<User> {
    const id = randomUUID();
    const email = faker.internet.email();
    const password = "Password123!"

    return new User(
        id,
        email,
        hashPassword(password),
        faker.image.avatar(),
        GetRandomCity(),
        [],
        faker.lorem.paragraph(),
        undefined,
        undefined
    )
}

async function GenerateCompany(): Promise<Company> {
    const id = randomUUID()
    const companyName = faker.company.name();
    return new Company(
        companyName,
        id,
    );
}

export async function SeedCompanies(db: DB): Promise<void> {
    const companyPromises: Promise<Company>[] = [];
    for (let i = 0; i < numCompanies; i++) {
        companyPromises.push(GenerateCompany());
    }

    const companies = await Promise.all(companyPromises);

    const createPromises: Promise<void>[] = [];
    for (const company of companies) {
        const user = await GenerateUser();
        user.companyID = company.companyID;
        createPromises.push(companiesdb.CreateCompany(db, user, company));
    }

    await Promise.all(createPromises);
    console.log(`seeded companies`);
}

async function GenerateSearcher(db: DB): Promise<Searcher> {
    const id = randomUUID()
    const savedJobs = await RetrieveRandomJobIDArr(db);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const cv = [firstName + " " + lastName + "'s CV", "https://seg-joblink.s3.eu-west-2.amazonaws.com/cv/1047a922-d91f-43dc-80f2-7273ee90acaa.png.pdf"]

    return new Searcher(
        firstName,
        lastName,
        savedJobs,
        id,
        GenerateSkills(),
        GenerateEducation(),
        cv,
    );
}

export async function SeedSearchers(db: DB): Promise<void> {

    const searcherPromises: Promise<Searcher>[] = [];
    for (let i = 0; i < numSearchers; i++) {
        searcherPromises.push(GenerateSearcher(db));
    }

    const searchers = await Promise.all(searcherPromises);

    const createPromises: Promise<void>[] = [];
    for (const searcher of searchers) {
        const user = await GenerateUser();
        user.searcherID = searcher.searcherID;
        createPromises.push(searcherdb.CreateSearcher(db, user, searcher));
    }

    await Promise.all(createPromises);
    console.log(`seeded searchers`);
}

export async function RetrieveRandomSearcherId(db: DB): Promise<string> {
    const searcherIds = await searcherdb.GetAllSearcherIDs(db);
    return searcherIds[Math.floor(Math.random() * searcherIds.length)];
}

export function hashPassword(password: string): string {
    const hash = ((): string => {
        try {
            return bcrypt.hashSync(password, 10)
        } catch (e) {
            return ""
        }
    })();

    return hash as string;
}

function GenerateEducation(): string[] {
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'English', 'French', 'German'];
    const levels = ['Bachelors', 'Masters', 'PhD', "GCSE", "A Level"];
    const bachClasses = ['1st', '2:1', '2:2', '3rd'];
    const mastersClasses = ['Distinction', 'Merit', 'Pass'];
    const grades = ['A', 'B', 'C', 'D', 'E', 'F'];

    const numEducations = Math.floor(Math.random() * 2) + 1;

    const educations = [];

    for (let i = 0; i < numEducations; i++) {
        const subject = faker.helpers.arrayElement(subjects);
        const level = faker.helpers.arrayElement(levels);
        let qualification = '';
        let grade = '';

        if (level === 'Bachelors') {
            const bachClass = faker.helpers.arrayElement(bachClasses);
            qualification = `${subject}, ${level}, ${bachClass}`;
        } else if (level === 'Masters') {
            const mastersClass = faker.helpers.arrayElement(mastersClasses);
            qualification = `${subject}, ${level}, ${mastersClass}`;
        } else if (level === 'PhD') {
            qualification = `${subject}, ${level}`;
        } else if (level === 'GCSE' || level === 'A Level') {
            grade = faker.helpers.arrayElement(grades);
            qualification = `${subject},${level},${grade}`;
        }

        educations.push(qualification);
    }
    return educations;
}




//=====================================================JOB-LISTINGS=====================================================

async function GetRandomCompany(db: DB): Promise<Company> {

    const companyIds = await companiesdb.GetAllCompanyIds(db);

    if (companyIds.length === 0) {
        throw new Error(ErrorNoCompaniesExist);
    }

    let companyId: string = companyIds[Math.floor(Math.random() * companyIds.length)];

    const company = await companiesdb.RetrieveCompanyByID(db, companyId);

    if (!company) {
        throw new Error(ErrorCompanyNotFound);
    }

    return company;
}



function GenerateCompensation(): string[]{
    const yearlyAmount = [faker.datatype.number({
        'min': 20000,
        'max': 100000
    }).toString(), "year"];

    const hourlyAmount = [faker.datatype.number({
        'min': 10,
        'max': 49
    }).toString(), "hour"];

    const dailyAmount = [faker.datatype.number({
        'min': 80,
        'max': 392
    }).toString(), "day"];


    const weeklyAmount = [faker.datatype.number({
        'min': 400,
        'max': 1960
    }).toString(), "week"];

    return faker.helpers.arrayElement([yearlyAmount,hourlyAmount,dailyAmount,weeklyAmount]);
}

function GetRandomQuestions(): Record<string, boolean> {
    const MAX_QUESTIONS = Math.floor(Math.random() * 5) + 1;
    const randomQuestions: Record<string, boolean> = {};

    const interviewQuestions: [string, boolean][] = [
        ["Why haven’t you gotten your Bachelor’s Degree/Master’s Degree/Ph.D.?", true],
        ["Why have you switched jobs so many times?", true],
        ["Why did you change your career path?", false],
        ["Why did you decide to leave your previous/current job?", false],
        ["Why is there a gap in your work experience?", true],
        ["Why were you fired?", true],
        ["How do you feel about working weekends or late hours?", true],
        ["How would your boss describe you?", false],
        ["Do you have any serious medical conditions?", false],
        ["What would your first 30, 60, or 90 days look like in this role?", true],
        ["Are you a team player?", true],
        ["Are you a risk-taker?", false],
        ["How do you deal with pressure or stressful situation?", false],
        ["Do you think there is a difference between hard work and smart work?", true],
        ["How quickly do you adapt to new technology?", true],
        ["Do you have any interests outside of work?", true],
        ["What do you think our company/organization could do better?", false],
        ["Give an example of how you have handled a challenge in the workplace before.", false],
        ["Give an example of when you performed well under pressure.", true],
        ["Give an example of when you showed leadership qualities.", true]
    ];

    const shuffledQuestions = interviewQuestions.sort(() => Math.random() - 0.5);

    for (let i = 0; i < MAX_QUESTIONS && i < shuffledQuestions.length; i++) {
        randomQuestions[shuffledQuestions[i][0]] = shuffledQuestions[i][1];
    }

    return randomQuestions;
}


async function GenerateJobListing(db: DB): Promise<JobListing> {
    const company = await GetRandomCompany(db);
    const user = await usersdb.RetrieveUserByCompanyID(db, company.companyID);
    if (!user) {
        throw new Error(ErrorUserNotFound);
    }

    const id = randomUUID();

    return new JobListing(
        id,
        faker.name.jobTitle(),
        GenerateCompensation(),
        faker.lorem.paragraphs(5000).substring(0, Math.floor(Math.random() * (1000 + 1)) + 2000),
        user.location,
        faker.helpers.arrayElements(["Remote", "Hybrid", "In-Office"]),
        faker.helpers.arrayElements(["Part Time", "Full Time", "Internship", "Contract", "Apprenticeship"]),
        company.companyID,
        faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Finance"]),
        faker.datatype.boolean(),
        faker.datatype.boolean(),
        // faker.helpers.arrayElements(["Pass in  Maths and English GCSEs", "Bachelors Degree", "Masters Degree", "PhD", "High School Diploma", "International Baccalaureate"]),
        GenerateEducation(),
        faker.date.past(),
        [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
        GenerateSkills(),
        GetRandomQuestions()
);
}

function GenerateSkills(): string[] {
    const numSkills = Math.floor(Math.random() * 5) + 1;
    const skills: string[] = [];
    for (let i = 0; i < numSkills; i++) {
        skills.push(faker.company.bsNoun() + "," + ((Math.floor(Math.random() * 100) / 10) + 1).toString() + "," + faker.helpers.arrayElement(["weeks", "months", "years"]));
    }
    return skills;
}

export async function SeedJobListings(db: DB): Promise<void> {


    for (let i = 0; i < numJobListings; i++) {
        const jobListing = await GenerateJobListing(db);
        await jobsdb.CreateJobListing(db, jobListing);
    }
    console.log(`Seeded job listings`);
}

export async function RetrieveRandomJobListingID(db: DB): Promise<string> {
    const jobListingIds = await jobsdb.GetAllJobIDs(db);
    return jobListingIds[Math.floor(Math.random() * jobListingIds.length)];
}

export async function RetrieveRandomJobIDArr(db: DB): Promise<string[]> {
    const jobIds = await jobsdb.GetAllJobIDs(db);

    const shuffledJobIds = jobIds.sort(() => 0.5 - Math.random());

    const numJobs = Math.floor(Math.random() * 10) + 1;
    return shuffledJobIds.slice(0, numJobs);
}

//=====================================================APPLICATIONS=====================================================

function GetRandomQnAs(): Record<string, string> {
    const MAX_QnAs = Math.floor(Math.random() * 5) + 1;
    const QnAs: Record<string, string> = {};

    const interviewQuestions: [string, string][] = [
        ["Why haven’t you gotten your Bachelor’s Degree/Master’s Degree/Ph.D.?", faker.lorem.words()],
        ["Why have you switched jobs so many times?", faker.lorem.words()],
        ["Why did you change your career path?", faker.lorem.words()],
        ["Why did you decide to leave your previous/current job?", faker.lorem.words()],
        ["Why is there a gap in your work experience?", faker.lorem.words()],
        ["Why were you fired?", faker.lorem.words()],
        ["How do you feel about working weekends or late hours?", faker.lorem.words()],
        ["How would your boss describe you?", faker.lorem.words()],
        ["Do you have any serious medical conditions?", faker.lorem.words()],
        ["What would your first 30, 60, or 90 days look like in this role?", faker.lorem.words()],
        ["Are you a team player?", faker.lorem.words()],
        ["Are you a risk-taker?", faker.lorem.words()],
        ["How do you deal with pressure or stressful situation?", faker.lorem.words()],
        ["Do you think there is a difference between hard work and smart work?", faker.lorem.words()],
        ["How quickly do you adapt to new technology?", faker.lorem.words()],
        ["Do you have any interests outside of work?", faker.lorem.words()],
        ["What do you think our company/organization could do better?", faker.lorem.words()],
        ["Give an example of how you have handled a challenge in the workplace before.", faker.lorem.words()],
        ["Give an example of when you performed well under pressure.", faker.lorem.words()],
        ["Give an example of when you showed leadership qualities.", faker.lorem.words()]
    ];

    const shuffledQuestions = interviewQuestions.sort(() => Math.random() - 0.5);

    for (let i = 0; i < MAX_QnAs && i < shuffledQuestions.length; i++) {
        QnAs[shuffledQuestions[i][0]] = shuffledQuestions[i][1];
    }

    return QnAs;
}


async function GenerateApplicationListing(db: DB): Promise<Application> {
    const randomSearcher = await RetrieveRandomSearcherId(db);
    const randomJobListing = await RetrieveRandomJobListingID(db);
    const cv = [faker.name.fullName() + "'s CV", "https://seg-joblink.s3.eu-west-2.amazonaws.com/cv/1047a922-d91f-43dc-80f2-7273ee90acaa.png.pdf"]
    const coverLetter = faker.lorem.paragraphs(5000).substring(0, Math.floor(Math.random() * (100 + 1)) + 500);

        return new Application(
        randomUUID(),
        GetRandomStatus(),
        randomSearcher,
        randomJobListing,
        cv,
        GetRandomQnAs(),
        coverLetter,

    );
}

export async function SeedApplicationListings(db: DB): Promise<void> {
    for (let i = 0; i < numApplications; i++) {
        const applicationListing = await GenerateApplicationListing(db);
        await applicationsdb.CreateApplication(db, applicationListing);
    }
    console.log(`Seeded application listings`);
}

function GetRandomStatus(): string {
    const statusValues = Object.values(Status).filter((value) => typeof value === 'string');
    const randomIndex = Math.floor(Math.random() * statusValues.length);
    return statusValues[randomIndex] as string;
}


//=====================================================NOTIFICATIONS=====================================================


async function getApplications(db:DB): Promise<Application[]>{
    const applicationSnapshot = await db.ApplicationCollection().get();
    const applications: Application[] = [];
    applicationSnapshot.forEach(application => {
        applications.push(application.data());
    });
    return applications;
}


async function GenerateSearcherNotification(db: DB, application: Application){

    // const applications = await getApplications(db);
    let content = "";

    if(application.status == 'Interview'){
        content = searcherNotification.Interview.toString();
    }
    else if(application.status == 'Accepted'){

        content = searcherNotification.Accepted.toString();
    }
    else if(application.status == 'Rejected'){
        content = searcherNotification.Rejection.toString();
    }

    let searcher = await RetrieveUserBySearcherID(db, application.searcher);
    if(!searcher){
        throw new Error('searcher not found');
    }
    let searcherNotif = {
        id: randomUUID(),
        content,
        applicationID: application.id,
        created: faker.date.past(),
        userID: searcher.userID,
    }
    await notificationsdb.CreateNotification(db, searcherNotif);




}

async function GenerateCompanyNotification(db: DB, application: Application){

    let content = '';
    // const applications = await getApplications(db);
    let companyNotifs : any[] = [];

    if(application.status == 'Applied'){
        content = companyNotification.NewApplicant.toString();
    }
    else if(application.status == 'Archived'){
        content = companyNotification.Withdrawal.toString();
    }


    let jobListing = await RetrieveJobListing(db, application.jobListing);
    if(!jobListing){
        throw new Error('job listing not found');
    }
    let company = await RetrieveUserByCompanyID(db, jobListing.companyID);
    if(!company){
        throw new Error('company not found');
    }
    let companyNotif = {
        id: randomUUID(),
        content,
        applicationID: application.id,
        created: faker.date.past(),
        userID: company.userID,
    }
    await notificationsdb.CreateNotification(db, companyNotif);




}


export async function SeedAllNotifications(db: DB): Promise<void> {
    const applications = await getApplications(db)
    for(let i=0; i<applications.length; i++){

        const application = applications[i];
        if(application.status == 'Accepted' || application.status == 'Rejected' || application.status == 'Interview'){
            await GenerateSearcherNotification(db, application);
        }

        else{
            await GenerateCompanyNotification(db, application);
        }

    }

    console.log('seeded notifications');

}


function GetRandomCity(): string {
    const cities = [
        "Bath",
        "Birmingham",
        "Bradford",
        "Brighton & Hove",
        "Bristol",
        "Cambridge",
        "Canterbury",
        "Carlisle",
        "Chelmsford",
        "Chester",
        "Chichester",
        "Colchester",
        "Coventry",
        "Derby",
        "Doncaster",
        "Durham",
        "Ely",
        "Exeter",
        "Gloucester",
        "Hereford",
        "Kingston-upon-Hull",
        "Lancaster",
        "Leeds",
        "Leicester",
        "Lichfield",
        "Lincoln",
        "Liverpool",
        "London",
        "Manchester",
        "Milton Keynes",
        "Newcastle-upon-Tyne",
        "Norwich",
        "Nottingham",
        "Oxford",
        "Peterborough",
        "Plymouth",
        "Portsmouth",
        "Preston",
        "Ripon",
        "Salford",
        "Salisbury",
        "Sheffield",
        "Southampton",
        "Southend-on-Sea",
        "St Albans",
        "Stoke on Trent",
        "Sunderland",
        "Truro",
        "Wakefield",
        "Wells",
        "Westminster",
        "Winchester",
        "Wolverhampton",
        "Worcester",
        "York",
        "Armagh",
        "Bangor",
        "Belfast",
        "Lisburn",
        "Londonderry",
        "Newry",
        "Aberdeen",
        "Dundee",
        "Dunfermline",
        "Edinburgh",
        "Glasgow",
        "Inverness",
        "Perth",
        "Stirling",
        "Bangor",
        "Cardiff",
        "Newport",
        "St Asaph",
        "St Davids",
        "Swansea",
        "Wrexham"
    ]

    return faker.helpers.arrayElement(cities)
}
