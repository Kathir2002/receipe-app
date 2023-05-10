import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default CategoriesStyles = {
    container: { flex: 1, paddingHorizontal: 10 },
    searchInpStyle: { backgroundColor: "white", borderWidth: 1, borderBottomWidth: 1, borderColor: "black", width: 330 },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 67,
    },
    listContainer: { padding: 5, justifyContent: "center", alignItems: "center", },
    avatarContainer: { borderWidth: 5, alignSelf: "center", }
}