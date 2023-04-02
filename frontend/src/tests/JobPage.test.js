import React from 'react';
import { render, fireEvent, screen, waitFor} from "@testing-library/react";
import JobPage from "../Components/JobPage/JobPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import userEvent from '@testing-library/user-event';

test('renders JobPage page', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<JobPage />} />
        </Routes>
      </BrowserRouter>
    );
  });

test ('renders navbar', () => {
    render(
        <BrowserRouter>
          <Routes>
            <Route element={<JobPage />} />
          </Routes>
        </BrowserRouter>
      );
    const navBar = screen.queryByTestId('navbar');
    waitFor(() => expect(navBar).toBeInTheDocument());
});