import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginReq from '../../src/Screens/Stack/LoginReq';
import { ThemeProvider } from 'react-native-elements';
import Theme from '../../src/Theme';

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
            goBack: jest.fn(),
        }),
        useIsFocused: () => {
            return true
        },
        isFocused: () => {
            return true
        }
    }
});


describe('LoginReq component', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(
            <ThemeProvider theme={Theme}><LoginReq /></ThemeProvider>);

        expect(getByTestId('container')).toBeDefined();
        expect(getByTestId('backgroundImage')).toBeDefined();
        expect(getByTestId('header')).toBeDefined();
        expect(getByTestId('mainContainer')).toBeDefined();
        expect(getByTestId('txtStyle')).toBeDefined();
        expect(getByTestId('paddingTxt')).toBeDefined();
        expect(getByTestId('txt1')).toBeDefined();
        expect(getByTestId('txt2')).toBeDefined();
        expect(getByTestId('gifStyle')).toBeDefined();
        expect(getByTestId('gifImage')).toBeDefined();
        expect(getByTestId('btnMainContainer')).toBeDefined();
        expect(getByTestId('registerBtn')).toBeDefined();
        expect(getByTestId('loginBtn')).toBeDefined();
    });

    it('calls when button is pressed', () => {
        const page = render(<ThemeProvider theme={Theme}><LoginReq /></ThemeProvider>);
        fireEvent.press(page.getByTestId('backIcon'));
        fireEvent.press(page.getByTestId('loginBtn'));
        fireEvent.press(page.getByTestId('registerBtn'));
    });





});
