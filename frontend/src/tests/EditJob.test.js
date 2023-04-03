import {render} from "@testing-library/react";
import EditJob from "../Components/MyJobs/EditJob";
import React from "react";
import { initialize } from "@googlemaps/jest-mocks";
import { setupJestCanvasMock } from 'jest-canvas-mock';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('EditJob', () => {
    beforeEach(() => {
        initialize();
        setupJestCanvasMock();
    });
    // test ('renders EditJob', () => {
    //     render(
    //        <EditJob/>);
        //
        // const navBar = screen.queryByTestId('navbar');
        // waitFor(() => expect(navBar).toBeInTheDocument());
        // });
});
