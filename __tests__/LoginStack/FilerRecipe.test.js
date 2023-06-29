import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import userContext from "../../src/Store/userContext";
import FilterRecipe from "../../src/Login Stack/FilerRecipe";

jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn() }));

jest.mock("@react-native-community/voice", () => ({
    start: jest.fn(),
    stop: jest.fn(),
    onSpeechResults: jest.fn(),
}))

jest.mock('react-native-image-picker', () => ({
    launchCamera: jest.fn()
}));

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

test("filter recipes", () => {
    const page = render(
        <userContext.Provider value={{ Data: [{ image: "hai", name: "hello", time: 30 }] }}>
            <ThemeProvider theme={Theme}>
                <FilterRecipe />
            </ThemeProvider>
        </userContext.Provider>
    )

    fireEvent.changeText(page.getByTestId("searchBar"))
})