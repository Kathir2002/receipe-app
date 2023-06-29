import { useContext, useState, useEffect } from 'react'
import { View, ImageBackground, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import { Avatar, Text, Overlay, ThemeConsumer } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Formik } from 'formik'
import Icon from "react-native-vector-icons/Entypo"
import UserProfile from "../utils/UserProfile"
import userContext from '../Store/userContext'
import AppHeader from '../utils/AppHeader'

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
    }, [])
    const getUserData = async () => {
        try {
            const res = await axios.post('https://calm-ruby-leopard-ring.cyclic.app/get-user', { uId: userKey })
            setUserPhoto(res?.data?.User?.userImage)
            setUserData(res?.data)
            setLoading(false)
        }
        catch (err) {
            console.log(err);
        }
    }
    const visiblityHandler = (e) => {
        setVisible(e)
    }
    const logoutHandler = async () => {
        await AsyncStorage.clear()
        setIsAuth(false)
        navigation.navigate("HomeReceipe")
    }
    const onDataChangeHandler = async (values) => {
        let data = { name: values.name, uId: userKey, phoneNumber: values.phoneNumber }
        await axios.post("https://calm-ruby-leopard-ring.cyclic.app/edit-user", data)
        ToastAndroid.showWithGravity("Profile updated successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        setIsTouchedName(false)
    }
    return (
        <ThemeConsumer>
            {({ theme }) => (
                loading ? <View style={theme.OTPVerifyStylessplashContainer}>
                    <ImageBackground source={require("../assets/loading.gif")} style={theme.OTPVerifyStyles.splashImage}>
                        <Text h2 style={theme.OTPVerifyStyles.splashTxt}>Flavor Finder</Text>
                    </ImageBackground>
                </View> :
                    <>
                        <AppHeader name={"Profile"} />
                        <View style={theme.SettingStyle.container}>
                            <ImageBackground style={theme.SettingStyle.bgImageStyle} source={require("../assets/profile-bg.png")}>
                                <View style={{ alignItems: "flex-end", padding: 15 }}>
                                    <Text style={{ color: "white", fontSize: 16, fontWeight: 700 }} >Change Password?</Text>
                                </View>
                                <View style={theme.SettingStyle.imgBgContainer}>
                                    <Avatar testID="avatar" source={{ uri: userPhoto?.length > 100 ? `data:image/png;base64,${userPhoto}` : userPhoto }} rounded size={100} onPress={() => setVisible(true)} />
                                    <Text testID='userName' style={theme.SettingStyle.txtHeadStyle}>{userData?.User?.name}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={require("../assets/bg-2.jpg")} style={theme.SettingStyle.mainContainer}>
                                <Formik
                                    initialValues={{ email: userData?.User?.email, name: userData?.User?.name, phoneNumber: userData?.User?.phoneNumber }}
                                    onSubmit={values => onDataChangeHandler(values)}>
                                    {({ errors, touched, handleChange, setFieldValue, handleBlur, handleSubmit, values, isValid }) => (
                                        <>
                                            <View style={theme.SettingStyle.txtContainer}>
                                                <Text>Name</Text>
                                                <View style={theme.SettingStyle.txtIconContainer}>
                                                    <TextInput
                                                        testID='game'
                                                        editable={isTouchedName}
                                                        name="name"
                                                        style={[theme.SettingStyle.inpStyle, { backgroundColor: isTouchedName ? "#D3D3D3" : "transparent", borderRadius: 10 }]}
                                                        onChangeText={handleChange("name")}
                                                        value={values.name}
                                                        keyboardType="default"
                                                    />
                                                    <Icon testID='edit1Icon' name='edit' color={"black"} size={20} onPress={() => setIsTouchedName(!isTouchedName)} />
                                                </View>
                                            </View>
                                            <View style={theme.SettingStyle.txtContainer}>
                                                <Text>Email</Text>
                                                <View style={theme.SettingStyle.txtIconContainer}>
                                                    <TextInput
                                                        name="email"
                                                        style={theme.SettingStyle.inpStyle}
                                                        onChangeText={(handleChange('email'))}
                                                        value={userData?.User?.email}
                                                        editable={false}
                                                        keyboardType="email-address"
                                                    />
                                                </View>
                                            </View>
                                            <View style={theme.SettingStyle.txtContainer}>
                                                <Text>Mobile</Text>
                                                <View style={theme.SettingStyle.txtIconContainer}>
                                                    <TextInput
                                                        testID='mobileField'
                                                        editable={isTouchedMobile}
                                                        name="phoneNumber"
                                                        style={[theme.SettingStyle.inpStyle, { backgroundColor: isTouchedMobile ? "#D3D3D3" : "transparent", borderRadius: 10 }]}
                                                        onChangeText={(handleChange('phoneNumber'))}
                                                        onBlur={handleBlur("phoneNumber")}
                                                        value={values?.phoneNumber?.toString()}
                                                        keyboardType="numeric"
                                                    />
                                                    <Icon testID='edit2Icon' name='edit' color={"black"} size={20} onPress={() => setIsTouchedMobile(!isTouchedMobile)} />
                                                </View>
                                            </View>
                                            <View>
                                                <View style={theme.SettingStyle.conditionView}>
                                                    {
                                                        isTouchedMobile && isTouchedName && <View>
                                                            <TouchableOpacity testID='submitBtn' style={theme.SettingStyle.smallButtonContainer} onPress={handleSubmit}>
                                                                <Text style={theme.SettingStyle.btnText}>Save</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    }
                                                    <View>
                                                        <TouchableOpacity testID='logoutBtn' style={theme.SettingStyle.buttonContainer} onPress={logoutHandler}>
                                                            <Text style={theme.SettingStyle.btnText}>Logout</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </>
                                    )}
                                </Formik>
                            </ImageBackground>
                            <Overlay testID='overlayOpen' style={theme.SettingStyle.overlay} visible={visible} onBackdropPress={() => setVisible(false)}>
                                <UserProfile setVisible={visiblityHandler} />
                            </Overlay>
                        </View>
                    </>
            )}
        </ThemeConsumer>
    )
}

export default Settings
