import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
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

  it('allows adding new education', async () => {
    render(<Education profile={mockProfile} isEditing={true}/>);
    const addButton = screen.getByRole("button", {name: "Add"});
    expect(addButton).toBeInTheDocument();
    addButton.click();
    await waitFor(() => {
      expect(screen.getByText("Education:")).toBeInTheDocument();
    });
  });

});
