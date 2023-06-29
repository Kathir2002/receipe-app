import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import FlatCardList from "../../src/utils/Flat";

const data = [{ _id: 1, time: "30", image: "hello", name: "chicken", fav: false }]

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

test("Flat card list component", () => {
    const page = render(
        <ThemeProvider theme={Theme}>
            <FlatCardList data={data} navigateTo={"LoginReq"} search={"chicken"} />
        </ThemeProvider>
    )
    fireEvent.press(page.getByTestId("chickenarrow"))
})