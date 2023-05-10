import React, { useState, useContext } from 'react'
import { StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native'
import { Text, ThemeConsumer } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import BiometricID from 'react-native-biometric-id';
import userContext from '../../Store/userContext'

const WelcomeScreen = () => {
    const navigation = useNavigation()
    const { setIsFinger, setIsAuth } = useContext(userContext)
    const [authMessage, setAuthMessage] = useState('Authenticate to access your account');

    const onPressHandler = () => {
        BiometricID.authenticate(authMessage)
            .then(() => {
                setAuthMessage('Authentication successful');
                setIsFinger(false)
                setIsAuth(true)
            })
            .catch((error) => {
                console.log(`Authentication error: ${error}`);
                setAuthMessage(`Authentication error: ${error}`);
            });
    };
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <ImageBackground style={theme.WelcomeStyles.imgContainer} resizeMode="cover" source={require("../../assets/home-bg-image.jpeg")}>
                    <View style={theme.WelcomeStyles.viewStyle}>
                        <Text h1 style={theme.WelcomeStyles.textStyle} >Cooking Experience </Text>
                        <Text h1 style={theme.WelcomeStyles.textStyle}>Like a Chef </Text>
                    </View>
                    <TouchableOpacity onPress={onPressHandler} style={theme.WelcomeStyles.buttonContainer}>
                        <View style={theme.WelcomeStyles.iconContainer}>
                            <Icon name='arrow-forward-sharp' color="#28ed35" size={30} />
                        </View>
                        <View>
                            <Text style={theme.WelcomeStyles.btnText} h4>Get Started</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            )}
        </ThemeConsumer>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    textStyle: {
        color: "white",
    },
    viewStyle: {
        paddingHorizontal: 10,
        flexDirection: "column",
        alignItems: "center",
        marginVertical: 170
    },
    buttonContainer: {
        width: "60%",
        borderRadius: 50,
        height: 80,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#eb4034",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 200
    },
    btnText: {
        color: "white"
    },
    iconContainer: {
        backgroundColor: "white",
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    }
})