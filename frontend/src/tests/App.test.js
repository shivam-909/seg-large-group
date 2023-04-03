import React from 'react';
import { shallow, mount } from 'enzyme';
import Routes from '../App';
import { Route } from 'react-router-dom';

let pathMap = {};
describe('routes', () => {
    beforeAll(() => {
        const component = shallow(<Routes/>);
        pathMap = component.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});
        console.log(pathMap)
    });
    it('should show searchPage for / router', () => {
        expect(pathMap['/']).toBe(SearchPage);
    });
});
