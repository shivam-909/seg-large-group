const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

jest.mock('axios');

import React from 'react';
import {render} from '@testing-library/react';
import CompanyJobCard from '../Components/MyJobs/CompanyJobCard';
import axios from 'axios';

describe('CompanyJobCard', () => {
    it('renders component with props', () => {
        const props = {
            id: 1,
            date: 3/3/2023,
            location:'',
            schedule:'',
            title: 'Job1',
            contentLabel:'Example Modal'
        };
        render(<CompanyJobCard {...props}/> );
    });

    it('deletes job when delete button is clicked', async () => {
        const props = {
            id:'1',
            date: 3/3/2023,
            location:'',
            schedule:'',
            title: 'Job1',
            contentLabel:'Example Modal'

        };
        axios.get.mockResolvedValueOnce({ data: { setJobList: props } });
        axios.delete.mockResolvedValueOnce();
        render(<CompanyJobCard />);
     });
});

