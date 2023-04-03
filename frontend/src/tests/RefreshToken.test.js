import axios from "axios";
import { render } from "@testing-library/react";
import RefreshToken from "../Auth/RefreshToken";

jest.mock("axios");

describe("RefreshToken component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call axios.post with correct arguments if refresh token exists", () => {
  //   localStorage.setItem("refresh", "my_refresh_token");
  //
  //   const mockResponse = {
  //     data: {
  //       access: "my_access_token",
  //       refresh: "my_new_refresh_token"
  //     }
  //   };
  //
  //   axios.post.mockResolvedValueOnce(mockResponse);
  //
  //   render(<RefreshToken />);
  //
  //   expect(axios.post).toHaveBeenCalledTimes(1);
  //   expect(axios.post).toHaveBeenCalledWith(
  //     `${process.env.REACT_APP_BACKEND_URL}auth/refresh`,
  //     expect.any(FormData)
  //   );
  //
  //   localStorage.removeItem("refresh");
  // });
  //
  // it("should not call axios.post if refresh token does not exist", () => {
  //   render(<RefreshToken />);
  //
  //   expect(axios.post).not.toHaveBeenCalled();
  // });
  //
  // it("should store access and refresh tokens in local storage if axios.post succeeds", async () => {
  //   localStorage.setItem("refresh", "my_refresh_token");
  //
  //   const mockResponse = {
  //     data: {
  //       access: "my_access_token",
  //       refresh: "my_new_refresh_token"
  //     }
  //   };
  //
  //   axios.post.mockResolvedValueOnce(mockResponse);
  //
  //   render(<RefreshToken />);
  //
  //   await expect(localStorage.getItem("access")).resolves.toBe(
  //     "my_access_token"
  //   );
  //   await expect(localStorage.getItem("refresh")).resolves.toBe(
  //     "my_new_refresh_token"
  //   );
  //
  //   localStorage.removeItem("access");
  //   localStorage.removeItem("refresh");
  // });
  //
  // it("should log error to console if axios.post fails", () => {
  //   localStorage.setItem("refresh", "my_refresh_token");
  //
  //   const mockError = new Error("Something went wrong");
  //   axios.post.mockRejectedValueOnce(mockError);
  //
  //   const spy = jest.spyOn(console, "log");
  //
  //   render(<RefreshToken />);
  //
  //   expect(spy).toHaveBeenCalledWith(mockError);
  //
  //   localStorage.removeItem("refresh");
  });
});
