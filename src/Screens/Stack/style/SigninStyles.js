import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default SigninStyles = {
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    txtFieldFlex: {
        alignItems: "center",
        width: 300,
        marginVertical: 15,
        flexDirection: "row",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10

    },
    remindTxt: {
        margin: 0,
        color: "black"
    },
    errorText: {
        color: "red",
        position: "absolute",
        bottom: -20
    },
    buttonContainer: {
        width: 140,
        borderRadius: 50,
        height: 60,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#3D6DCC",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "white",
    },
    inpStyle: {
        color: "black",
        width: 230,
        height: "100%",
    },
    switchContainer: {
        marginVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    loginText: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "blue",
        marginTop: 20
    },
    empty: {
        padding: 20,
        backgroundColor: "#3D6DCC",
        height: 150,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    footerContainer: {
        marginTop: 70,
        alignItems: "center"
    },
    inpStart: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderTopColor: "white",
        borderTopWidth: 2,
        alignItems: "center",
        width: "98%",
        backgroundColor: "white",
        position: "absolute",
        top: 120
    },
    forgetTxt: { fontSize: 18, fontWeight: 600, color: "white" },
}