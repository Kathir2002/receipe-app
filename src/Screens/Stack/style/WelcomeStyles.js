import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default WelcomeStyles = {
    textStyle: {
        color: "white",
    },
    imgContainer: {
        height: "100%", alignItems: "center",
    },
    viewStyle: {
        paddingHorizontal: 10,
        flexDirection: "column",
        alignItems: "center",
        marginVertical: 170
    },
    buttonContainer: {
        width: "60%",
        borderRadius: 50,
        height: 80,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#eb4034",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 200
    },
    btnText: {
        color: "white"
    },
    iconContainer: {
        backgroundColor: "white",
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    }
}