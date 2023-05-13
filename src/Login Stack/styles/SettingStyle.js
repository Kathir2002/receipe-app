import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height


export default SettingStyles = {
    container: {
        width: width,
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
    },
    bgImageStyle: {
        height: height / 2,
        width: "100%",
        zIndex: -1,
    },
    txtContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        marginVertical: 15,
        flexDirection: "row",
    },
    inpStyle: {
        height: "100%",
        width: "90%",
        paddingHorizontal: 10,
        color: "black",
    },
    txtIconContainer: {
        borderColor: "black",
        borderWidth: 1,
        alignItems: "center",
        height: 40,
        width: 200,
        borderRadius: 10,
        justifyContent: "center",
        flexDirection: "row",
    },
    txtHeadStyle: {
        fontSize: 20,
        fontWeight: 700,
        color: "white",
    },
    imgBgContainer: {
        alignItems: "center",
        marginTop: 80
    },
    overlay: {
        width: "70%",
        height: "30%"
    },
    mainContainer: {
        resizeMode: "contain",
        position: "absolute",
        top: "50%",
        height: height / 2,
        width: width,
        alignItems: "center",
    },
    smallButtonContainer: {
        marginTop: 10,
        width: 140,
        borderRadius: 50,
        height: 60,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "pink",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    conditionView: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        marginTop: 10,
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
        color: "white"
    },
}