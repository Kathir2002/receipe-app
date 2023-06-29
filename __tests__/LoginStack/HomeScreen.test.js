import React, { useState } from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import HomeReceipeScreen from "../../src/Login Stack/HomeScreen";
import Carousel from "react-native-reanimated-carousel";

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

jest.mock('react-native-reanimated-carousel', () => ({
    __esModule: true,
    default: jest.fn(),
}));

test("Home Recipe Screen", () => {
    const page = render(
        <ThemeProvider theme={Theme}>
            <HomeReceipeScreen />
        </ThemeProvider>
    )

    fireEvent.changeText(page.getByTestId("searchBar"), "chicken")
    fireEvent.press(page.getByTestId("exploreText"))
    fireEvent.press(page.getByTestId("categories"))
})