import { render, screen } from '@testing-library/react';
import JobList from '../Components/SearchPage/JobList';
import {BrowserRouter, Route, Routes} from "react-router-dom";

test('renders job cards', async () => {
  const jobs = [
    {id: 1, title: 'Job 1', age: '1 day ago', location: 'New York', schedule: 'Full-time', companyName: 'Company A', compensation: [50, 100], urgent: true, requirements: 'Some requirements', benefits: 'Some benefits'},
    {id: 2, title: 'Job 2', age: '2 days ago', location: 'Los Angeles', schedule: 'Part-time', companyName: 'Company B', compensation: [30, 60], urgent: false, requirements: 'Some requirements', benefits: 'Some benefits'},
    {id: 3, title: 'Job 3', age: '3 days ago', location: 'Chicago', schedule: 'Full-time', companyName: 'Company C', compensation: [80, 120], urgent: true, requirements: 'Some requirements', benefits: 'Some benefits'}
  ];
  render(<JobList jobs={jobs} />);
//   const jobCards = await screen.findAllByTestId('job-post-card');
//   expect(jobCards).toHaveLength(3);
 });
//
// test('selects job when card is clicked', async () => {
//   const jobs = [
//     {id: 1, title: 'Job 1', age: '1 day ago', location: 'New York', schedule: 'Full-time', companyName: 'Company A', compensation: [50, 100], urgent: true, requirements: 'Some requirements', benefits: 'Some benefits'},
//     {id: 2, title: 'Job 2', age: '2 days ago', location: 'Los Angeles', schedule: 'Part-time', companyName: 'Company B', compensation: [30, 60], urgent: false, requirements: 'Some requirements', benefits: 'Some benefits'},
//     {id: 3, title: 'Job 3', age: '3 days ago', location: 'Chicago', schedule: 'Full-time', companyName: 'Company C', compensation: [80, 120], urgent: true, requirements: 'Some requirements', benefits: 'Some benefits'}
//   ];
//   render(<JobList jobs={jobs} />);
//   const jobCard = await screen.findByTestId('job-post-card-1');
//   jobCard.click();
//   const jobDetailsCard = await screen.findByTestId('job-details-card');
//   expect(jobDetailsCard).toBeInTheDocument();
// });
