import React, { useState } from "react";
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import userContext from "../../src/Store/userContext";
import Settings from "../../src/Login Stack/Settings";
import axios from "axios";

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

test("Settings component", async () => {

    jest.spyOn(axios, 'post').mockResolvedValueOnce({
        data: {
            User: {
                name: "Kathir ",
                email: "kathirmthvn@gmail.com",
                password: "$2a$10$qfeZZdE3elp9KFXgpNvxgeplkRJ8ywCApnV0YhecykzdYR3iOkajm",
                phoneNumber: "9080574409",
                userImage: "/9j/4AAQSkZJRgABAQAA"
            }
        }
    })
    const page = render(
        <userContext.Provider value={{ userPhoto: "photo", setUserPhoto: () => { }, setIsAuth: () => { }, userKey: "hsfakjh" }}>
            <ThemeProvider theme={Theme}>
                <Settings />
            </ThemeProvider>
        </userContext.Provider>
    )
    const overlayOpen = getByTestId('overlayOpen');
    await waitFor(() => {
        fireEvent.press(page.getByTestId("edit1Icon"))


    })
    fireEvent.changeText(page.getByTestId("game"), 'kaligmail')
    fireEvent.press(page.getByTestId("edit2Icon"))
    fireEvent.changeText(page.getByTestId("mobileField"), '9080574409')
    fireEvent.press(page.getByTestId("submitBtn"))
    fireEvent.press(page.getByTestId("avatar"))
    fireEvent(overlayOpen, 'backdropPress');
    fireEvent.press(page.getByTestId("logoutBtn"))


})



test("Settings component", async () => {

    jest.spyOn(axios, 'post').mockResolvedValueOnce({
        data: {
            User: {
                name: "Kathir ",
                email: "kathirmthvn@gmail.com",
                password: "$2a$10$qfeZZdE3elp9KFXgpNvxgeplkRJ8ywCApnV0YhecykzdYR3iOkajm",
                phoneNumber: "9080574409",
                userImage: "/9j/4AAQSkZJRgABAQAA"
            }
        }
    })
    const page = render(
        <userContext.Provider value={{ userPhoto: "photo", setUserPhoto: () => { }, setIsAuth: () => { }, userKey: "hfdsdkjaf" }}>
            <ThemeProvider theme={Theme}>
                <Settings />
            </ThemeProvider>
        </userContext.Provider>
    )

    await waitFor(() => {
        fireEvent.press(page.getByTestId("edit1Icon"))


    })
    fireEvent.changeText(page.getByTestId("game"), 'kaligmail')
    fireEvent.press(page.getByTestId("edit2Icon"))
    fireEvent.changeText(page.getByTestId("mobileField"), '9080574409')
    fireEvent.press(page.getByTestId("overlayOpen"))
    fireEvent(page.getByTestId('overlayOpen'), 'onBackDropPress')


})