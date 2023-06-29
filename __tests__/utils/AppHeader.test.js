import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import AppHeader from "../../src/utils/AppHeader";

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
            openDrawer: jest.fn()
        }),
        useIsFocused: () => {
            return true
        },
        isFocused: () => {
            return true
        }
    }
});

test("App header component", () => {
    const page = render(
        <ThemeProvider theme={Theme}>
            <AppHeader name={"Demo"} />
        </ThemeProvider>
    )
    expect(page.getByTestId("nameField")).toBeDefined()
    fireEvent.press(page.getByTestId("drawerIcon"))
})