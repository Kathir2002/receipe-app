import React, { useState, useContext } from 'react'
import { View, Image } from 'react-native'
import { SearchBar, ThemeConsumer, Text } from 'react-native-elements'
import AppHeader from '../utils/AppHeader'
import SpeechRecognition from '../utils/SpeechRecognition'
import FlatCardList from '../utils/Flat'
import userContext from '../Store/userContext'

const FavRecipe = () => {
    const { fav } = useContext(userContext)
    const [search, setSearch] = useState("")
    const searchFunc = (e) => {
        setSearch(e)
    }
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <>
                    <AppHeader name={"Favorite Recipe"} />
                    {
                        fav.length ? <View style={theme.HomeScreenStyles.container}>
                            <View style={theme.HomeScreenStyles.searchContainer}>
                                <SearchBar scrollEnabled placeholder="Search Recipes ..." onChangeText={searchFunc} value={search} round lightTheme containerStyle={theme.HomeScreenStyles.searchContainerStyle} inputContainerStyle={theme.CategoriesStyles.searchInpStyle} />
                                <SpeechRecognition setContent={searchFunc} />
                            </View>
                            <View>
                                <FlatCardList data={fav} search={search} navigateTo={"RecipeDetails"} />
                            </View>
                        </View> :
                            <View style={theme.HomeScreenStyles.container}>
                                <View style={theme.HomeScreenStyles.heartContainer}>
                                    <Image source={require("../assets/heart-break.jpg")} style={theme.HomeScreenStyles.heartImg} />
                                    <Text style={theme.HomeScreenStyles.heartTxt} h4>Add your Favorite Recipes here!</Text>
                                </View>
                            </View>
                    }
                </>
            )}
        </ThemeConsumer>
    )
}

export default FavRecipe

