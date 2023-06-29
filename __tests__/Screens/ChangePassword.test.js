import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import ChangePassword from "../../src/Screens/Stack/ChangePassword";
import axios from "axios";

jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn() }));

jest.mock("@react-native-community/voice", () => ({
    start: jest.fn(),
    stop: jest.fn(),
    onSpeechResults: jest.fn(),
}))

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

test("Change Password component", async () => {
    const page = render(
        <ThemeProvider theme={Theme} >
            <ChangePassword />
        </ThemeProvider>
    )
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
        data: "567898"
    })

    fireEvent.press(page.getByTestId("goBackIcon"))
    fireEvent.changeText(page.getByTestId("emailField"), "kathir@gmail.com")
    fireEvent.press(page.getByTestId("verify"))
    await waitFor(() => {

        fireEvent.press(page.getByTestId("submit"))
    })

    fireEvent.changeText(page.getByTestId("passwordField"), "kat")
    fireEvent.press(page.getByTestId("eyeIcon"))
    fireEvent.press(page.getByTestId("eyeIcon"))
    fireEvent.press(page.getByTestId("changePassword"))
})