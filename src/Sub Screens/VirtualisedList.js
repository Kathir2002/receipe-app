import React, { useContext } from 'react'
import { VirtualizedList, View, TouchableOpacity, TouchableWithoutFeedback, ToastAndroid } from 'react-native'
import { Card, ThemeConsumer } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome"
import { useNavigation } from '@react-navigation/native';
import userContext from '../Store/userContext';

const VirList = ({ search, navigateTo, bool }) => {
    const navigation = useNavigation()
    const { isAuth, setData, data, fav, setFav } = useContext(userContext)

    const getItem = (data, index) => {
        return data[index];
    };

    const heartChange = (item) => {
        if (item.fav == false) {
            item.fav = true
            setFav(prev => [...prev, item])
            ToastAndroid.showWithGravity("Added to Favourites", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        }
        else {
            item.fav = false
            let arr = [...fav]
            let i = arr.filter(i => i.id != item.id)
            setFav(i)
            ToastAndroid.showWithGravity("Removed from Favourites!", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        }
        let temp = []
        let ids = []
        fav.map((fi) => {
            ids.push(fi.id)
        })
        data.map((item) => {
            if (ids.includes(item.id)) {
                let index = fav.findIndex((ele) => (ele.id == item.id))
                temp.push(fav[index])
            }
            else {
                temp.push(item)
            }
        })
        setData([...temp])
    }
    const Item = ({ item }) => {
        return (
            <ThemeConsumer>
                {({ theme }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(navigateTo, { item })}>
                            <View>
                                {isAuth && <TouchableWithoutFeedback >
                                    <Icon style={{ position: "absolute", zIndex: 5, left: 175, top: 35 }} onPress={() => heartChange(item)} name='heart' size={25} color={item.fav ? "red" : "rgba(255,255,255,.9)"} />
                                </TouchableWithoutFeedback>
                                }
                                <Card containerStyle={theme.VirtualizedStyles.cardContainer}>
                                    <Card.Image source={{ uri: item.image }} style={theme.VirtualizedStyles.cardImageStyle} />
                                    <Card.FeaturedTitle style={theme.VirtualizedStyles.cardTextStyle}>{item.name}</Card.FeaturedTitle>
                                    <Card.Divider />
                                    <Card.FeaturedSubtitle style={theme.VirtualizedStyles.cardTextStyle}>Total Time: {item.time} mins</Card.FeaturedSubtitle>
                                </Card>
                            </View>
                        </TouchableOpacity>
                    )
                }
                }
            </ThemeConsumer >
        )
    }
    return (
        <View style={{ paddingBottom: 10, }}>
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

export default VirList
