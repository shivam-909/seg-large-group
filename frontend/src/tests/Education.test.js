import React from 'react';
import { render, screen } from '@testing-library/react';
import Education from '../Components/ProfilePage/Education';
import {BrowserRouter, Route, Routes} from "react-router-dom";

describe("Education", () => {
  const mockProfile ={
    searcher: {
      qualifications: [
        "Bachelor's degree,Computer Science,First class",
        "Master's degree,Data Science,Distinction",
      ],
    },
  };

  it('renders the component without crashing', () => {
    render(<Education profile={mockProfile} />);
  });

  it('allows adding new education', () => {
    render(<Education profile={mockProfile} isEditing={true} />);
    const addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton).toBeInTheDocument();
    addButton.click();
    expect(screen.getByText("Education:")).toBeInTheDocument();

  });

});
