import React, { useState, useEffect, useContext } from 'react'
import { View } from 'react-native'
import { ThemeConsumer, SearchBar } from 'react-native-elements'
import AppHeader from '../utils/AppHeader'
import ValueSlider from '../utils/ValueSlider'
import SpeechRecognition from '../utils/SpeechRecognition'
import FlatCardList from '../utils/Flat'
import userContext from '../Store/userContext'

const FilterRecipe = () => {
  const [value, setValue] = useState(25);
  const [search, setSearch] = useState("")
  const [recipes, setRecipies] = useState([])
  const { Data } = useContext(userContext)
  useEffect(() => {
    getTimeData()
  }, [value])
  const searchFunc = (e) => {
    setSearch(e)
  }
  const getTimeData = () => {
    const recipes = Data.filter((item) => ((item.time > 0) && (item.time < value)))
    setRecipies(recipes);
  }

  const onValueChange = (e) => {
    setValue(e);
  };
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <>
          <AppHeader name={"Filter Recipe"} />
          <View style={theme.HomeScreenStyles.container}>
            <View style={theme.HomeScreenStyles.searchContainer}>
              <SearchBar testID='searchBar' scrollEnabled placeholder="Search Recipes ..." onChangeText={searchFunc} value={search} round lightTheme containerStyle={theme.HomeScreenStyles.searchContainerStyle} inputContainerStyle={theme.CategoriesStyles.searchInpStyle} />
              <SpeechRecognition setContent={searchFunc} />
            </View>
            <ValueSlider value={value} setValue={onValueChange} />
            <View>
              <FlatCardList data={recipes} search={search} navigateTo={"RecipeDetails"} />
            </View>
          </View>
        </>
      )}
    </ThemeConsumer>
  )
}

export default FilterRecipe
