import React, { useContext, useEffect, useState } from 'react'
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
    const navigation = useNavigation()
    const [userData, setUserData] = useState([])
    const [userDataKey, setUserDataKey] = useState([])
    const [fullData, setFullData] = useState([])
    const [isTouched, setIsTouched] = useState(false)
    const [isSelected, setSelection] = useState(false);
    const { setIsAuth } = useContext(userContext)
    
    useEffect(() => {
        getUserData()
    }, [])

    const remindHandler = (e) => {
        setSelection(e)
    }

    //To get the users data from backend
    const getUserData = async () => {
        try {
            const res = await axios.get("https://chatapp-167bb-default-rtdb.asia-southeast1.firebasedatabase.app/users.json")
            setUserDataKey(Object.keys(res.data))
            setFullData(res.data)
            setUserData(Object.values(res.data))
        }
        catch (err) {
            console.log(err);
        }
    }

    const onCheckHandler = (values) => {
        let valid = true
        //to take key of the user
        userDataKey.map(async (key) => {
            if (fullData[key].email === values.email) {
                await AsyncStorage.setItem("userKey", JSON.stringify(key))
            }
        })
        //to validate the credentials
        userData.map((res) => {
            if ((res.email === values.email) && (res.password === values.password)) {
                if(isSelected) {
                    AsyncStorage.setItem("loginUser", JSON.stringify(true))
                }
                navigation.navigate('HomeDrawer')
                setIsAuth(true)
                valid = false
            }
        })
        if (valid) {
            ToastAndroid.showWithGravity("Please enter valid credentials!", ToastAndroid.SHORT, ToastAndroid.BOTTOM)

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
                <View style={theme.SigninStyles.container}>
                    <View style={theme.SigninStyles.empty}>
                        <AntDesign name="arrowleft" color="white" size={30} onPress={() => navigation.navigate("HomeReceipe")} />
                        <Text style={{ fontSize: 18, fontWeight: 600, color: "white" }}>Forget Password?</Text>
                    </View>
                    <Formik
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
                                        name="password"
                                        style={theme.SigninStyles.inpStyle}
                                        placeholder='Password'
                                        onChangeText={(text) => setFieldValue('password', text)}
                                        onBlur={handleBlur("password")}
                                        value={values.password}
                                        secureTextEntry={isTouched ? false : true}
                                        placeholderTextColor="black"
                                        keyboardType="default"
                                    />
                                    <Icon name={isTouched ? "eye" : "eye-slash"} size={25} color={"black"} onPress={() => setIsTouched(!isTouched)} />
                                    {(errors.password && touched.password) &&
                                        <Text style={theme.SigninStyles.errorText}>{errors.password}</Text>
                                    }
                                </View>
                                <View style={theme.SigninStyles.footerContainer}>
                                    <View style={theme.SigninStyles.switchContainer}>
                                        <Text style={theme.SignupStyles.remindTxt}>Remaind me next time</Text>
                                        <CheckedBox isSelected={isSelected} setSelection={remindHandler} />
                                    </View>
                                    <TouchableOpacity style={theme.SigninStyles.buttonContainer} disabled={!isValid} onPress={handleSubmit}>
                                        <Text h4 style={theme.SigninStyles.btnText}>Signin</Text>
                                    </TouchableOpacity>
                                    <Text style={theme.SigninStyles.loginText} onPress={() => navigation.navigate("Signup")} >Do You don't have an Account?</Text>
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
