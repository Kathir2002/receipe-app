import React, { useState, useContext } from 'react'
import { StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native'
import { Text, ThemeConsumer } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import BiometricID from 'react-native-biometric-id';
import userContext from '../../Store/userContext'

const WelcomeScreen = () => {
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
                <View testID='mainView1' style={{ flex: 1 }}>
                    <ImageBackground testID='bgImage' style={theme.WelcomeStyles.imgContainer} resizeMode="cover" source={require("../../assets/home-bg-image.jpeg")}>
                        <View style={theme.WelcomeStyles.viewStyle}>
                            <Text h1 style={theme.WelcomeStyles.textStyle} >Cooking Experience </Text>
                            <Text h1 style={theme.WelcomeStyles.textStyle}>Like a Chef </Text>
                        </View>
                        <TouchableOpacity testID='startButton' onPress={onPressHandler} style={theme.WelcomeStyles.buttonContainer}>
                            <View style={theme.WelcomeStyles.iconContainer}>
                                <Icon name='arrow-forward-sharp' color="#28ed35" size={30} />
                            </View>
                            <View>
                                <Text style={theme.WelcomeStyles.btnText} h4>Get Started</Text>
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            )}
        </ThemeConsumer>
    )
}

export default WelcomeScreen
