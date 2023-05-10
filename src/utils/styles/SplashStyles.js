import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
export default SplashStyles = {
    splashTxt: { color: "white", position: "absolute", top: "80%" },
    splashImage: { flex: 1, alignItems: "center" }
}