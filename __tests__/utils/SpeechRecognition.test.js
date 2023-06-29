import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import SpeechRecognition from "../../src/utils/SpeechRecognition";

jest.mock("@react-native-community/voice", () => ({
    start: jest.fn(),
    stop: jest.fn(),
    onSpeechResults: jest.fn(),
}))

it("Speech recognition component", () => {
    const page = render(
        <ThemeProvider theme={Theme}>
            <SpeechRecognition setContent={() => { }} />
        </ThemeProvider>
    )

    fireEvent.press(page.getByTestId("voiceIcon"))
    fireEvent.press(page.getByTestId("voiceIcon"), { result: { value: ["hai", "hello"] } })
})