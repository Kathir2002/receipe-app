import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, ImageBackground, ScrollView, ToastAndroid } from 'react-native'
import { Avatar, Text, ThemeConsumer } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from "react-native-vector-icons/FontAwesome"
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import * as yup from 'yup'
import axios from 'axios'
import CheckedBox from "../../utils/CheckedBox"

const Signup = () => {

    const [isSlected, setIsSelcted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selection, setSelection] = useState(false)
    const navigation = useNavigation()

    const onRegisterHandler = async (values) => {
        const checkEmail = await axios.post("https://calm-ruby-leopard-ring.cyclic.app/check-email", { email: values.email })
        if (!checkEmail?.data?.err) {
            setLoading(true)
            const sendOTP = await axios.post("https://calm-ruby-leopard-ring.cyclic.app/send-otp", { email: values.email })
            setLoading(false)
            let otp = sendOTP.data
            navigation.navigate("OTPVerify", { values, otp, isSelected: selection })
        }
        else {
            ToastAndroid.showWithGravity(checkEmail?.data?.err, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        }
    }

    const remindHandler = (e) => {
        setSelection(e)
    }

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("please enter valid email")
            .required("Email Address is required!"),
        password: yup
            .string()
            .min(8, ({ min }) => `password must be at least ${min} characters`)
            .required('password is required!'),
        uName: yup
            .string()
            .min(5, ({ min }) => `password must be at least ${min} characters`)
            .required("User name is required!"),
        phoneNumber: yup
            .string()
            .matches(/(\d){10}\b/, 'Enter the valid ph number')
            .matches("^[6-9][0-9]*$", 'Enter the valid phone number')
            .max(10)
            .min(10)
            .required('phone number is required'),
    })
    return (
        <ThemeConsumer>
            {({ theme }) => (
                loading ? <View style={theme.OTPVerifyStylessplashContainer}>
                    <ImageBackground source={require("../../assets/loading.gif")} style={theme.OTPVerifyStyles.splashImage}>
                        <Text h2 style={theme.OTPVerifyStyles.splashTxt}>Flavor Finder</Text>
                    </ImageBackground>
                </View> : <KeyboardAvoidingView style={theme.SignupStyles.container} behavior={"padding"}>
                    <View style={theme.SignupStyles.empty}>
                        <AntDesign testID='backIcon' name="arrowleft" color="white" size={30} onPress={() => navigation.navigate("HomeReceipe")} />
                        <Text style={{ fontSize: 18, fontWeight: 600, color: "white" }}>Need any help?</Text>
                    </View>
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{ email: "", password: "", uName: "", phoneNumber: "" }}
                        onSubmit={values => onRegisterHandler(values)}>
                        {({ errors, touched, setFieldValue, handleBlur, handleSubmit, values, isValid, handleChange }) => (
                            <View style={theme.SignupStyles.inpStart}>
                                <View style={theme.SignupStyles.inpView}>
                                    <Text h3>Getting started</Text>
                                    <Text h6>Create an account to continue!</Text>
                                </View>
                                <View style={theme.SignupStyles.avatarContainer}>
                                    <Avatar size={35} source={require("../../assets/google-logo.png")} rounded />
                                    <Avatar size={40} source={require("../../assets/Facebook-logo.png")} rounded />
                                    <Avatar size={40} source={require("../../assets/twitter-logo.png")} rounded />
                                </View>
                                <View>
                                    <View style={theme.SignupStyles.txtFieldFlex}>
                                        <AntDesign name="user" size={25} color="black" />
                                        <TextInput
                                            testID='nameField'
                                            name="uName"
                                            style={theme.SignupStyles.inpStyle}
                                            placeholder='User Name'
                                            // onChangeText={(e) => (setFieldValue('uName', e))}
                                            onChangeText={handleChange("uName")}
                                            onBlur={handleBlur("uName")}
                                            value={values.uName}
                                            placeholderTextColor="black"
                                            keyboardType="default"
                                        />
                                        {(errors.uName && touched.uName) &&
                                            <Text style={theme.SignupStyles.errorText}>{errors.uName}</Text>
                                        }
                                    </View>
                                    <View style={theme.SignupStyles.txtFieldFlex}>
                                        <AntDesign name="mail" size={25} color="black" />
                                        <TextInput
                                            testID='emailField'
                                            name="email"
                                            autoCapitalize='none'
                                            style={theme.SignupStyles.inpStyle}
                                            placeholder='Email'
                                            onChangeText={(e) => (setFieldValue('email', e))}
                                            // onChangeText={"email"}
                                            onBlur={handleBlur("email")}
                                            value={values.email}
                                            placeholderTextColor="black"
                                            keyboardType="email-address"

                                        />
                                        {(errors.email && touched.email) &&
                                            <Text style={theme.SignupStyles.errorText}>{errors.email}</Text>
                                        }
                                    </View>
                                    <View style={theme.SignupStyles.txtFieldFlex}>
                                        <AntDesign name="phone" size={25} color="black" />
                                        <TextInput
                                            testID='phoneNoField'
                                            name="phoneNumber"
                                            style={theme.SignupStyles.inpStyle}
                                            placeholder='Phone Number'
                                            onChangeText={(e) => (setFieldValue('phoneNumber', e))}
                                            // onChangeText={handleChange("phoneNumber")}
                                            onBlur={handleBlur("phoneNumber")}
                                            value={values.phoneNumber}
                                            keyboardType="numeric"
                                            placeholderTextColor="black"
                                        />
                                        {(errors.phoneNumber && touched.phoneNumber) &&
                                            <Text style={theme.SignupStyles.errorText}>{errors.phoneNumber}</Text>
                                        }
                                    </View>
                                    <View style={theme.SignupStyles.txtFieldFlex} >
                                        <AntDesign name='lock' size={25} color="black" />
                                        <TextInput
                                            testID='passwordField'
                                            style={theme.SignupStyles.inpStyle}
                                            placeholderTextColor="black"
                                            name="password"
                                            placeholder='Password'
                                            onChangeText={(text) => setFieldValue('password', text)}
                                            // onChangeText={handleChange("password")}
                                            onBlur={handleBlur("password")}
                                            value={values.password}
                                            secureTextEntry={isSlected ? false : true}
                                            keyboardType="default"
                                        />
                                        <Icon testID='eyeIcon' name={isSlected ? "eye" : "eye-slash"} size={25} color={"black"} onPress={() => setIsSelcted(!isSlected)} />
                                        {(errors.password && touched.password) &&
                                            <Text style={theme.SignupStyles.errorText}>{errors.password}</Text>
                                        }
                                    </View>
                                </View>
                                <View style={theme.SigninStyles.switchContainer}>
                                    <Text style={theme.SignupStyles.remindTxt}>Remaind me next time</Text>
                                    <CheckedBox isSelected={selection} setSelection={remindHandler} />
                                </View>
                                <View style={theme.SignupStyles.footerContainer}>
                                    <TouchableOpacity testID='submitBtn' style={theme.SignupStyles.buttonContainer} disabled={!isValid} onPress={handleSubmit}>
                                        <Text h4 style={theme.SignupStyles.btnText}>Signup</Text>
                                    </TouchableOpacity>
                                    <Text testID='signinBtn' style={theme.SignupStyles.loginText} onPress={() => navigation.navigate("Signin")} >Do You have an Account?</Text>
                                </View>
                            </View>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            )}
        </ThemeConsumer>
    )
}

export default Signup
