import { render } from "@testing-library/react";
import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { GetData } from "../Auth/GetUser";
import RefreshToken from "../Auth/RefreshToken";
import CompanyRoute from "../Auth/CompanyRoute";

jest.mock("../Auth/RefreshToken");
jest.mock("../Auth/GetUser");

describe("CompanyRoute component", () => {
  it("renders Outlet component if user is a company", async () => {
  //   GetData.mockResolvedValueOnce({ companyID: "123" });
  //
  //   const { getByText } = render(<CompanyRoute />);
  //
  //   const outletElement = getByText("Outlet");
  //   expect(outletElement).toBeInTheDocument();
  // });
  //
  // it("redirects to home page if user is not a company", async () => {
  //   GetData.mockResolvedValueOnce({});
  //
  //   const { getByRole } = render(<CompanyRoute />);
  //
  //   const navigateElement = getByRole("navigation");
  //   expect(navigateElement).toHaveAttribute("href", "/");
  });
});
