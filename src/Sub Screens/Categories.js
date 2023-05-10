import React, { useState } from 'react'
import { View, FlatList, Dimensions, ScrollView } from 'react-native'
import { Avatar, SearchBar, ThemeConsumer, Text } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SpeechRecognition from '../utils/SpeechRecognition'
import data from '../utils/data'
import AppHeader from '../utils/AppHeader'
import FlatCardList from "../utils/Flat"

const width = Dimensions.get("window").width
const Categories = () => {

    const [cusineData, setCusineData] = useState([
        {
            id: 1, cusine: "All Cusines", image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg", isSelected: true
        },
        {
            id: 2, cusine: "South Indian", image: "https://cdn.5280.com/2020/10/Thali-platter_Bawarchi-Biryani-Point-Denver-Facebook.jpg", isSelected: false
        },
        {
            id: 3, cusine: "North Indian", image: "https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/chitra-sendhil1453210035569e39b33b9db.jpeg", isSelected: false
        },
        {
            id: 4, cusine: "Thai", image: "https://www.foodandwine.com/thmb/r8fdcpapm4PFEzokDlMePDBmnwM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Why-Do-All-Thai-Restaurants-Feel-The-Same-FT-BLOG0123-c5531ddd6a8d4bb889956920d0c09be9.jpg", isSelected: false
        },
        {
            id: 5, cusine: "Chinese", image: "https://s3-ap-southeast-1.amazonaws.com/assets.limetray.com/assets/user_images/content_images/original/Honey%20chilli%20potato-new-op.webp", isSelected: false
        },
        {
            id: 6, cusine: "Italian", image: "https://c.ndtvimg.com/2021-04/umk8i7ko_pasta_625x300_01_April_21.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886", isSelected: false
        },
        {
            id: 7, cusine: "American", image: "https://www.thespruceeats.com/thmb/gwtKeNKbXW9zyHvymWGU6DjDEus=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-ultimate-cheeseburger-530744755-589cfb5b3df78c475878c4da.jpg", isSelected: false
        },
        {
            id: 8, cusine: "Japanese", image: "https://cdn.media.amplience.net/i/japancentre/Blog-page-156-sushi/Blog-page-156-sushi?$poi$&w=556&h=391&sm=c&fmt=auto", isSelected: false
        },
    ])

    const [search, setSearch] = useState("")
    const [isAllCusine, setIsAllCusine] = useState(false)
    const [selectedCusineData, setSelectedCusineData] = useState()
    const searchFunc = (e) => {
        setSearch(e)
    }

    const onSelectedCusineHandler = (item) => {
        let arr = [...cusineData]
        if (item.isSelected == false) {
            let index = arr.findIndex(i => i.isSelected == true)
            if (index > -1) {
                arr[index].isSelected = false
            }
            let find = arr.findIndex(i => i.id == item.id)
            arr[find].isSelected = true
        }
        setCusineData(arr)

        if (item.cusine === "All Cusines") {
            setIsAllCusine(true)
            setSelectedCusineData([...data])
        }
        else {
            let cusineData = data.filter(res => res.cusine === item.cusine)
            setIsAllCusine(false)
            setSelectedCusineData([...cusineData])
        }
    }

    const renderItem = ({ item }) => (
        <ThemeConsumer>
            {({ theme }) => (
                <TouchableOpacity activeOpacity={.5} style={theme.CategoriesStyles.listContainer} >
                    <Avatar source={{ uri: item.image }} size={80} containerStyle={[{ borderColor: item.isSelected ? 'green' : 'white' }, theme.CategoriesStyles.avatarContainer]} rounded onPress={() => onSelectedCusineHandler(item)} />
                    <Text>{item.cusine}</Text>
                </TouchableOpacity>
            )}
        </ThemeConsumer>
    )

    return (
        <ThemeConsumer>
            {({ theme }) => (
                <>
                    <AppHeader name={"All Receipes"} />
                    <View style={theme.CategoriesStyles.container}>
                        <View style={theme.CategoriesStyles.searchContainer}>
                            <SearchBar scrollEnabled placeholder="Search Recipes ..." onChangeText={searchFunc} value={search} round lightTheme containerStyle={theme.HomeScreenStyles.searchContainerStyle} inputContainerStyle={theme.CategoriesStyles.searchInpStyle} />
                            <SpeechRecognition setContent={searchFunc} />
                        </View>
                        <View>
                            <View>
                                <Text h4>Cusines</Text>
                            </View>
                            <View style={{ width: width, paddingRight: 5 }}>
                                <FlatList
                                    data={cusineData}
                                    numColumns={4}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={renderItem}
                                />
                            </View>
                        </View>
                        {selectedCusineData && <Text h4>{isAllCusine ? "All Cusines" : selectedCusineData[0]?.cusine}</Text>}

                        <ScrollView nestedScrollEnabled>
                            <View>
                                <FlatCardList search={search} data={selectedCusineData ? selectedCusineData : data} navigateTo={"RecipeDetails"} />
                            </View>
                        </ScrollView>
                    </View>
                </>
            )}
        </ThemeConsumer>
    )
}

export default Categories
