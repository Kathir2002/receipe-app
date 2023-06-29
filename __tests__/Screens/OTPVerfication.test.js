import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import OTPVerfication from "../../src/Screens/Stack/OTPVerfication";
import userContext from "../../src/Store/userContext";
import { ToastAndroid } from "react-native";
jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn() }));
jest.mock('@react-native-async-storage/async-storage');

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
            goBack: jest.fn(),
        }),
        useRoute: () => ({
            params: {
                otp: "123456", values: {
                    uName: "kathir",
                    password: "mathavan",
                    email: "kathir@gmail.com",
                    phoneNumber: "9080574409"
                },
                isSelected: true
            }
        }),
        useIsFocused: () => {
            return true
        },
        isFocused: () => {
            return true
        }
    }
});

test("OTP component", () => {
    const page = render(
        <userContext.Provider value={{ setIsAuthsAuth: () => { } }} >
            <ThemeProvider theme={Theme}>
                <OTPVerfication />
            </ThemeProvider>
        </userContext.Provider>
    )
    expect(page.getByTestId("emailTxt")).toBeDefined()
    expect(page.getByTestId("time")).toBeDefined()
    expect(page.getByTestId("otpField")).toBeDefined()

    fireEvent.press(page.getByTestId("otpHandlerBtn"))
    fireEvent.press(page.getByTestId("backIcon"))
})


