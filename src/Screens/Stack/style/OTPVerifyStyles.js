import { Dimensions } from "react-native"
const width = Dimensions.get("window").width

export default OTPVerifyStyles = {
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15 },
    otpTXT: { backgroundColor: '#fff', borderColor: "black", borderWidth: 1, borderRadius: 10, color: "black" },
    otpContainer: { height: 40, width: width / 1.4, gap: 20, marginHorizontal: "10%" },
    buttonContainer: {
        width: 100,
        borderRadius: 50,
        height: 40,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#3D6DCC",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    splashTxt: { color: "black", position: "absolute", top: "80%" },
    splashImage: { alignItems: "center", height: 300, width: 300, marginTop: 250, marginLeft: 50 },
    splashContainer: { flex: 1, backgroundColor: "#FFF0F5", alignItems: "center", justifyContent: "center" }
}