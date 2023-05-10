import { useContext, useState, useEffect } from 'react'
import { View, Dimensions, ImageBackground, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import { Avatar, Text, Overlay, ThemeConsumer } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Formik } from 'formik'
import Icon from "react-native-vector-icons/Entypo"
import UserProfile from "../utils/UserProfile"
import userContext from '../Store/userContext'
import AppHeader from '../utils/AppHeader'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const Settings = () => {

    const navigation = useNavigation()
    const [isTouchedName, setIsTouchedName] = useState(false)
    const [isTouchedMobile, setIsTouchedMobile] = useState(false)
    const [loading, setLoading] = useState(true)

    const { userPhoto, setUserPhoto, setIsAuth, userKey } = useContext(userContext)
    const [visible, setVisible] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        getUserData()
    }, [userData])

    const getUserData = async () => {
        try {
            const res = await axios.get(`https://chatapp-167bb-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userKey}.json`);
            setUserData(res.data)
            setLoading(false)
        }
        catch (err) {
            console.log(err);
        }
    }
    const CameraHandler = (e) => {
        setUserPhoto(e)
    }
    const visiblityHandler = (e) => {
        setVisible(e)
    }

    const logoutHandler = async () => {
        await AsyncStorage.removeItem("loginUser")
        await AsyncStorage.removeItem("userKey")
        setIsAuth(false)
        navigation.navigate("HomeReceipe")
    }
    const onDataChangeHandler = async (values) => {
        if ((values.uName) && (values.phoneNumber)) {
            let data1 = { ...values, password: userData.password, email: userData.email, userProfilePhoto: { photo: userPhoto } }
            await axios.put(`https://chatapp-167bb-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userKey}.json`, data1)
        }
        else {
            ToastAndroid.showWithGravity("Please fill all details!", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        }
        setIsTouchedName(false)
    }

    return (
        <ThemeConsumer>
            {({ theme }) => (
                loading ? <ImageBackground style={theme.SplashStyles.splashImage} source={require("../assets/loading.gif")} /> :
                    <>
                        <AppHeader name={"Profile"} />
                        <View style={theme.SettingStyle.container}>
                            <ImageBackground style={theme.SettingStyle.bgImageStyle} source={require("../assets/profile-bg.png")}>
                                <View style={theme.SettingStyle.imgBgContainer}>
                                    <Avatar source={{ uri: userPhoto }} rounded size={100} onPress={() => setVisible(true)} />
                                    <Text style={theme.SettingStyle.txtHeadStyle}>{userData.uName}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={require("../assets/bg-2.jpg")} style={theme.SettingStyle.mainContainer}>

                                <Formik
                                    initialValues={{ email: userData.email, uName: userData.uName, phoneNumber: userData.phoneNumber }}
                                    onSubmit={values => onDataChangeHandler(values)}>
                                    {({ errors, touched, setFieldValue, handleBlur, handleSubmit, values, isValid }) => (
                                        <>
                                            <View style={theme.SettingStyle.txtContainer}>
                                                <Text>Name</Text>
                                                <View style={theme.SettingStyle.txtIconContainer}>
                                                    <TextInput
                                                        editable={isTouchedName}
                                                        onFocus={() => console.log("focus")}
                                                        name="uName"
                                                        style={[theme.SettingStyle.inpStyle, { backgroundColor: isTouchedName ? "#D3D3D3" : "transparent", borderRadius: 10 }]}
                                                        onChangeText={(e) => (setFieldValue('uName', e))}
                                                        value={values.uName}
                                                        keyboardType="default"
                                                    />
                                                    <Icon name='edit' color={"black"} size={20} onPress={() => setIsTouchedName(!isTouchedName)} />
                                                </View>
                                            </View>
                                            <View style={theme.SettingStyle.txtContainer}>
                                                <Text>Email</Text>
                                                <View style={theme.SettingStyle.txtIconContainer}>
                                                    <TextInput
                                                        name="email"
                                                        style={theme.SettingStyle.inpStyle}
                                                        onChangeText={(e) => (setFieldValue('email', e))}
                                                        value={userData.email}
                                                        editable={false}
                                                        keyboardType="email-address"
                                                    />
                                                </View>
                                            </View>
                                            <View style={theme.SettingStyle.txtContainer}>
                                                <Text>Mobile</Text>
                                                <View style={theme.SettingStyle.txtIconContainer}>
                                                    <TextInput
                                                        editable={isTouchedMobile}
                                                        name="phoneNumber"
                                                        style={[theme.SettingStyle.inpStyle, { backgroundColor: isTouchedMobile ? "#D3D3D3" : "transparent", borderRadius: 10 }]}
                                                        onChangeText={(e) => (setFieldValue('phoneNumber', e))}
                                                        onBlur={handleBlur("phoneNumber")}
                                                        value={values.phoneNumber}
                                                        keyboardType="numeric"
                                                    />
                                                    <Icon name='edit' color={"black"} size={20} onPress={() => setIsTouchedMobile(!isTouchedMobile)} />
                                                </View>
                                            </View>
                                            <View>
                                                <View style={theme.SettingStyle.conditionView}>
                                                    {
                                                        isTouchedMobile && isTouchedName && <View>
                                                            <TouchableOpacity style={theme.SettingStyle.smallButtonContainer} onPress={handleSubmit}>
                                                                <Text style={theme.SettingStyle.btnText}>Save</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    }
                                                    <View>
                                                        <TouchableOpacity style={theme.SettingStyle.buttonContainer} onPress={logoutHandler}>
                                                            <Text style={theme.SettingStyle.btnText}>Logout</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </>
                                    )}
                                </Formik>
                            </ImageBackground>
                            <Overlay style={theme.SettingStyle.overlay} visible={visible} onBackdropPress={() => setVisible(false)}>
                                <UserProfile setVisible={visiblityHandler} setCameraPhoto={CameraHandler} />
                            </Overlay>
                        </View>
                    </>
            )}
        </ThemeConsumer>
    )
}

export default Settings
