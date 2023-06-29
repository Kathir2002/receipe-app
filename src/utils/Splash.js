import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { Text, ThemeConsumer, ThemeProvider } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import Theme from '../Theme'
import userContext from '../Store/userContext'
import Stack from '../Stack/StackFile'

const Splash = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    const [isFinger, setIsFinger] = useState(true)
    const [userPhoto, setUserPhoto] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png")
    const [Data, setData] = useState([])
    const [fav, setFav] = useState([])
    const [userKey, setUserKey] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        setTimeout(() =>
            setIsLoading(false),
            3000)
    }, [])

    useEffect(() => {
        getRecipeData()
    }, [])

    const getRecipeData = async () => {
        const res = await axios.get("https://calm-ruby-leopard-ring.cyclic.app/get-recipes")
        setData(res?.data?.data);
    }

    const SplashScreen = () => {
        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <View testID='mainView' style={{ flex: 1 }}>
                        <ImageBackground testID='bgImage' source={require("../assets/splash-image.gif")} style={theme.SplashStyles.splashImage}>
                            <Text testID='heading' h2 style={theme.SplashStyles.splashTxt}>Flavor Finder</Text>
                        </ImageBackground>
                    </View>
                )}
            </ThemeConsumer>
        )
    }

    return (
        <userContext.Provider value={{
            isAuth,
            setIsAuth,
            isFinger,
            setIsFinger,
            userPhoto,
            setUserPhoto,
            Data,
            setData,
            fav,
            setFav,
            userKey,
            setUserKey,
            isAdmin,
            setIsAdmin,
        }}>
            <NavigationContainer independent={true}>
                <ThemeProvider theme={Theme} >
                    {isLoading ? <SplashScreen /> : <Stack />}
                </ThemeProvider>
            </NavigationContainer>
        </userContext.Provider>
    )
}

export default Splash