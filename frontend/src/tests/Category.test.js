import { render, screen, waitFor } from '@testing-library/react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Category from '../Components/MyJobs/Category';

jest.mock('axios');

describe('Categories', () => {
    // it('renders applications if they are to be found', () => {
    //     axios.get.mockResolvedValueOnce({ data: { setJobsList: [] } });
    //     render(<Category />);
    //     expect(screen.getByRole('jobFound')).toBeInTheDocument();
    //     });

    // it('renders "no applications found" when there are no applications', async() => {
    //     axios.get.mockResolvedValueOnce({ data: { setJobsList: [] } });
    //     render(<Category />);
    //     await screen.findByText('no applications found');
    //     expect(screen.getByText('no applications found')).toBeInTheDocument();
    // });
})