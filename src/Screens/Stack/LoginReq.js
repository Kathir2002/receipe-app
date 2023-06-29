import React from 'react'
import { View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Text, ThemeConsumer } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'

const LoginReq = () => {
    const navigation = useNavigation()
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <View testID='container' style={theme.LoginReqStyles.container}>
                    <ImageBackground testID='backgroundImage' style={theme.LoginReqStyles.backgroundImageStyle} source={require("../../assets/login-req.jpg")} >
                        <View testID='header' style={theme.LoginReqStyles.headerStyle}>
                            <Icon testID='backIcon' name='arrow-left' size={30} color="white" onPress={() => navigation.goBack()} />
                            <View testID='mainContainer' style={theme.LoginReqStyles.mainContainer}>
                                <Text testID='txtStyle' style={theme.LoginReqStyles.txtStyle} h5>Login/signup to unlock more features!</Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View testID='paddingTxt' style={theme.LoginReqStyles.paddingTxt}>
                        <Text testID='txt1' style={theme.LoginReqStyles.txt}>If you want to read more recipes,</Text>
                        <Text testID='txt2' style={theme.LoginReqStyles.txt}>you need to login or register to your account</Text>
                    </View>
                    <View testID='gifStyle' style={theme.LoginReqStyles.gifStyle}>
                        <Image testID='gifImage' source={require("../../assets/lets-go.gif")} style={theme.LoginReqStyles.gifImgStyle} />
                    </View>
                    <View testID='btnMainContainer' style={theme.LoginReqStyles.btnMainContainer}>
                        <TouchableOpacity testID='registerBtn' style={theme.LoginReqStyles.btnContainer} onPress={() => navigation.navigate("Signup")}>
                            <Text style={theme.LoginReqStyles.btnColor}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity testID='loginBtn' style={theme.LoginReqStyles.btnContainer} onPress={() => navigation.navigate("Signin")}>
                            <Text style={theme.LoginReqStyles.btnColor}> Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ThemeConsumer>
    )
}

export default LoginReq
