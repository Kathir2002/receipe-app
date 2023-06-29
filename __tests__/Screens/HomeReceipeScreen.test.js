import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import HomeReceipeScreen from "../../src/Screens/Stack/HomeReceipeScreen";
import userContext from "../../src/Store/userContext";
import Carousel from "react-native-reanimated-carousel";
import Video from 'react-native-video';

jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn() }));
jest.mock('react-native-reanimated-carousel', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("@react-native-community/voice", () => ({
    start: jest.fn(),
    stop: jest.fn(),
    onSpeechResults: jest.fn(),
}))
const data1 = [{ id: 1, time: "30", image: "hello", name: "chicken", fav: false }]

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

jest.mock("react-native-video", () => 'Video')


test("Virlist Component", () => {
    const page = render(
        <userContext.Provider value={{ Data: data1 }} >
            <ThemeProvider theme={Theme}>
                <HomeReceipeScreen />
            </ThemeProvider>
        </userContext.Provider>
    )
    fireEvent.press(page.getByTestId("0render"))
})

