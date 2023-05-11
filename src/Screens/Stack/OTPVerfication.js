import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { ThemeConsumer } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import AntDesign from "react-native-vector-icons/AntDesign"


const OTPVerfication = () => {
    const navigation = useNavigation()
    let otpDigit = ["", "", "", "", "", ""]

    const [OTPString, setOTPString] = useState([])
    const [counter, setCounter] = useState(300)
    const [isOtpValid, setIsOtpValid] = useState(false)
    useEffect(() => {
        const myInterval = () => {
            if (counter >= 1) {
                setCounter((counter) => counter - 1)
            }
            if (counter === 0) {
                setIsOtpValid(false)
            }
        }
        let interval = setTimeout(myInterval, 1000)

        return () => {
            clearTimeout(interval)
        }
    }, [counter])
    console.log(isOtpValid);
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <>
                    <View style={theme.RecipeDetailStyle.iconContainerStyle}>
                        <AntDesign name='arrowleft' color="white" size={30} onPress={() => navigation.goBack()} />
                        <Text style={theme.RecipeDetailStyle.txt}>Verification</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <View>
                            <Text>Email Send to </Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            {
                                otpDigit.map((res, index) => {
                                    return (
                                        <View key={index} style={{ width: 40, height: 40, borderWidth: 1, borderColor: "gray", alignItems: "center", justifyContent: "center" }} >
                                            <TextInput style={{ color: "black", height: "100%", width: "100%" }}
                                                maxLength={1}
                                            // onChangeText={() => }
                                            />
                                        </View>
                                    )
                                })
                            }
                            <Text style={{ color: "black" }} >{counter}</Text>
                        </View>
                    </View>
                </>
            )}
        </ThemeConsumer>
    )
}

export default OTPVerfication

const styles = StyleSheet.create({})