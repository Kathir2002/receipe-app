import { TextInput, Text, View, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ThemeConsumer } from 'react-native-elements'
import AntDesign from "react-native-vector-icons/AntDesign"
import Icon from "react-native-vector-icons/FontAwesome"
import { useNavigation } from '@react-navigation/native'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';
import axios from 'axios'

const ChangePassword = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [timer, setTimer] = useState(5 * 60)
    const [OTPString, setOTPString] = useState("")
    const [showOTP, setShowOTP] = useState(false)
    const [code, setCode] = useState()
    const [isTouched, setIsTouched] = useState(false)
    const [submitPressed, setSubmitPressed] = useState(false)
    const [password, setPassword] = useState("")

    const CELL_COUNT = 6;

    const ref = useBlurOnFulfill({ OTPString, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: OTPString,
        setValue: setOTPString,
    });

    const verifyHandler = async () => {
        if (email.length > 10) {
            const sendOTP = await axios.post("https://calm-ruby-leopard-ring.cyclic.app/send-otp", { email: email })
            setCode(sendOTP?.data)
            setShowOTP(true)
        }
        else {
            ToastAndroid.showWithGravity("Enter valid email address", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        }
    }
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
        navigation.navigate("Signin")
        ToastAndroid.showWithGravity("Please renter the details!", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }

    const onSubmitHandler = async () => {
        if (code == OTPString) {
            // if (code) {
            setShowOTP(false)
            setSubmitPressed(true)
        }
    }

    const onPasswordChangeHandler = async () => {
        setSubmitPressed(false)
        if (password?.length > 8) {
            await axios.post("https://calm-ruby-leopard-ring.cyclic.app/change-password", { email, password })
            ToastAndroid.showWithGravity("Password changed Successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            navigation.navigate("Signin")
        }
        else {
            ToastAndroid.showWithGravity("Password must be atleast 8 characters", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        }
    }

    return (
        <ThemeConsumer>
            {({ theme }) => (
                <>
                    <View style={theme.RecipeDetailStyle.iconContainerStyle}>
                        <AntDesign testID='goBackIcon' name='arrowleft' color="white" size={30} onPress={() => navigation.goBack()} />
                        <Text style={theme.RecipeDetailStyle.txt}>Change Password</Text>
                    </View>
                    <View style={theme.OTPVerifyStyles.container}>
                        <View style={{ alignItems: "center" }}>
                            <View style={theme.SigninStyles.txtFieldFlex}>
                                <AntDesign name="mail" size={25} color="black" />
                                <TextInput
                                    testID='emailField'
                                    style={theme.SigninStyles.inpStyle}
                                    autoCapitalize='none'
                                    name="email"
                                    placeholderTextColor="black"
                                    placeholder='Email'
                                    onChangeText={e => setEmail(e)}
                                    value={email}
                                    keyboardType="email-address"
                                />
                            </View>
                            <TouchableOpacity testID='verify' style={theme.OTPVerifyStyles.buttonContainer} onPress={verifyHandler}  >
                                <Text style={theme.OTPVerifyStyles.btnText}>Verify</Text>
                            </TouchableOpacity>
                            {
                                showOTP ? <View style={theme.OTPVerifyStyles.otpContainer}>
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
                                                    color: "black",
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
                                    <Text style={{ color: "black", textAlign: "center" }}>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity testID='submit' style={theme.OTPVerifyStyles.buttonContainer} onPress={onSubmitHandler}  >
                                            <Text style={theme.OTPVerifyStyles.btnText}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> : null
                            }
                            {
                                submitPressed ? <>
                                    <View style={theme.SigninStyles.txtFieldFlex} >
                                        <AntDesign name='lock' size={25} color="black" />
                                        <TextInput
                                            testID='passwordField'
                                            autoCapitalize="none"
                                            style={theme.SigninStyles.inpStyle}
                                            placeholder='New Password'
                                            onChangeText={(e) => setPassword(e)}
                                            value={password}
                                            secureTextEntry={isTouched ? false : true}
                                            placeholderTextColor="black"
                                            keyboardType="default"
                                        />
                                        <Icon testID='eyeIcon' name={isTouched ? "eye" : "eye-slash"} size={25} color={"black"} onPress={() => setIsTouched(!isTouched)} />
                                    </View>
                                    <TouchableOpacity testID='changePassword' style={theme.OTPVerifyStyles.buttonContainer} onPress={onPasswordChangeHandler}  >
                                        <Text style={theme.OTPVerifyStyles.btnText}>Change</Text>
                                    </TouchableOpacity>
                                </> : null
                            }

                        </View>
                    </View>

                </>
            )}
        </ThemeConsumer>
    )
}

export default ChangePassword

