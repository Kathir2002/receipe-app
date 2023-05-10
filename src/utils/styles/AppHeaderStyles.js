import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default AppHeaderStyles = {
    container: {
        backgroundColor: "#3D6DCC",
        height: 60,
        width: width,
        top: 0,
        padding: 0,
    },
    innerView: {
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 8
    },
    txt: {
        color: "white",
    },
    iconStyle: { position: "absolute", right: 20 },
}