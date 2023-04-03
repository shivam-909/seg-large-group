import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import QuestionCard from '../Components/MyJobs/QuestionCard';

describe ('QuestionCard component', () => {
    const cardProps = {
        name:'Test',
        id: 1,
        defaultVal: null
    };

    it ('should render component on the screen', () => {
        render (<QuestionCard {...cardProps}/>);
        expect(true).toBeTruthy();
    });

    it('shows delete button', () => {
        render (<QuestionCard {...cardProps} isEditing={true}/>);

        const deleteButton = screen.getByRole('button');
        expect(deleteButton).toBeInTheDocument();
    });
});
