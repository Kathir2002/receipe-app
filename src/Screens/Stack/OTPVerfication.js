import React, { useState, useEffect } from 'react'
import { View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
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


const OTPVerfication = () => {
    const navigation = useNavigation()
    const route = useRoute().params
    const [userProfilePhoto, setUserProfilePhoto] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png")
    const [OTPString, setOTPString] = useState("")
    const [isOtpValid, setIsOtpValid] = useState(false)
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

    const otpVerifyHandler = async () => {

        if (OTPString == route.otp) {
            const data = { ...route.values, userProfilePhoto: { photo: userProfilePhoto } }
            const nodeData = { name: route.values.uName, password: route.values.password, email: route.values.email, phoneNumber: route.values.phoneNumber }
            console.log(route.values);
            setLoading(true)
            // await axios.post("https://chatapp-167bb-default-rtdb.asia-southeast1.firebasedatabase.app/users.json", data)
            await axios.post("https://calm-ruby-leopard-ring.cyclic.app//signup", data)
                .catch(err => console.log(err))
            // const mailData = { password: route.values.password, email: route.values.email, phoneNumber: route.values.phoneNumber, name: route.values.uName }
            // await axios.post("https://calm-ruby-leopard-ring.cyclic.app/send-email", mailData)
            //     .catch((err) => console.log("err", err))
            setLoading(false)
            navigation.navigate("Signin")
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
                        <AntDesign name='arrowleft' color="white" size={30} onPress={() => navigation.goBack()} />
                        <Text style={theme.RecipeDetailStyle.txt}>Verification</Text>
                    </View>
                    <View style={theme.OTPVerifyStyles.container}>
                        <View>
                            <Text h5>Email Send to {route?.values?.email} </Text>
                        </View>
                        <Text h4>Enter OTP to verify</Text>
                        <Text style={{ color: "black" }}>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>

                        <View style={theme.OTPVerifyStyles.otpContainer}>
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
                        <Text h4>{route?.otp}</Text>
                        <Text h4>{OTPString}</Text>
                        <TouchableOpacity style={theme.OTPVerifyStyles.buttonContainer} onPress={otpVerifyHandler} >
                            <Text style={theme.OTPVerifyStyles.btnText}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
            }
        </ThemeConsumer >
    )
}

export default OTPVerfication


