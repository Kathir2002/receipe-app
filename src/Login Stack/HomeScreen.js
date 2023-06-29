import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, View, ScrollView } from 'react-native'
import { SearchBar, Text, ThemeConsumer } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../utils/AppHeader';
import SpeechRecognition from '../utils/SpeechRecognition';
import VirList from '../Sub Screens/VirtualisedList';
import Carosel from '../utils/Carosel';

const HomeReceipeScreen = () => {
    const navigation = useNavigation()
    const [search, setSearch] = useState("")

    const searchFunc = (e) => {
        setSearch(e)
    }

    return (
        <ThemeConsumer>
            {({ theme }) => (
                <>
                    <AppHeader name={"Home"} />
                    <View testID='homeScreenMainView' style={theme.HomeScreenStyles.container}>
                        <View style={theme.HomeScreenStyles.searchContainer}>
                            <SearchBar testID='searchBar' scrollEnabled placeholder="Search Recipes ..." onChangeText={searchFunc} value={search} round lightTheme containerStyle={theme.HomeScreenStyles.searchContainerStyle} inputContainerStyle={theme.CategoriesStyles.searchInpStyle} />
                            <SpeechRecognition setContent={searchFunc} />
                        </View>
                        <ScrollView testID='scrollPointView'>
                            <View style={theme.HomeScreenStyles.caroselContainer}>
                                {/* carosel file */}
                                <Carosel />
                            </View>
                            <View style={theme.HomeScreenStyles.mainContainer}>
                                <View style={theme.HomeScreenStyles.recentView}>
                                    <Text style={theme.HomeScreenStyles.recentTxt}>Recently Added</Text>
                                    <TouchableOpacity testID='exploreText' onPress={() => navigation.navigate("Categories")} style={theme.HomeScreenStyles.recentTextView}>
                                        <Text style={theme.HomeScreenStyles.exploreTxt}>Explore more </Text>
                                        <Icon name='arrow-circle-right' size={25} color="#e88a0e" />
                                    </TouchableOpacity>
                                </View>
                                {/* Virtualized list File */}
                                <VirList bool={true} navigateTo={"RecipeDetails"} search={search} />
                                <View style={theme.HomeScreenStyles.videoContainer}>
                                    <Video
                                        source={{ uri: 'https://assets.mixkit.co/videos/preview/mixkit-cooking-asian-food-9286-large.mp4' }}
                                        style={theme.HomeScreenStyles.videoStyle}
                                        controls={false}
                                        paused={false}
                                        repeat={true}
                                    />
                                </View>
                                <View style={theme.HomeScreenStyles.recentView}>
                                    <Text style={theme.HomeScreenStyles.recentTxt}>Instagram Reel Exclusives</Text>
                                    <TouchableOpacity testID='categories' onPress={() => navigation.navigate("Categories")} style={theme.HomeScreenStyles.recentTextView}>
                                        <Text style={theme.HomeScreenStyles.exploreTxt}>Explore more </Text>
                                        <Icon name='arrow-circle-right' size={25} color="#e88a0e" />
                                    </TouchableOpacity>
                                </View>
                                {/* Virtualized list File */}
                                <VirList bool={true} navigateTo={"RecipeDetails"} search={search} />
                            </View>
                        </ScrollView>
                    </View>
                </>
            )}
        </ThemeConsumer>
    )
}

export default HomeReceipeScreen
