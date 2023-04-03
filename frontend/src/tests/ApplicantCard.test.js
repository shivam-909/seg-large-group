import React from 'react';

import {render, screen, waitFor} from '@testing-library/react';
import ApplicantCard from '../Components/Applicants/ApplicantCard';
import axios from 'axios';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

jest.mock('axios');

describe('ApplicantsCard', () => {
    const props = {
            id: '1',
            name: 'Test1',
            pfpUrl:'',
            email: 'test@gmail.com',
            status: 'Hired'
        };

    // test ('renders navbar', () => {
    //     render(
    //         <ApplicantCard/>);
    //     const navBar = screen.queryByTestId('navbar');
    //     waitFor(() => expect(navBar).toBeInTheDocument());
    //     });

    test('renders the name', () => {
        render(<ApplicantCard {...props}/>);
        const name = screen.getByText(props.name);
        expect(name).toBeInTheDocument();
    });

    test('renders the email', () => {
        render(<ApplicantCard {...props}/>);
        const email = screen.getByText(props.email);
        expect(email).toBeInTheDocument();
    });

    test('renders the status', () => {
        render(<ApplicantCard {...props}/>);
        const status = screen.getByText(props.status);
        expect(status).toBeInTheDocument();
    });

    // test('successfully fetches from API', () => {
    //     render(<ApplicantCard {...props}/>);
    //     axios.post.mockImplementationOnce(() => Promise.resolve(props));
    //     expect(axios.post).toHaveBeenCalledWith(
    //         `${process.env.REACT_APP_BACKEND_URL}api/user/typeid`,
    //     );
    // });
});
//
//     test ('render with props', () => {
//         const props = {
//             id: '1',
//             name: 'Test1',
//             email: 'test@gmail.com',
//             status: 'Hired'
//         };
//         const  { getByLabelText, getByText } = render(<ApplicantCard {...props} />);
//         const skillInput = getByLabelText('Skill');
//         const durationInput = getByLabelText('Duration');
//         const intervalSelect = getByLabelText('Interval');
//         const deleteButton = getByText('Delete');
//

//     });
// });