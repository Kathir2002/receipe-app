import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import VirList from "../../src/Sub Screens/VirtualisedList";
import userContext from "../../src/Store/userContext";

const data = [{ _id: 1, time: "30", image: "hello", name: "chicken", fav: false }]
const data1 = [{ _id: 1, time: "30", image: "hello", name: "chicken", fav: [{ _id: 1, time: "30", image: "hello", name: "chicken" }] }]

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

it("Virlist component", () => {
    const page = render(
        <userContext.Provider value={{ isAuth: true, setData: () => { }, Data: data, fav: {}, setFav: () => { } }}>
            <ThemeProvider theme={Theme}>
                <VirList search={"chicken"} navigateTo={"LoginReq"} bool={false} />
            </ThemeProvider>
        </userContext.Provider>
    )
    fireEvent.press(page.getByTestId("chickenarrow"))
    fireEvent.press(page.getByTestId("chickenheart"))
})

it("Virlist true component", () => {
    const page = render(
        <userContext.Provider value={{ isAuth: true, setData: () => { }, Data: data1, fav: [{ _id: 1, time: "30", image: "hello", name: "chicken" }], setFav: () => { } }}>
            <ThemeProvider theme={Theme}>
                <VirList search={"chicken"} navigateTo={"LoginReq"} bool={false} />
            </ThemeProvider>
        </userContext.Provider>
    )
    fireEvent.press(page.getByTestId("chickenarrow"))
    fireEvent.press(page.getByTestId("chickenheart"))
})