import { render, screen } from '@testing-library/react';
import { validateField, setVisible } from '../Components/Validation/validate';
import {BrowserRouter, Route, Routes} from "react-router-dom";


describe('validate', () => {
  describe('validateField', () => {
    it('sets error class when input does not match regex', () => {
      const regex = /^[a-zA-Z0-9]+$/;
      const field = 'testField';
      const value = 'abc$%^';
      const mockObj = {
        value,
      };
      document.getElementById = jest.fn(() => mockObj);

      validateField(field, regex);

      expect(document.getElementById).toHaveBeenCalledWith(field);
      expect(mockObj.className).toEqual('block text-red left-2 relative');
    });
  });

  describe('setVisible', () => {
    it('sets element to invisible when flag is false', () => {
      const elem = 'testElem';
      const mockObj = {
        className: '',
      };
      document.getElementById = jest.fn(() => mockObj);

      setVisible(elem, false);

      expect(document.getElementById).toHaveBeenCalledWith(elem);
      expect(mockObj.className).toEqual('invisible absolute top-0');
    });

    it('sets element to visible when flag is true', () => {
      const elem = 'testElem';
      const mockObj = {
        className: 'invisible absolute top-0',
      };
      document.getElementById = jest.fn(() => mockObj);

      setVisible(elem, true);

      expect(document.getElementById).toHaveBeenCalledWith(elem);
      expect(mockObj.className).toEqual('');
    });
  });
});
