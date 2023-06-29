import React from 'react'
import { ScrollView, View, Dimensions, Image, FlatList } from 'react-native'
import { Text, ThemeConsumer, Card } from 'react-native-elements'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AntDesign from "react-native-vector-icons/AntDesign"
import Videos from '../Sub Screens/Video'

const width = Dimensions.get("window").width

const RecepieDetails = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const params = route?.params?.item
    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View testID='receipeDetailsMainView' style={theme.RecipeDetailStyle.container}>
                        <View style={theme.RecipeDetailStyle.iconContainerStyle}>
                            <AntDesign testID='backIcon' name='arrowleft' color="white" size={30} onPress={() => navigation.goBack()} />
                            <Text testID='name' style={theme.RecipeDetailStyle.txt}>{params.name}</Text>
                        </View>
                        <View style={theme.RecipeDetailStyle.videoContainer}>
                            <Videos videoID={params.videoId} />
                        </View>
                        <ScrollView testID='rDScrollView' nestedScrollEnabled style={theme.RecipeDetailStyle.scrollContainer}>
                            <View style={theme.RecipeDetailStyle.headerContainerStyle}>
                                <View style={theme.RecipeDetailStyle.headTxtContainer}>
                                    <Icon name='dot-circle-o' size={20} color="green" />
                                    <Text style={theme.RecipeDetailStyle.txtHeadStyle}>{params.name}</Text>
                                </View>
                                <Text testID='cusine' style={theme.RecipeDetailStyle.txtBodyStyle}>Cusine: {params?.cusine}</Text>
                                <Text testID='timetoEat' style={theme.RecipeDetailStyle.txtBodyStyle}>{params?.timeToEat}</Text>
                                <View style={theme.RecipeDetailStyle.timeContainer}>
                                    <Icon name='clock-o' color={"#737575"} size={30} />
                                    <Text testID='time' style={theme.RecipeDetailStyle.txtSecondBodyStyle}>{params?.time} mins</Text>
                                </View>
                            </View>
                            <View>
                                <View style={theme.RecipeDetailStyle.mainTxt}>
                                    <Text style={theme.RecipeDetailStyle.nutrientText}>Nutrient Info</Text>
                                    <Text style={theme.RecipeDetailStyle.txtSecondBodyStyle}>(Per Serving)</Text>
                                </View>
                                <View style={theme.RecipeDetailStyle.buttonContainer}>
                                    <Text style={theme.RecipeDetailStyle.btnText}>Calories {params.nutrientInfo} kcal</Text>
                                </View>
                                <Text style={theme.RecipeDetailStyle.nutrientText}>Ingrdients - {params?.ingredients.length}</Text>
                                <View style={theme.RecipeDetailStyle.buttonContainer}>
                                    <Text style={theme.RecipeDetailStyle.btnText}>Quantity for {params.quantityForServe} Serving</Text>
                                </View>
                            </View>

                            <View style={theme.RecipeDetailStyle.flatContainer}>
                                <FlatList
                                    nestedScrollEnabled
                                    numColumns={2}
                                    data={params?.ingredients}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (

                                        <Card containerStyle={theme.FlatStyles.cardContainer}>
                                            <Card.Image source={{ uri: item?.image }} style={theme.FlatStyles.cardImageStyle} />
                                            <Card.FeaturedTitle style={theme.FlatStyles.cardTextStyle}>{item?.item}</Card.FeaturedTitle>
                                            <Card.Divider />
                                            <Card.FeaturedSubtitle style={theme.FlatStyles.cardTextStyle}>{item?.quantity}</Card.FeaturedSubtitle>
                                        </Card>
                                    )}
                                />
                            </View>
                        </ScrollView>
                    </View>
                )}
        </ThemeConsumer>
    )
}

export default RecepieDetails
