import React, { useState, useEffect, useContext } from 'react'
import { View, TouchableOpacity, ImageBackground, ToastAndroid } from 'react-native'
import { ThemeConsumer, Text } from 'react-native-elements'
import { useNavigation, useRoute } from '@react-navigation/native'
import AntDesign from "react-native-vector-icons/AntDesign"
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userContext from '../../Store/userContext'


const OTPVerfication = () => {
    const navigation = useNavigation()
    const route = useRoute().params
    const { setIsAuth } = useContext(userContext)
    const [OTPString, setOTPString] = useState("")
    const [timer, setTimer] = useState(5 * 60);
    const [loading, setLoading] = useState(false)

    const CELL_COUNT = 6;

    const ref = useBlurOnFulfill({ OTPString, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: OTPString,
        setValue: setOTPString,
    });

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [timer]);

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    if (timer == 0) {
        navigation.navigate("Signup")
        ToastAndroid.showWithGravity("Please renter the details!", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
    const otpVerifyHandler = async () => {

        if (OTPString == route.otp) {
            const nodeData = { name: route.values.uName, password: route.values.password, email: route.values.email, phoneNumber: route.values.phoneNumber }
            setLoading(true)
            const res = await axios.post("https://calm-ruby-leopard-ring.cyclic.app/signup", nodeData)
            setLoading(false)
            await AsyncStorage.setItem("userKey", res.data?.data?._id)
            setIsAuth(true)
            if (route?.isSelected) {
                await AsyncStorage.setItem("loginUser", JSON.stringify(true))
            }
            navigation.navigate("HomeDrawer")
            ToastAndroid.showWithGravity(res?.data?.success, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        }
        else {
            ToastAndroid.showWithGravity("Enter valid OTP", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        }
    }

    return (
        <ThemeConsumer>
            {({ theme }) => (
                loading ? <View style={theme.OTPVerifyStylessplashContainer}>
                    <ImageBackground source={require("../../assets/loading.gif")} style={theme.OTPVerifyStyles.splashImage}>
                        <Text h2 style={theme.OTPVerifyStyles.splashTxt}>Flavor Finder</Text>
                    </ImageBackground>
                </View> : <>
                    <View style={theme.RecipeDetailStyle.iconContainerStyle}>
                        <AntDesign testID='backIcon' name='arrowleft' color="white" size={30} onPress={() => navigation.goBack()} />
                        <Text style={theme.RecipeDetailStyle.txt}>Verification</Text>
                    </View>
                    <View style={theme.OTPVerifyStyles.container}>
                        <View>
                            <Text testID='emailTxt' h5>Email Send to {route?.values?.email} </Text>
                        </View>
                        <Text h4>Enter OTP to verify</Text>
                        <Text testID='time' style={{ color: "black" }}>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>

                        <View testID='otpField' style={theme.OTPVerifyStyles.otpContainer}>
                            <CodeField
                                ref={ref}
                                {...props}
                                value={OTPString}
                                onChangeText={setOTPString}
                                cellCount={CELL_COUNT}
                                rootStyle={{ marginTop: 20 }}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Text
                                        key={index}
                                        style={[{
                                            width: 40,
                                            height: 40,
                                            lineHeight: 38,
                                            fontSize: 24,
                                            borderWidth: 2,
                                            borderColor: '#00000030',
                                            textAlign: 'center',
                                        }, isFocused && {
                                            borderColor: '#000',
                                        }]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                        </View>
                        <View style={{ alignItems: "center", marginTop: 50 }}>
                            <TouchableOpacity testID='otpHandlerBtn' style={theme.OTPVerifyStyles.buttonContainer} onPress={otpVerifyHandler} >
                                <Text style={theme.OTPVerifyStyles.btnText}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )
            }
        </ThemeConsumer >
    )
}

export default OTPVerfication


