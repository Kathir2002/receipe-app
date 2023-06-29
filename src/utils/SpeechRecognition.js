import React, { useState, useContext } from 'react';
import { View, LogBox } from 'react-native';
import Voice from '@react-native-community/voice';
import Icon from "react-native-vector-icons/Feather"

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs()
const SpeechRecognition = ({ setContent }) => {
    const [isListening, setIsListening] = useState(false);

    const handleSpeechResults = (result) => {
        const res = result?.value[0];
        setContent(res ?? '');
    }

    const startSpeechToText = async () => {
        setIsListening(true);
        try {
            await Voice.start('en-US');
        } catch (error) {
            console.error(error);
        }
    };

    const stopSpeechToText = async () => {
        setIsListening(false);
        try {
            await Voice.stop();
        } catch (error) {
            console.error(error);
        }
    };

    Voice.onSpeechResults = handleSpeechResults;

    return (
        <View testID='voiceView'>
            <Icon testID='voiceIcon' onPress={isListening ? stopSpeechToText : startSpeechToText} name={isListening ? "mic" : "mic-off"} size={30} color={"black"} />
        </View>
    );
};


export default SpeechRecognition;
