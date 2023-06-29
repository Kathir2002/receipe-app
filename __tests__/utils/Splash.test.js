import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import Splash from "../../src/utils/Splash"

test("Splash component", () => {
    const page = render(
        <ThemeProvider theme={Theme} >
            <Splash />
        </ThemeProvider>
    )

    expect(page.getByTestId("heading")).toBeTruthy()
})