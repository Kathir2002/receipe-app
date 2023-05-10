import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default HomeRecipeStyles = {
    searchItem: { backgroundColor: "white", borderWidth: 1, borderColor: "black", width: 330 },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    recentView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    recentTextView: {
        flexDirection: "row",
        alignItems: "center"
    },
    caroselContainer: {
        marginVertical: 10
    },
    videoContainer: {
        marginVertical: "10%",
        height: 300
    }
}