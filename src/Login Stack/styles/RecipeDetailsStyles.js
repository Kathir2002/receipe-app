import { Dimensions, StyleSheet } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default RecipeDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    btnText: {
        color: "white",
        fontWeight: 700,
    },
    iconContainerStyle: {
        flexDirection:"row",
        width: width,
        height: 70,
        backgroundColor: "#3D6DCC",
        alignItems: "center",
        paddingLeft: 10,
        justifyContent:"flex-start",
        gap:30
    },
    txt: {
        fontSize:18,
        fontWeight:800,
        color:"white"
    },
    videoContainer: {
        marginTop: 10,
        height: 250,
    },
    scrollContainer: { marginTop: -28 },
    imageStyle: {
        height: "100%",
        width: "100%",
        resizeMode: "contain"
    },
    headTxtContainer: {
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: 'center',
        gap: 10
    },
    imageContainer: {
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        height: 100,
        width: 100
    },
    txtHeadStyle: {
        fontWeight: 900,
        fontSize: 20,
        color: "white"
    },
    txtBodyStyle: {
        padding: 10,
        paddingBottom: 0,
        color: "white",
        fontSize: 15,
        fontWeight: 700
    },
    txtSecondBodyStyle: {
        padding: 10,
        paddingBottom: 0,
        color: "#737575",
        fontSize: 15,
        fontWeight: 700
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    headerContainerStyle: {
        backgroundColor: "#1c1c1c",
        height: 180,
        justifyContent: "center"
    },
    nutrientText: {
        padding: 10,
        paddingBottom: 0,
        color: "black",
        fontSize: 18,
        fontWeight: 700
    },
    mainTxt: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        marginHorizontal: "30%",
        width: 160,
        borderRadius: 50,
        height: 30,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "pink",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    mapContainer: {
        marginHorizontal: width / 16,
        width:140,
        height:140,
    },
    viewTxt: {
        color: "black",
        fontSize: 15,
        fontWeight: 700
    },
    flatContainer: {
        marginVertical:20
    }
})