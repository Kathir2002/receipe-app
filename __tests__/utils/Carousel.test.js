import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import Carosel from "../../src/utils/Carosel";
import Carousel from "react-native-reanimated-carousel";

jest.mock('react-native-reanimated-carousel', () => ({
    default: jest.fn(),

}));

jest.mock('react-native-reanimated-carousel', () => jest.fn().mockReturnValue(null));



it("Carousel Component", () => {
    const page = render(
        <ThemeProvider theme={Theme}>
            <Carosel />
        </ThemeProvider>
    )
})
