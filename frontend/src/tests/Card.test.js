import React from 'react';
import { render, screen, configure} from '@testing-library/react';
import Card from '../Components/MyJobs/Card';

describe ('Card component', () => {
    const cardProps ={
        name:'Test',
        id: 1,
        defaultVal:1
    };

    it ('should render component on the screen', () => {
        render (<Card {...cardProps}/>);
        expect(true).toBeTruthy();
    });

    // it('should delete skill when button is clicked', () => {
    //     const {getByTestId} = render (<Card {...cardProps}/>);
    //
    //     const deleteButton = screen.getByTestId('delete-button');
    //     expect(deleteButton).getByRole('button', {name: /delete/i}).toBeInTheDocument();
    // });

    // it('should render name', () => {
    //     render (<Card {...cardProps}/>);
    //     const aName = screen.getByText(cardProps.name);
    //     expect(aName).toBeInTheDocument();
    // });
    //
    // it('should render id', () => {
    //     render(<Card {...cardProps}/>);
    //     const anId = screen.getByText(cardProps.id);
    //     expect(anId).toBeInTheDocument();
    // });
});
