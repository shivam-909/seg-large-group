import React from 'react';

import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Location } from '../Component/ProfilePage/Location';
import Loading from '../Component/Loading/Loading';

describe('Location', () => {
  const defaultLocation = 'London, UK';
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders PlacesAutocomplete with default props', () => {
    const wrapper = mount(<Location defaultLocation={defaultLocation} />);
    expect(wrapper.find(PlacesAutocomplete)).toHaveLength(1);
    expect(wrapper.find('input#locationInput')).toHaveLength(1);
    expect(wrapper.find('.autocomplete-dropdown-container')).toHaveLength(1);
    expect(wrapper.find(Loading)).toHaveLength(0);
  });

  it('sets the initial state with default location', () => {
    const wrapper = mount(<Location defaultLocation={defaultLocation} />);
    expect(wrapper.state('address')).toBe(defaultLocation);
  });

  it('updates the state when input value changes', () => {
    const wrapper = mount(<Location defaultLocation={defaultLocation} onChange={onChange} />);
    const input = wrapper.find('input#locationInput');
    input.simulate('change', { target: { value: 'Manchester' } });
    expect(wrapper.state('address')).toBe('Manchester');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('updates the state when suggestion is selected', () => {
    const wrapper = mount(<Location defaultLocation={defaultLocation} />);
    const suggestion = { description: 'Manchester, UK' };
    act(() => {
      wrapper.find(PlacesAutocomplete).prop('onSelect')(suggestion.description);
    });
    expect(wrapper.state('address')).toBe(suggestion.description);
  });

  it('renders loading indicator while suggestions are loading', () => {
    const wrapper = mount(<Location defaultLocation={defaultLocation} />);
    const loading = true;
    const suggestions = [];
    act(() => {
      wrapper.find(PlacesAutocomplete).prop('children')({
        getInputProps: () => ({}),
        suggestions,
        getSuggestionItemProps: () => ({}),
        loading,
      });
    });
    wrapper.update();
    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  it('renders suggestion items when suggestions are available', () => {
    const wrapper = mount(<Location defaultLocation={defaultLocation} />);
    const suggestion = { description: 'Manchester, UK' };
    const suggestions = [suggestion];
    act(() => {
      wrapper.find(PlacesAutocomplete).prop('children')({
        getInputProps: () => ({}),
        suggestions,
        getSuggestionItemProps: () => ({}),
        loading: false,
      });
    });
    wrapper.update();
    expect(wrapper.find('.autocomplete-dropdown-container div')).toHaveLength(1);
    expect(wrapper.find('.autocomplete-dropdown-container div').text()).toBe(suggestion.description);
  });

  it('disables input field when disabled prop is true', () => {
    const wrapper = mount(<Location defaultLocation={defaultLocation} disabled={true} />);
    expect(wrapper.find('input#locationInput').prop('disabled')).toBe(true);
  });
});
