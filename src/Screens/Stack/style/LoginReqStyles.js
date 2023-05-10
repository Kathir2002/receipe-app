import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default LoginReqStyles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImageStyle: {
        height: 400,
        resizeMode: "cover",
        width: "100%",
        opacity: .8,
    },
    gifImgStyle: { height: 125, width: 150 },
    paddingTxt: { padding: 15, },
    mainContainer: { marginLeft: 20 },
    txtStyle: {
        color: "white",
        fontSize:18,
        fontWeight:700
    },
    headerStyle: {
        padding: 15 , 
        height:"100%",
        backgroundColor:"rgba(0,0,0, 0.60)",
        padding: 10,
        flexDirection: "row",
    },
    btnContainer: {
        width: "30%",
        borderRadius: 50,
        height: 60,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#28ed35",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    btnMainContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    txt: {
        fontSize: 20,
        fontWeight: 700
    },
    gifStyle: {
        marginLeft: width / 2.7
    }
}