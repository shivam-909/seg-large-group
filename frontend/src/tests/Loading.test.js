import {render, screen, waitFor} from '@testing-library/react';
import Loading from '../Components/Loading/Loading';
import {BrowserRouter, Route, Routes} from "react-router-dom";

describe('Loading', () => {
  test('renders Login Page', () => {
    render(<Loading/>);
    const loaderElement = screen.getByRole("status");
    expect(loaderElement).toBeInTheDocument();
  });
  test('renders Login Page', () => {
    render(<Loading className="custom-class"/>);
    const loaderElement = screen.getByRole("status");
    expect(loaderElement).toHaveClass("custom-class");
  });


});
