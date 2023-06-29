import React, { useState, useContext } from 'react'
import { TouchableOpacity, View, ScrollView } from 'react-native'
import { SearchBar, Text, ThemeConsumer } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import VirList from '../../Sub Screens/VirtualisedList';
import SpeechRecognition from '../../utils/SpeechRecognition';
import Carosel from '../../utils/Carosel';
import userContext from '../../Store/userContext';

const HomeReceipeScreen = () => {

    const navigation = useNavigation()
    const [search, setSearch] = useState("")
    const { Data } = useContext(userContext)
    const searchFunc = (e) => {
        setSearch(e)
    }

    return (
        <ThemeConsumer>
            {({ theme }) => (
                <View testID='homeMainView' style={theme.HomeRecipeStyles.container}>
                    <View style={theme.HomeRecipeStyles.headerContainer}>
                        <SearchBar testID='searchBar' scrollEnabled placeholder="Search Recipes ..." onChangeText={searchFunc} value={search} round lightTheme containerStyle={theme.HomeScreenStyles.searchContainerStyle} inputContainerStyle={theme.CategoriesStyles.searchInpStyle} />
                        <SpeechRecognition setContent={searchFunc} />
                    </View>
                    <ScrollView testID='scroll'>
                        <View style={theme.HomeRecipeStyles.caroselContainer}>
                            {/* carosel file */}
                            <Carosel />
                        </View>
                        <View style={theme.HomeRecipeStyles.mainContainer}>
                            <View style={theme.HomeRecipeStyles.recentView}>
                                <Text style={theme.HomeScreenStyles.recentTxt}>Recently Added</Text>
                                <TouchableOpacity testID='loginArrowBtn' style={theme.HomeRecipeStyles.recentTextView} onPress={() => { navigation.navigate("LoginReq"), console.log("Inside button press") }}>
                                    <Text style={theme.HomeScreenStyles.exploreTxt}>Explore more </Text>
                                    <Icon name='arrow-circle-right' size={25} color="#e88a0e" />
                                </TouchableOpacity>
                            </View>
                            {/* Trending File */}
                            <VirList bool={true} data={Data} search={search} navigateTo={"LoginReq"} />
                            <View style={theme.HomeRecipeStyles.videoContainer}>
                                <Video
                                    testID='videoPlayer'
                                    source={{ uri: 'https://assets.mixkit.co/videos/preview/mixkit-cooking-asian-food-9286-large.mp4' }}
                                    style={theme.HomeScreenStyles.videoStyle}
                                    controls={false}
                                    paused={false}
                                    repeat={true}
                                />
                            </View>
                            <View style={theme.HomeRecipeStyles.recentView}>
                                <Text style={theme.HomeScreenStyles.recentTxt}>Instagram Reel Exclusives</Text>
                                <TouchableOpacity testID='loginReqBtn' style={theme.HomeRecipeStyles.recentTextView} onPress={() => navigation.navigate("LoginReq")}>
                                    <Text style={theme.HomeScreenStyles.exploreTxt}>Explore more </Text>
                                    <Icon name='arrow-circle-right' size={25} color="#e88a0e" />
                                </TouchableOpacity>
                            </View>
                            <VirList bool={true} search={search} navigateTo={"LoginReq"} />
                        </View>
                    </ScrollView>
                </View>
            )}
        </ThemeConsumer>
    )
}

export default HomeReceipeScreen
