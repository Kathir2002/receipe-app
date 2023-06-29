import React from 'react'
import { FlatList, TouchableOpacity, View, Text } from 'react-native'
import { Card, ThemeConsumer } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const FlatCardList = ({ data, search, navigateTo }) => {
    const navigation = useNavigation()

    const Item = ({ item }) => (
        <ThemeConsumer>
            {({ theme }) => (
                <TouchableOpacity testID={`${item.name}arrow`} activeOpacity={0.7} onPress={() => navigation.navigate(navigateTo, { item })}>
                    <Card containerStyle={theme.FlatStyles.cardContainer}>
                        <Card.Image source={{ uri: item?.image }} style={theme.FlatStyles.cardImageStyle} />
                        <Card.FeaturedTitle style={theme.FlatStyles.cardTextStyle}>{item?.name}</Card.FeaturedTitle>
                        <Card.Divider />
                        <Card.FeaturedSubtitle style={theme.FlatStyles.cardTextStyle}>Total Time: {item?.time} mins</Card.FeaturedSubtitle>
                    </Card>
                </TouchableOpacity>
            )}
        </ThemeConsumer>
    )

    return (
        <View>
            <FlatList
                nestedScrollEnabled
                data={data}
                numColumns={2}
                scrollEnabled={true}
                renderItem={({ item }) => {
                    let searchval = search?.toLowerCase().replace(/\s/, "")
                    let outval = (item?.name)?.toLowerCase().replace(/\s/, "")
                    if (outval?.includes(searchval)) {
                        return (
                            (item != undefined) && <Item item={item} />
                        )
                    }
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default FlatCardList
