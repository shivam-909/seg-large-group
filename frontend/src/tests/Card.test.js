import React from 'react';
import { render, screen} from '@testing-library/react';
import Card from '../Components/MyJobs/Card';

describe ('Card component', () => {
    const cardProps = {
        name:'Test',
        id: 1,
        defaultVal: null
    };

    it ('should render component on the screen', () => {
        render (<Card {...cardProps}/>);
        expect(true).toBeTruthy();
    });

    it('shows delete button', () => {
        render (<Card {...cardProps} isEditing={true}/>);

        const deleteButton = screen.getByRole('button');
        expect(deleteButton).toBeInTheDocument();
        });

    it('should render id', () => {
        render (<Card {...cardProps}/>);
        const aName = screen.getByTestId('id-input');
        expect(aName).toBeInTheDocument();
    });
});
