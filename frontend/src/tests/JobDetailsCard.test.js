import { render, screen, fireEvent} from "@testing-library/react";
import JobDetailsCard from "../Components/SearchPage/JobDetailsCard";

const jobDetails = {
  id:"1234",
  title:"Software Engineer",
  companyName:"Acme Inc",
  location:"London",
  salary:"50000",
  types:["Full-time","Permanent"],
  schedule:["Monday-Friday","9am-5pm"],
  qualifications:["Bachelor's degree", "2 years of experience"],
  benefits:["Health insurance", "Retirement plan"],
  description:"Job description goes here",
  urgent:true,
  age:"2 days ago",
};

describe("JobDetailsCard", () => {
  test("renders job details", () => {
    render(<JobDetailsCard {...jobDetails} />);
    expect(screen.getByText(jobDetails.title)).toBeInTheDocument();
    expect(screen.getByText(jobDetails.companyName)).toBeInTheDocument();
    expect(screen.getByText(jobDetails.location)).toBeInTheDocument();
    expect(screen.getByText(/apply now/i)).toBeInTheDocument();
    expect(screen.getByAltText(/share/i)).toBeInTheDocument();
    expect(screen.getByAltText(/save/i)).toBeInTheDocument();
    expect(screen.getByAltText(/open in new tab/i)).toBeInTheDocument();
    expect(screen.getByText(/salary/i)).toBeInTheDocument();
    expect(screen.getByText(/job type/i)).toBeInTheDocument();
    expect(screen.getByText(/shift and schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/full-time/i)).toBeInTheDocument();
    expect(screen.getByText(/permanent/i)).toBeInTheDocument();
    expect(screen.getByText(/monday-friday/i)).toBeInTheDocument();
    expect(screen.getByText(/9am-5pm/i)).toBeInTheDocument();
    expect(screen.getByText(/qualifications/i)).toBeInTheDocument();
    expect(screen.getByText(/benefits/i)).toBeInTheDocument();
    expect(screen.getByText(/job description/i)).toBeInTheDocument();
    expect(screen.getByText(/urgent/i)).toBeInTheDocument();
    expect(screen.getByText(/2 days ago/i)).toBeInTheDocument();
  });

  test("clicking save button toggles saved job post", () => {
    render(<JobDetailsCard {...jobDetails} />);
    const saveButton = screen.getByAltText(/save/i);
    fireEvent.click(saveButton);
    expect(screen.getByAltText(/saved/i)).toBeInTheDocument();
    fireEvent.click(saveButton);
    expect(screen.getByAltText(/save/i)).toBeInTheDocument();
  });

  test("clicking share button opens share modal", () => {
    render(<JobDetailsCard {...jobDetails} />);
    const shareButton = screen.getByAltText(/share/i);
    fireEvent.click(shareButton);
    expect(screen.getByAltText(/share this job post/i)).toBeInTheDocument();
  });

  test("clicking close button closes share modal", () => {
    render(<JobDetailsCard {...jobDetails} />);
    const shareButton = screen.getByAltText(/share/i);
    fireEvent.click(shareButton);
    expect(screen.getByAltText(/share this job post/i)).toBeInTheDocument();
    const closeButton = screen.getByAltText(/x/i);
    fireEvent.click(closeButton);
    expect(screen.queryByText(/share this job post/i)).not.toBeInTheDocument();
  });

  test("clicking copy button copies job post link to clipboard", async () => {
    const writeTextMock = jest.fn();
    Object.defineProperty(navigator, "clipboard",{
      value:{ writeText: writeTextMock },
    });

    render(<JobDetailsCard {...jobDetails} />);
    const copyButton = screen.getByAltText(/copy/);
    fireEvent.click(copyButton);
    expect(writeTextMock).toHaveBeenCalledWith(
      `${process.env.FRONTEND_BASE_URL}${jobDetails.id}`
    );
  });
});
