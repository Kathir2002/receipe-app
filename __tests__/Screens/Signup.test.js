import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import Signup from '../../src/Screens/Stack/Signup';

jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn() }));

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
jest.mock('@react-native-async-storage/async-storage');

it("signup component runs", () => {
    const page = render(
        <ThemeProvider theme={Theme} >
            <Signup />
        </ThemeProvider>
    )

    fireEvent.changeText(page.getByTestId('nameField'), "pkjhkhkhpan");
    fireEvent.changeText(page.getByTestId('emailField'), "kathir@gamail.com");
    fireEvent.press(page.getByTestId("eyeIcon"))
    fireEvent.changeText(page.getByTestId('passwordField'), "1234556678");
    fireEvent.changeText(page.getByTestId('phoneNoField'), "9080574409");

    fireEvent.press(page.getByTestId("checkBox"))
    fireEvent.press(page.getByTestId("submitBtn"))
    fireEvent.press(page.getByTestId("backIcon"))
})

it("should show error messages", () => {
    const page = render(
        <ThemeProvider theme={Theme}>
            <Signup />
        </ThemeProvider>
    )
    fireEvent.changeText(page.getByTestId('passwordField'), "12");
    fireEvent.changeText(page.getByTestId('emailField'), "11");
    fireEvent.changeText(page.getByTestId('nameField'), "kali");
    fireEvent.changeText(page.getByTestId('phoneNoField'), "909");

    fireEvent.press(page.getByTestId("submitBtn"))
    fireEvent.press(page.getByTestId("signinBtn"))
})
// })