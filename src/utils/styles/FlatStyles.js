import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default FlatStyles = {
    cardContainer: {
        flex: 1,
        elevation: 5,
        borderColor: "#dbd9d9",
        alignItems: "center",
        height: 180,
        width: 150,
        borderRadius: 15,
    },
    cardImageStyle: {
        resizeMode: "cover",
        height: 100,
        width: 125,
    },
    cardTextStyle: {
        color: "black",
        fontSize: 12,
        textAlign: "center"
    },
    slider: {
        width: 300,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ECECEC',
        borderWidth: 3,
        borderColor: '#007AFF',
    },
}