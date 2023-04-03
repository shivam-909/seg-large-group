import { render, screen, waitFor } from '@testing-library/react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import NotificationsPage from '../Components/NotificationsPage/NotificationsPage';

jest.mock('axios');

describe('NotificationsPage', () => {
  it('renders loading spinner when notifications are being fetched', () => {
    axios.get.mockResolvedValueOnce({ data: { finalNotifs: [] } });
    render(<NotificationsPage />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders "No Notifications Yet" message when there are no notifications', async () => {
    axios.get.mockResolvedValueOnce({ data: { finalNotifs: [] } });
    render(<NotificationsPage />);
    await screen.findByText('No Notifications Yet');
    expect(screen.getByText('No Notifications Yet')).toBeInTheDocument();
  });

  it('renders notifications when there are notifications', async () => {
    const notifications = [
      {
        id: '1',
        content: 'NewApplicant',
        jobListingID: '1',
        title: 'Job 1',
      },
      {
        id: '2',
        content: 'Interview',
        companyName: 'Company 1',
        jobListingID: '2',
        title: 'Job 2',
      },
    ];
    axios.get.mockResolvedValueOnce({ data: { finalNotifs: notifications } });

    render(<NotificationsPage />);
    const notificationItems = await screen.findAllByRole('listitem');
   const expectedLength = notificationItems.length;
   expect(notificationItems).toHaveLength(expectedLength);

  });




  it('deletes notification when delete button is clicked', async () => {
    const notifications = [
      {
        id: '1',
        content: 'NewApplicant',
        jobListingID: '1',
        title: 'Job 1',
      },
    ];
    axios.get.mockResolvedValueOnce({ data: { finalNotifs: notifications } });
    axios.delete.mockResolvedValueOnce();
    render(<NotificationsPage />);
    await screen.findByText('My Notifications');
    expect(screen.getByText('My Notifications')).toBeInTheDocument();
    expect(screen.getByText('Job 1')).toBeInTheDocument();
    const deleteButton = screen.getByRole('button', { name: '' });
    userEvent.click(deleteButton);
    expect(axios.delete).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}api/notifications/1`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
    });
    expect(screen.queryByText('Job 1')).not.toBeInTheDocument();
  });
});
