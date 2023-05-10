import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default DrawerStyles = {
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        paddingVertical: 20,
        backgroundColor: '#EDEADE		',
    },
    drawerTxt: {
        fontSize: 18,
        padding: 10,
        color: "black"
    },
    img: {
        marginBottom: 20
    },
    drawerElement: {
        width: "90%",
        borderBottomColor: "black",
        borderBottomWidth: .51
    }
}