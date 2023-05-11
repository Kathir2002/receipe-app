import React, { useEffect, useState, useContext } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Avatar, ThemeConsumer } from 'react-native-elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons"
import LoginHomeRecipeScreen from '../Login Stack/HomeScreen';
import Categories from '../Sub Screens/Categories';
import Settings from '../Login Stack/Settings';
import userContext from '../Store/userContext';
import FilterRecipe from '../Login Stack/FilerRecipe';
import FavRecipe from '../Login Stack/FavRecipe';

function CustomDrawerContent({ state }) {

  const navigation = useNavigation()
  const { userPhoto, setUserPhoto, setUserKey } = useContext(userContext)
  useEffect(() => {
    getProfilePhoto()
  }, [userPhoto])

  const getProfilePhoto = async () => {
    try {
      // const key = await axios.get("https://chatapp-167bb-default-rtdb.asia-southeast1.firebasedatabase.app/temp.json")
      let key1 = await AsyncStorage.getItem("userKey")
      // let dataKey = Object.values(key.data)[0]
      // let key1 = dataKey.key
      let key = JSON.parse(key1)
      setUserKey(key)
      const res = await axios.get(`https://chatapp-167bb-default-rtdb.asia-southeast1.firebasedatabase.app/users/${key}.json`);
      setUserPhoto(res.data.userProfilePhoto.photo);
    }
    catch (Err) {
      console.log(Err);
    }
  }

  const activeRouteIndex = state.index;
  const menuItems = [
    { label: 'Home', screen: 'LoginHome', icon: "home-outline" },
    { label: 'All Recipes', screen: 'Categories', icon: "ios-fast-food-outline" },
    { label: 'Filter Recipe', screen: 'FilterRecipe', icon: "md-filter-sharp" },
    { label: 'Favorites', screen: 'FavoriteRecipe', icon: "heart-outline" },
    { label: 'Settings', screen: 'Settings', icon: "settings-outline" },
  ];
  const getMenuItemStyle = (index) => {
    return index === activeRouteIndex
      ? { backgroundColor: '#e1dee3', paddingHorizontal: 30, paddingVertical: 5, width: "90%", borderBottomColor: "black", borderBottomWidth: .51, flexDirection: "row", alignItems: "center" }
      : { backgroundColor: '#FFFFFF', paddingHorizontal: 30, paddingVertical: 5, width: "90%", borderBottomColor: "black", borderBottomWidth: .51, flexDirection: "row", alignItems: "center" };
  };

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View style={theme.DrawerStyles.container}>
          <Avatar containerStyle={theme.DrawerStyles.img} source={{ uri: `data:image/png;base64,${userPhoto}` }} rounded size={80} />
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.screen}
              onPress={() => navigation.navigate(item.screen)}
              style={getMenuItemStyle(index)}
            >
              <Icon name={item.icon} size={25} color={"black"} />
              <Text style={theme.DrawerStyles.drawerTxt}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ThemeConsumer>
  );
}

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, activeTintColor: '#FF0000', inactiveTintColor: '#000000' }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="LoginHome" component={LoginHomeRecipeScreen} />
      <Drawer.Screen name="Categories" component={Categories} />
      <Drawer.Screen name="FilterRecipe" component={FilterRecipe} />
      <Drawer.Screen name="FavoriteRecipe" component={FavRecipe} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

export default DrawerScreen;
