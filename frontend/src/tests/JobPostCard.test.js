import { render, screen } from "@testing-library/react";
import JobPostCard from "./Components/SearchPage/JobPostCard";

describe('JobPostCard', () => {
  const jobPostProps = {
    title:"Frontend Developer",
    companyName:"Acme Inc",
    location:"New York, NY",
    salary:"100k-120k",
    types:["Full-time","Remote"],
    urgent:true,
    requirements:["5+ years of experience", "Strong HTML/CSS skills"],
    benefits:["Health Insurance", "401k plan"],
    age:1,
  };

  it('renders the job title', () => {
    render(<JobPostCard {...jobPostProps} />);
    const jobTitle = screen.getByText(jobPostProps.title);
    expect(jobTitle).toBeInTheDocument();
  });

  it('renders the company name', () => {
    render(<JobPostCard {...jobPostProps} />);
    const companyName = screen.getByText(jobPostProps.companyName);
    expect(companyName).toBeInTheDocument();
  });

  it('renders the job location', () => {
    render(<JobPostCard {...jobPostProps} />);
    const jobLocation = screen.getByText(jobPostProps.location);
    expect(jobLocation).toBeInTheDocument();
  });

  it('renders the job salary', () => {
    render(<JobPostCard {...jobPostProps} />);
    const jobSalary = screen.getByText(`£${jobPostProps.salary}`);
    expect(jobSalary).toBeInTheDocument();
  });

  it('renders the job types', () => {
    render(<JobPostCard {...jobPostProps} />);
    jobPostProps.types.forEach((type) => {
      const jobType = screen.getByText(type);
      expect(jobType).toBeInTheDocument();
    });
  });

  it('renders the urgent status', () => {
    render(<JobPostCard {...jobPostProps} />);
    const urgentStatus = screen.getByTextId('urgent-status');
    expect(urgentStatus).toBeInTheDocument();
  });

  it('renders the job requirements', () => {
    render(<JobPostCard {...jobPostProps} />);
    jobPostProps.requirements.forEach((requirement) => {
      const jobRequirement = screen.getByText(requirement);
      expect(jobRequirement).toBeInTheDocument();
    });
  });

  it('renders the job benefits', () => {
    render(<JobPostCard {...jobPostProps} />);
    jobPostProps.benefits.forEach((benefit) => {
      const jobBenefit = screen.getByText(benefit);
      expect(jobBenefit).toBeInTheDocument();
    });
  });

  it('renders the job age', () => {
    render(<JobPostCard {...jobPostProps} />);
    const jobAge = screen.getByText(/ago/);
    expect(jobAge).toBeInTheDocument();
  });
});
