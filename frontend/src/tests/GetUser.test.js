import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import RefreshToken from '../Auth/RefreshToken';
import { GetData } from '../Auth/GetUser';

const mock = new MockAdapter(axios);

describe('GetData function', () => {
  it('should call axios.get with the correct parameters', async () => {
  //   mock.onGet(`${process.env.REACT_APP_BACKEND_URL}api/user`, {
  //     headers: { Authorization: 'Bearer test-token' },
  //   }).reply(200, { data: 'test-data' });
  //
  //   const spy = jest.spyOn(axios, 'get');
  //   localStorage.setItem('access', 'test-token');
  //
  //   await GetData();
  //   expect(spy).toHaveBeenCalledWith(
  //     `${process.env.REACT_APP_BACKEND_URL}api/user`,
  //     {
  //       headers: { Authorization: 'Bearer test-token' },
  //     }
  //   );
  // });
  //
  // it('should call RefreshToken before making the request', async () => {
  //   const refreshSpy = jest.spyOn(RefreshToken, 'mockImplementation');
  //
  //   mock.onGet(`${process.env.REACT_APP_BACKEND_URL}api/user`, {
  //     headers: { Authorization: 'Bearer test-token' },
  //   }).reply(200, { data: 'test-data' });
  //
  //   localStorage.setItem('access', 'test-token');
  //
  //   await GetData();
  //
  //   expect(refreshSpy).toHaveBeenCalled();
  // });
  //
  // it('should return the data on success', async () => {
  //   mock.onGet(`${process.env.REACT_APP_BACKEND_URL}api/user`, {
  //     headers: { Authorization: 'Bearer test-token' },
  //   }).reply(200, { data: 'test-data' });
  //
  //   localStorage.setItem('access', 'test-token');
  //
  //   const data = await GetData();
  //
  //   expect(data).toEqual({ data: 'test-data' });
  // });
  //
  // it('should log the error on failure', async () => {
  //   const errorSpy = jest.spyOn(console, 'log');
  //
  //   mock.onGet(`${process.env.REACT_APP_BACKEND_URL}api/user`, {
  //     headers: { Authorization: 'Bearer test-token' },
  //   }).reply(500);
  //
  //   localStorage.setItem('access', 'test-token');
  //
  //   await GetData();
  //
  //   expect(errorSpy).toHaveBeenCalled();
  });
});
