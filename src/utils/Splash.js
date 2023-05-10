import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { Text, ThemeConsumer, ThemeProvider } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import Theme from '../Theme'
import userContext from '../Store/userContext'
import Stack from '../Stack/StackFile'
import data from './data';

const Splash = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    const [isFinger, setIsFinger] = useState(true)
    const [userPhoto, setUserPhoto] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png")
    const [Data, setData] = useState([...data])
    const [fav, setFav] = useState([])
    const [userKey, setUserKey] = useState("")

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 3000)
    }, [])

    const SplashScreen = () => {
        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <ImageBackground source={require("../assets/splash-image.gif")} style={theme.SplashStyles.splashImage}>
                        <Text h2 style={theme.SplashStyles.splashTxt}>Flavor Finder</Text>
                    </ImageBackground>
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
            data,
            setData,
            fav,
            setFav,
            userKey,
            setUserKey
        }}>
            <NavigationContainer>
                <ThemeProvider theme={Theme} >
                    {false ? <SplashScreen /> : <Stack />}
                </ThemeProvider>
            </NavigationContainer>
        </userContext.Provider>
    )
}

export default Splash