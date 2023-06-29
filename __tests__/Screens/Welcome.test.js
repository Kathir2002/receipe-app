import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '../../src/Screens/Stack/Welcome';
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
})

test("Welcome Component", () => {
    const page = render(
        <ThemeProvider theme={Theme}>
            <WelcomeScreen />
        </ThemeProvider>
    )
    expect(page.getByTestId("bgImage")).toBeDefined()
    fireEvent.press(page.getByTestId("startButton"))
})