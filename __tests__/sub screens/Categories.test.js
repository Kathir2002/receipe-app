import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from "react-native-elements";
import Theme from "../../src/Theme";
import Categories from "../../src/Sub Screens/Categories"
import userContext from "../../src/Store/userContext";

jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn() }));

jest.mock("@react-native-community/voice", () => ({
    start: jest.fn(),
    stop: jest.fn(),
    onSpeechResults: jest.fn(),
}))
const data1 = [{ _id: 1, time: "30", image: "hello", name: "chicken", fav: false }]

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
})

const data = [
    {
        id: 1, cusine: "All Cusines", image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg", isSelected: true
    },
    {
        id: 2, cusine: "South Indian", image: "https://cdn.5280.com/2020/10/Thali-platter_Bawarchi-Biryani-Point-Denver-Facebook.jpg", isSelected: false
    },
    {
        id: 3, cusine: "North Indian", image: "https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/chitra-sendhil1453210035569e39b33b9db.jpeg", isSelected: false
    },
    {
        id: 4, cusine: "Thai", image: "https://www.foodandwine.com/thmb/r8fdcpapm4PFEzokDlMePDBmnwM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Why-Do-All-Thai-Restaurants-Feel-The-Same-FT-BLOG0123-c5531ddd6a8d4bb889956920d0c09be9.jpg", isSelected: false
    },
    {
        id: 5, cusine: "Chinese", image: "https://s3-ap-southeast-1.amazonaws.com/assets.limetray.com/assets/user_images/content_images/original/Honey%20chilli%20potato-new-op.webp", isSelected: false
    },
    {
        id: 6, cusine: "Italian", image: "https://c.ndtvimg.com/2021-04/umk8i7ko_pasta_625x300_01_April_21.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886", isSelected: false
    },
    {
        id: 7, cusine: "American", image: "https://www.thespruceeats.com/thmb/gwtKeNKbXW9zyHvymWGU6DjDEus=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-ultimate-cheeseburger-530744755-589cfb5b3df78c475878c4da.jpg", isSelected: false
    },
    {
        id: 8, cusine: "Japanese", image: "https://cdn.media.amplience.net/i/japancentre/Blog-page-156-sushi/Blog-page-156-sushi?$poi$&w=556&h=391&sm=c&fmt=auto", isSelected: false
    },
]

test("Categories component", () => {
    const page = render(
        <userContext.Provider value={{ Data: data1 }}>
            <ThemeProvider theme={Theme} >
                <Categories cusineData={data} />
            </ThemeProvider>
        </userContext.Provider >
    )
    fireEvent.changeText(page.getByTestId("searchBar"), "chicken")
    fireEvent.press(page.getByTestId("2name"))
})

test("Category component", () => {
    const page = render(
        <userContext.Provider value={{ Data: data1 }}>
            <ThemeProvider theme={Theme} >
                <Categories cusineData={data} />
            </ThemeProvider>
        </userContext.Provider >
    )
    fireEvent.changeText(page.getByTestId("searchBar"), "chicken")
    fireEvent.press(page.getByTestId("1name"))
})