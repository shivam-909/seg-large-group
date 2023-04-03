import React from 'react';
import { render, fireEvent, screen, waitFor} from "@testing-library/react";
import ApplyPage from "../Components/ApplyPage/ApplyPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import userEvent from '@testing-library/user-event';

test('renders apply page', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<ApplyPage />} />
        </Routes>
      </BrowserRouter>
    );
    const navbar = screen.queryByTestId('navbar');
    waitFor(() => expect(navbar).toBeInTheDocument());
  });

  