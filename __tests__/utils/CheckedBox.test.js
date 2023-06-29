import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import CheckboxExample from "../../src/utils/CheckedBox";
import { fireEvent, render } from "@testing-library/react-native";

test("Check box", () => {
    const page = render(
        <ThemeProvider theme={Theme}>
            <CheckboxExample isSelected={true} setSelection={() => jest.fn()} />
        </ThemeProvider>
    )
    fireEvent.press(page.getByTestId("checkBox"))
})