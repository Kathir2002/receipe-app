import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default SignupStyles = {
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    remindTxt: { fontSize: 20, fontWeight: 700 },
    avatarContainer: { flexDirection: "row", alignItems: "flex-start", gap: 30, marginTop: 10 },
    inpView: { marginTop: 30 },
    txtFieldFlex: {
        alignItems: "center",
        width: 280,
        marginVertical: 15,
        flexDirection: "row",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10
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
        backgroundColor: "#28ed35",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "white"
    },
    switchContainer: {
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    loginText: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "blue",
        marginTop: 20,
    },
    empty: {
        padding: 20,
        backgroundColor: "#28ed35",
        height: 150,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    footerContainer: {
        marginTop: 10,
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
    inpStyle: {
        color: "black",
        width: 210,
        height: "100%"
    },
}