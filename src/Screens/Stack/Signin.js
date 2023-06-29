import React, { useContext, useState, useRef } from 'react'
import { View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import { Avatar, Text, ThemeConsumer } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
//file imports 
import userContext from '../../Store/userContext'
import CheckedBox from '../../utils/CheckedBox'

const Signin = () => {
    const ref = useRef()
    const navigation = useNavigation()

    const [isTouched, setIsTouched] = useState(false)
    const [isSelected, setSelection] = useState(false);

    const { setIsAuth, setIsAdmin } = useContext(userContext)

    const remindHandler = (e) => {
        setSelection(e)
    }

    const onCheckHandler = async (values) => {
        try {
            const res = await axios.post("https://calm-ruby-leopard-ring.cyclic.app/signin", { email: values.email, password: values.password })
            if (res?.data.error) {
                ToastAndroid.showWithGravity(res?.data?.error, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
            else {
                if (res?.data?.auth == true) {
                    await AsyncStorage.setItem("userKey", res?.data?.data?._id)
                    if (isSelected) {
                        await AsyncStorage.setItem("loginUser", JSON.stringify(true))
                    }
                    if (res?.data?.data?.userRole == 1) {
                        setIsAdmin(true)
                    }
                    setIsAuth(true)
                    navigation.navigate('HomeDrawer')
                }
                else {
                    ToastAndroid.showWithGravity(res.data, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    //yup validation schema
    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("please enter valid email")
            .required("Email Address is required"),
        password: yup
            .string()
            .min(8, ({ min }) => `password must be at least ${min} characters`)
            .required('password is required'),
    })
    return (

        <ThemeConsumer>
            {({ theme }) => (
                <View testID='signinMainView' style={theme.SigninStyles.container}>
                    <View style={theme.SigninStyles.empty}>
                        <AntDesign testID='backIcon' name="arrowleft" color="white" size={30} onPress={() => navigation.navigate("HomeReceipe")} />
                        <Text testID='changePass' style={theme.SigninStyles.forgetTxt} onPress={() => navigation.navigate("ChangePassword")}>Forget Password?</Text>
                    </View>

                    <Formik
                        innerRef={ref}
                        validationSchema={loginValidationSchema}
                        initialValues={{ email: "", password: "" }}
                        onSubmit={values => onCheckHandler(values)}>
                        {({ errors, touched, setFieldValue, handleBlur, handleSubmit, values, isValid }) => (
                            <View style={theme.SigninStyles.inpStart}>
                                <View style={theme.SignupStyles.inpView}>
                                    <Text h3>Let's get something</Text>
                                    <Text h6>Good to see you back.</Text>
                                </View>
                                <View style={theme.SignupStyles.avatarContainer}>
                                    <Avatar size={35} source={require("../../assets/google-logo.png")} rounded />
                                    <Avatar size={40} source={require("../../assets/Facebook-logo.png")} rounded />
                                    <Avatar size={40} source={require("../../assets/twitter-logo.png")} rounded />
                                </View>
                                <View style={theme.SigninStyles.txtFieldFlex}>
                                    <AntDesign name="mail" size={25} color="black" />
                                    <TextInput
                                        testID='emailField'
                                        style={theme.SigninStyles.inpStyle}
                                        autoCapitalize='none'
                                        name="email"
                                        placeholderTextColor="black"
                                        placeholder='Email'
                                        onChangeText={(e) => (setFieldValue('email', e))}
                                        onBlur={handleBlur("email")}
                                        value={values.email}
                                        keyboardType="email-address"
                                    />
                                    {(errors.email && touched.email) &&
                                        <Text style={theme.SigninStyles.errorText}>{errors.email}</Text>
                                    }
                                </View>
                                <View style={theme.SigninStyles.txtFieldFlex} >
                                    <AntDesign name='lock' size={25} color="black" />
                                    <TextInput
                                        testID='passwordField'
                                        autoCapitalize="none"
                                        name="password"
                                        style={theme.SigninStyles.inpStyle}
                                        placeholder='Password'
                                        onChangeText={(text) => setFieldValue('password', text)}
                                        onBlur={handleBlur("password")}
                                        value={values.password}
                                        secureTextEntry={isTouched}
                                        placeholderTextColor="black"
                                        keyboardType="default"
                                    />
                                    <Icon testID='icon' name={isTouched ? "eye" : "eye-slash"} size={25} color={"black"} onPress={() => setIsTouched(!isTouched)} />
                                    {(errors.password && touched.password) &&
                                        <Text style={theme.SigninStyles.errorText}>{errors.password}</Text>
                                    }
                                </View>
                                <View style={theme.SigninStyles.footerContainer}>
                                    <View style={theme.SigninStyles.switchContainer}>
                                        <Text style={theme.SignupStyles.remindTxt}>Remaind me next time</Text>

                                        <CheckedBox isSelected={isSelected} setSelection={remindHandler} />
                                    </View>
                                    <TouchableOpacity testID='signinBtn' style={theme.SigninStyles.buttonContainer} disabled={!isValid} onPress={handleSubmit}>
                                        <Text h4 style={theme.SigninStyles.btnText}>Signin</Text>
                                    </TouchableOpacity>
                                    <Text style={theme.SigninStyles.loginText} testID='registerBtn' onPress={() => { ref?.current?.resetForm(); navigation.navigate("Signup") }} >Do You don't have an Account?</Text>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            )}
        </ThemeConsumer>
    )
}

export default Signin
