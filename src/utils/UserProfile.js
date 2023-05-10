import React, { useContext } from 'react'
import { View, PermissionsAndroid, Pressable } from 'react-native'
import { Text, Button, ThemeConsumer } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import axios from 'axios'
import userContext from '../Store/userContext'

const UserProfile = ({ setCameraPhoto, setVisible }) => {
    const {userKey} = useContext(userContext)
    let options = {
        saveToPhotos: true,
        mediaType: 'photo',
    }

    const openCamera = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        )

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await launchCamera(options)
            setCameraPhoto(result.assets[0].uri)
            await axios.put(`https://chatapp-167bb-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userKey}/userProfilePhoto.json`, { photo: result.assets[0].uri })

        }
    }

    const openGallery = async () => {
        const result = await launchImageLibrary(options)
        result.didCancel != true && setCameraPhoto(result.assets[0].uri)
        await axios.put(`https://chatapp-167bb-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userKey}/userProfilePhoto.json`, { photo: result.assets[0].uri })
    }

    return (
        <ThemeConsumer>
            {({ theme }) => (
                <>
                    <View style={theme.UserProfileStyles.mainContainer}>
                        <Text h4>Profile photo</Text>
                    </View>
                    <View style={theme.UserProfileStyles.buttonContainer}>
                        <Pressable style={theme.UserProfileStyles.pressableStyle} onPress={openCamera}>
                            <Icon name="camera" size={30} color="black" />
                            <Text>Camera</Text>
                        </Pressable>
                        <Pressable style={theme.UserProfileStyles.pressableStyle} onPress={openGallery}>
                            <Icon name="image" size={30} color="black" />
                            <Text>Gallery</Text>
                        </Pressable>
                    </View>
                    <Button buttonStyle={theme.UserProfileStyles.btnContainer} title="Okay" onPress={() => setVisible(false)} />
                </>
            )}
        </ThemeConsumer>
    )
}

export default UserProfile

