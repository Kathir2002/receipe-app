import React from 'react'
import { VirtualizedList, View, TouchableOpacity, Image } from 'react-native'
import { Card, ThemeConsumer } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const ProTectedVirList = ({ data, search, bool }) => {
    const navigation = useNavigation()

    const getItem = (data, index) => {
        return data[index];
    };

    const Item = ({ item }) => {
        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <TouchableOpacity style={theme.TrendingStyles.container} activeOpacity={0.7} onPress={() => navigation.navigate("RecipeDetails", { item })}>
                        <Card containerStyle={theme.TrendingStyles.cardContainer}>
                            <Card.Image source={{ uri: item.image }} style={theme.TrendingStyles.cardImageStyle} />
                            <Card.FeaturedTitle style={theme.TrendingStyles.cardTextStyle}>{item.name}</Card.FeaturedTitle>
                            <Card.FeaturedSubtitle style={theme.TrendingStyles.cardTextStyle}>Total Time: {item.time} mins</Card.FeaturedSubtitle>
                            <Card.Divider />
                        </Card>
                    </TouchableOpacity>
                )}
            </ThemeConsumer>
        )
    }
    return (
        <View style={{ paddingBottom: 10 }}>
            <VirtualizedList
                horizontal={bool}
                renderItem={({ item }) => {
                    let searchval = search.toLowerCase().replace(/\s/, "")
                    let outval = (item.name).toLowerCase().replace(/\s/, "")
                    if (outval.includes(searchval)) {
                        return (
                            (item != undefined) ? <Item item={item} /> : null
                        )
                    }
                    // else {
                    //     return (
                    //         <Image style={{ height: 300, width: 300, position: "absolute", top: 10 }} source={{ uri: "https://media.tenor.com/unvXyxtdn3oAAAAC/no-result.gif" }} />
                    //     )
                    // }
                }}
                keyExtractor={item => item.id}
                data={data}
                getItem={getItem}

                getItemCount={data => data.length}
                initialNumToRender={3}
            />
        </View>
    )
}

export default ProTectedVirList
