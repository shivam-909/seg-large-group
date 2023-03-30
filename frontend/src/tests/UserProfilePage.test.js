import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import UserProfilePage from './UserProfilePage';

jest.mock('axios');

describe('UserProfilePage', () => {
  it('should render the component with loading', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [], searcher: { cv: [''] } })
    );
    const { container } = render(<UserProfilePage />);
    expect(container).toMatchSnapshot();
    await waitFor(() => screen.getByTestId('loading'));
  });

  it('should render the component with data for a searcher', async () => {
    const mockedData = {
      userID: '1234',
      firstName: 'Jane',
      lastName: 'Doe',
      location: 'New York, NY',
      searcherID: '1234',
      education: [
        { subject: 'Computer Science', grade: 'A+' },
        { subject: 'Mathematics', grade: 'B-' },
      ],
      skills: [
        { skill: 'React', duration: '1 year' },
        { skill: 'Node.js', duration: '2 years' },
      ],
      cv: ['cv1.pdf', 'https://www.example.com/cv1.pdf'],
    };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockedData }));
    const { container } = render(<UserProfilePage />);
    expect(container).toMatchSnapshot();
    await waitFor(() => expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument());
    expect(screen.getByText(/Computer Science/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/cv1.pdf/i)).toBeInTheDocument();
  });

  it('should render the component with data for a company', async () => {
    const mockedData = {
      userID: '5678',
      companyName: 'Acme Inc.',
      location: 'San Francisco, CA',
    };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockedData }));
    const { container } = render(<UserProfilePage />);
    expect(container).toMatchSnapshot();
    await waitFor(() => expect(screen.getByText(/Acme Inc./i)).toBeInTheDocument());
  });

  it('should toggle the edit mode when clicking the edit button', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [], searcher: { cv: [''] } })
    );
    const { container } = render(<UserProfilePage />);
    await waitFor(() => screen.getByTestId('loading'));
    expect(screen.queryByText(/Save/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Edit/i));
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });

  it('should display an error message when saving with empty required fields', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [], searcher: { cv: [''] } })
    );
    const { container } = render(<UserProfilePage />);
    await waitFor(() => screen.getByTestId('loading'));
    fireEvent.click(screen.getByText(/Edit/i));
    fireEvent.click(screen.getByText(/Save/i));
    await waitFor(() => expect(screen.getByTestId('errorBox')).toBeInTheDocument());
  });

  it('should update the profile data when saving with valid inputs', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { userID: '1234', firstName: 'Jane', lastName: 'Doe', location: '
