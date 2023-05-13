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
                <View style={theme.LoginReqStyles.container}>
                    <ImageBackground style={theme.LoginReqStyles.backgroundImageStyle} source={require("../../assets/login-req.jpg")} >
                        <View style={theme.LoginReqStyles.headerStyle}>
                            <Icon name='arrow-left' size={30} color="white" onPress={() => navigation.goBack()} />
                            <View style={theme.LoginReqStyles.mainContainer}>
                                <Text style={theme.LoginReqStyles.txtStyle} h5>Login/signup to unlock more features!</Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={theme.LoginReqStyles.paddingTxt}>
                        <Text style={theme.LoginReqStyles.txt}>If you want to read more recipes,</Text>
                        <Text style={theme.LoginReqStyles.txt}>you need to login or register to your account</Text>
                    </View>
                    <View style={theme.LoginReqStyles.gifStyle}>
                        <Image source={require("../../assets/lets-go.gif")} style={theme.LoginReqStyles.gifImgStyle} />
                    </View>
                    <View style={theme.LoginReqStyles.btnMainContainer}>
                        <TouchableOpacity style={theme.LoginReqStyles.btnContainer} onPress={() => navigation.navigate("Signup")}>
                            <Text style={theme.LoginReqStyles.btnColor}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={theme.LoginReqStyles.btnContainer} onPress={() => navigation.navigate("Signin")}>
                            <Text style={theme.LoginReqStyles.btnColor}> Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ThemeConsumer>
    )
}

export default LoginReq
