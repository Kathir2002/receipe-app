import React, { useState } from 'react'
import { TouchableOpacity, View, ScrollView } from 'react-native'
import { SearchBar, Text, ThemeConsumer } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import VirList from '../../Sub Screens/VirtualisedList';
import SpeechRecognition from '../../utils/SpeechRecognition';
import Carosel from '../../utils/Carosel';
import data from '../../utils/data';

const HomeReceipeScreen = () => {

    const navigation = useNavigation()
    const [search, setSearch] = useState("")
    const searchFunc = (e) => {
        setSearch(e)
    }
    const onPressHandler = () => {
        navigation.navigate("Signin")
    }

    return (
        <ThemeConsumer>
            {({ theme }) => (
                <View style={theme.HomeRecipeStyles.container}>
                    <View style={theme.HomeRecipeStyles.headerContainer}>
                        <SearchBar scrollEnabled placeholder="Search Recipes ..." onChangeText={searchFunc} value={search} round lightTheme containerStyle={theme.HomeScreenStyles.searchContainerStyle} inputContainerStyle={theme.CategoriesStyles.searchInpStyle} />
                        <SpeechRecognition setContent={searchFunc} />
                    </View>
                    <ScrollView>
                        <View style={theme.HomeRecipeStyles.caroselContainer}>
                            {/* carosel file */}
                            <Carosel />
                        </View>
                        <View style={theme.HomeRecipeStyles.mainContainer}>
                            <View style={theme.HomeRecipeStyles.recentView}>
                                <Text style={theme.HomeScreenStyles.recentTxt}>Recently Added</Text>
                                <TouchableOpacity style={theme.HomeRecipeStyles.recentTextView} onPress={() => navigation.navigate("LoginReq")}>
                                    <Text style={theme.HomeScreenStyles.exploreTxt}>Explore more </Text>
                                    <Icon name='arrow-circle-right' size={25} color="#e88a0e" />
                                </TouchableOpacity>
                            </View>
                            {/* Trending File */}
                            <VirList bool={true} data={data} search={search} navigateTo={"LoginReq"} />
                            <View style={theme.HomeRecipeStyles.videoContainer}>
                                <Video
                                    source={{ uri: 'https://assets.mixkit.co/videos/preview/mixkit-cooking-asian-food-9286-large.mp4' }}
                                    style={theme.HomeScreenStyles.videoStyle}
                                    controls={false}
                                    paused={false}
                                    repeat={true}
                                />
                            </View>
                            <View style={theme.HomeRecipeStyles.recentView}>
                                <Text style={theme.HomeScreenStyles.recentTxt}>Instagram Reel Exclusives</Text>
                                <TouchableOpacity style={theme.HomeRecipeStyles.recentTextView} onPress={() => navigation.navigate("LoginReq")}>
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
