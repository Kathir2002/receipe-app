import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../Screens/Stack/Signin';
import Signup from '../Screens/Stack/Signup';
import WelcomeScreen from '../Screens/Stack/Welcome';
import userContext from '../Store/userContext';
import HomeReceipeScreen from '../Screens/Stack/HomeReceipeScreen';
import LoginReq from '../Screens/Stack/LoginReq';
import RecepieDetails from '../Login Stack/RecepieDetails';
import DrawerScreen from './DrawerFile';
import OTPVerfication from '../Screens/Stack/OTPVerfication';
import ChangePassword from '../Screens/Stack/ChangePassword';

const HomeScreen = () => {

    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="HomeReceipe" component={HomeReceipeScreen} />
            <Stack.Screen name='LoginReq' component={LoginReq} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='Signin' component={Signin} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            <Stack.Screen name='OTPVerify' component={OTPVerfication} />
        </Stack.Navigator>
    )
}

const BiometricScreen = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
        </Stack.Navigator>
    )
}

const ProtectedScreen = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeDrawer" component={DrawerScreen} />
            <Stack.Screen name="RecipeDetails" component={RecepieDetails} />
        </Stack.Navigator>
    )
}

const Stack = () => {
    const { isAuth, isFinger, setIsFinger, setIsAuth } = useContext(userContext)
    useEffect(() => {
        AsyncStorage.getItem("loginUser")
            .then((res) => {
                if (res !== null) {
                    setIsAuth(res)
                }
                else {
                    setIsFinger(false)
                }
            })
    })
    return (
        isFinger ? <BiometricScreen /> : (isAuth ? <ProtectedScreen /> : <HomeScreen />)
    )
}

export default Stack