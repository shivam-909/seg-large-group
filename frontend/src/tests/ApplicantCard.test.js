import React from 'react';
import { render} from '@testing-library/react';
import ApplicantCard from '../Components/Applicants/ApplicantCard';

describe('ApplicantsCard', () => {
    test('renders ApplicantsCard correctly', () => {
        const props = {
            id: '1',
            name: 'Test1',
            pfpUrl:'',
            email: 'test@gmail.com',
            status: 'Hired'
        };
        render(
            <ApplicantCard/>

    );
    });

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
//
//
//     });
// });