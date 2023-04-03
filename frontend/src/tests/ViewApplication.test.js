const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import ViewApplicationPage from "../Components/Applicants/ViewApplicationPage";

jest.mock("axios");

describe("ViewApplicationPage", () => {
  const application = {
    searcher: 1,
    QnAs: { question1: "answer1", question2: "answer2" },
    cv: [1, "cv-url"],
    coverLetter: "cover letter content",
  };
  const searcher = {
    firstName: "John",
    lastName: "Doe",
  };
  const user = {
    userID: 1,
    pfpUrl: "user-avatar-url",
  };

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: application });
    axios.get.mockResolvedValueOnce({ data: searcher });
    axios.post.mockResolvedValueOnce({ data: user });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the application details", async () => {
    render(<ViewApplicationPage match={{ params: { id: 1 } }} />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));

    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();

    expect(screen.getByText(`${searcher.firstName} ${searcher.lastName}`)).toBeInTheDocument();
    expect(screen.getByText(application.QnAs.question1)).toBeInTheDocument();
    expect(screen.getByText(application.QnAs.question2)).toBeInTheDocument();
    expect(screen.getByText("No CV.")).toBeInTheDocument();
    expect(screen.getByText(application.coverLetter)).toBeInTheDocument();
  });

  it("renders a message when the application is not found", async () => {
    axios.get.mockRejectedValueOnce({});

    render(<ViewApplicationPage match={{ params: { id: 1 } }} />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();

    expect(screen.getByText("Application not found")).toBeInTheDocument();
  });
});
