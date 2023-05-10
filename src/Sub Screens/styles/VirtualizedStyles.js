import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default VirtalizedStyles = {
    cardContainer: {
        height: 225,
        width: 200, elevation: 5,
        borderColor: "#dbd9d9",
        alignItems: "center",
        alignse: "center",
        borderRadius: 15,
    },
    cardImageStyle: {
        resizeMode: "cover",
        height: 135,
        width: 180,
    },
    cardTextStyle: {
        color: "black"
    }
}