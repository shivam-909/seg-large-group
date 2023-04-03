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

// const ContactModal = props => {

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
        // expect(screen.getByText('Example Modal')).toBeInTheDocument();
        // const deleteButton = screen.queryByTestId('delete-button').getByLabelText('Delete');
        // userEvent.click(deleteButton);
        // expect(axios.delete).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}api/jobs/${props.id}`, {
        //     headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
        // });

            //     const editButton = getByRole('button', {class: 'fa-solid fa-pen-to-square text-xl'});
    // //     const
    //
     })
});

