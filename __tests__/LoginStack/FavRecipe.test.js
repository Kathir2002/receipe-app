import React, { useState } from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import userContext from "../../src/Store/userContext";
import FavRecipe from "../../src/Login Stack/FavRecipe";

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

test("Fav recipies", () => {
    const page = render(
        <userContext.Provider value={{ fav: ["hai", "hello"] }}>
            <ThemeProvider theme={Theme}>
                <FavRecipe />
            </ThemeProvider>
        </userContext.Provider>
    )
    fireEvent.changeText(page.getByTestId("searchBar"), "hai")
})

test("fail fav recipies", () => {
    const page = render(
        <userContext.Provider value={{ fav: [] }}>
            <ThemeProvider theme={Theme}>
                <FavRecipe />
            </ThemeProvider>
        </userContext.Provider>
    )
})