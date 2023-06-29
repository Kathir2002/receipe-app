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
                <View testID='appHeaderView' style={theme.AppHeaderStyles.container}>
                    <View style={theme.AppHeaderStyles.innerView}>
                        <Text testID='nameField' h4 style={theme.AppHeaderStyles.txt}>{name}</Text>
                        <Icon testID='drawerIcon' style={theme.AppHeaderStyles.iconStyle} name="grid" size={30} color={"white"} onPress={() => navigation.openDrawer()} />
                    </View>
                </View>
            )}
        </ThemeConsumer>
    )
}

export default AppHeader
