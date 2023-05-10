import React from 'react'
import { Dimensions, Image, View } from 'react-native'
import { Text, ThemeConsumer } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation, DrawerActions } from '@react-navigation/native'

const width = Dimensions.get("window").width

const AppHeader = ({ name }) => {
    const navigation = useNavigation()
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <View style={theme.AppHeaderStyles.container}>
                    <View style={theme.AppHeaderStyles.innerView}>
                        <Text h4 style={theme.AppHeaderStyles.txt}>{name}</Text>
                        <Icon style={theme.AppHeaderStyles.iconStyle} name="grid" size={30} color={"white"} onPress={() => navigation.openDrawer()} />
                    </View>
                </View>
            )}
        </ThemeConsumer>
    )
}

export default AppHeader
