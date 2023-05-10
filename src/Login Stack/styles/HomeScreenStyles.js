import { Dimensions } from "react-native"
const width = Dimensions.get("window").width

export default HomeScreenStyles = {
    container: {
        width: width,
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    searchContainerStyle: {
        backgroundColor: "transparent", borderBottomColor: "transparent"
    },
    searchContainer: {
        height: 67,
        flexDirection: "row",
        alignItems: "center"
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    recentTxt: { fontSize: 18, fontWeight: 700 },
    recentView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 30
    },
    recentTextView: {
        flexDirection: "row",
        alignItems: "center"
    },
    videoStyle: { width: "100%", height: "100%" },
    caroselContainer: {
        marginTop: 30
    },
    exploreTxt: {
        fontSize: 16, fontWeight: 600, color: "#e88a0e"
    },
    videoContainer: {
        marginVertical: "10%",
        height: 275
    },
    searchInpStyle: { backgroundColor: "white", borderWidth: 1, borderBottomColor: 1, borderColor: "black", width: 330 },
    heartContainer: {alignItems:"center", marginVertical:"50%"},
    heartImg: {height: 200, width: 200 },
    heartTxt:{color:"red"},
}