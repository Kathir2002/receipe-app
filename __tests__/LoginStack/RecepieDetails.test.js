import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import RecepieDetails from "../../src/Login Stack/RecepieDetails";

jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn() }));

jest.mock('react-native-youtube-iframe', () => ({
    __esModule: true,
    default: jest.fn(),
}));
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
        },
        useRoute: () => ({
            params: {
                item: {
                    name: "Chicken",
                    videoId: "123fads",
                    cusine: "india",
                    timeToEat: 40,
                    time: 40,
                    nutrientInfo: "good",
                    ingredients: [{ item: "hai", image: "hello", item: "good" }, { item: "how", image: "are", item: "youu" }, { item: "fine", image: "and", item: "good" },],
                    quantityForServe: 2,
                }
            }
        })
    }
});

test("Recipe Details component", () => {
    const page = render(
        <ThemeProvider theme={Theme}>
            <RecepieDetails />
        </ThemeProvider>
    )
    expect(page.getByTestId("name")).toBeDefined()
    expect(page.getByTestId("cusine")).toBeDefined()
    expect(page.getByTestId("timetoEat")).toBeDefined()
    expect(page.getByTestId("time")).toBeDefined()
})
test("Recipe  component", () => {
    const page = render(
        <ThemeProvider theme={Theme}>
            <RecepieDetails />
        </ThemeProvider>
    )
    fireEvent.press(page.getByTestId("backIcon"))

})