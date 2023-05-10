import { Dimensions } from "react-native"
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default caroselStyles = {
    caroselStyle: { justifyContent: 'center', alignItems: "center", width: "100%", height: 200, },
    caroselImgStyle: { height: 300, width: 350, marginLeft: -20, resizeMode: "contain", borderRadius: 10 }
}