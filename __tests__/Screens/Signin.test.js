import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Signin from '../../src/Screens/Stack/Signin';
import { ThemeProvider } from 'react-native-elements';
import Theme from '../../src/Theme';
import CheckboxExample from '../../src/utils/CheckedBox';
import { ToastAndroid } from 'react-native';

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

jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn() }));
jest.mock('@react-native-async-storage/async-storage');


describe('Signin component', () => {
    it('should render the Signin component', () => {
        const page = render(
            <ThemeProvider theme={Theme} >
                <Signin />
            </ThemeProvider>
        );
        fireEvent.press(page.getByTestId("icon"))
        fireEvent.press(page.getByTestId("icon"))
    });

    it('should show error messages', async () => {
        const page = render(
            <ThemeProvider theme={Theme} >
                <Signin />
            </ThemeProvider>
        );
        fireEvent.press(page.getByTestId("backIcon"))
        fireEvent.press(page.getByTestId("changePass"))
        fireEvent.press(page.getByTestId('signinBtn'));
        fireEvent.changeText(page.getByTestId('emailField'), "kathir");
        fireEvent.changeText(page.getByTestId('passwordField'), "k@gmail");
        fireEvent.press(page.getByTestId('signinBtn'));
    });

    it('should navigate to the home screen on successful signin', async () => {
        const page = render(
            <ThemeProvider theme={Theme} >
                <Signin />
            </ThemeProvider>
        );

        fireEvent.changeText(page.getByPlaceholderText('Email'), 'kathirmathavan17@gmail.com');
        fireEvent.changeText(page.getByPlaceholderText('Password'), 'mathavan');
        fireEvent.press(page.getByTestId("checkBox"))
        fireEvent.press(page.getByTestId('signinBtn'));
        fireEvent.press(page.getByTestId("registerBtn"))
    });
});

