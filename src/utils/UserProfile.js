import React, { useContext } from 'react'
import { View, PermissionsAndroid, Pressable } from 'react-native'
import { Text, Button, ThemeConsumer } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import axios from 'axios'
import userContext from '../Store/userContext'

const UserProfile = ({ setVisible }) => {
    const { setUserPhoto, userKey } = useContext(userContext)
    let options = {
        quality: 0.1,
        includeBase64: true,
        saveToPhotos: true,
        mediaType: 'photo',
    }
    // To store Image in mongodb 
    const setImage = async (uri) => {
        await axios.post("https://calm-ruby-leopard-ring.cyclic.app/update-profile", { uId: userKey, userImage: uri })
    }
    const openCamera = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await launchCamera(options)
            setImage(result?.assets[0]?.base64)
            setUserPhoto(result?.assets[0]?.base64)
        }
    }
    const openGallery = async () => {
        const result = await launchImageLibrary(options)
        // result.didCancel != true && setUserPhoto(result.assets[0].uri)
        setImage(result?.assets[0]?.base64)
        setUserPhoto(result?.assets[0]?.base64)
    }
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <>
                    <View style={theme.UserProfileStyles.mainContainer}>
                        <Text h4>Profile photo</Text>
                    </View>
                    <View style={theme.UserProfileStyles.buttonContainer}>
                        <Pressable testID='cameraBtn' style={theme.UserProfileStyles.pressableStyle} onPress={openCamera}>
                            <Icon name="camera" size={30} color="black" />
                            <Text>Camera</Text>
                        </Pressable>
                        <Pressable testID='galleryBtn' style={theme.UserProfileStyles.pressableStyle} onPress={openGallery}>
                            <Icon name="image" size={30} color="black" />
                            <Text>Gallery</Text>
                        </Pressable>
                    </View>
                    <Button testID='closeBtn' buttonStyle={theme.UserProfileStyles.btnContainer} title="Okay" onPress={() => setVisible(false)} />
                </>
            )}
        </ThemeConsumer>
    )
}

export default UserProfile

