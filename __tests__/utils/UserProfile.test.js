import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import UserProfile from "../../src/utils/UserProfile";
import userContext from "../../src/Store/userContext";

jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn() }));

jest.mock("@react-native-community/voice", () => ({
    start: jest.fn(),
    stop: jest.fn(),
    onSpeechResults: jest.fn(),
}))

jest.mock('react-native-image-picker', () => ({
    launchCamera: jest.fn(),
    launchImageLibrary: jest.fn(),
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

test("user profile component", () => {
    const page = render(
        <userContext.Provider value={{ setUserPhoto: () => jest.fn(), userKey: "fasfhkjashfiue" }}>
            <ThemeProvider theme={Theme}>
                <UserProfile setVisible={() => jest.fn()} />
            </ThemeProvider>
        </userContext.Provider>
    )
    fireEvent.press(page.getByTestId("cameraBtn"))
    fireEvent.press(page.getByTestId("galleryBtn"))
    fireEvent.press(page.getByTestId("closeBtn"))
})