import React from 'react';
import { View } from 'react-native'
import { ThemeConsumer, Text } from 'react-native-elements';
import Slider from '@react-native-community/slider';

const ValueSlider = ({ value, setValue }) => {

    return (
        <ThemeConsumer>
            {({ theme }) => (
                <View style={{ marginVertical: 10, padding: 10 }}>
                    <Text style={{ color: "black", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Filter by Time</Text>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Slider
                            style={theme.FlatStyles.slider}
                            minimumValue={0}
                            maximumValue={100}
                            step={5}
                            value={value}
                            onValueChange={setValue}
                            minimumTrackTintColor="#007AFF"
                            maximumTrackTintColor="#007AFF"
                            thumbTintColor="#007AFF"
                        />
                        <Text style={{ color: "black", fontSize: 14, fontWeight: 600, }}>Selected Range: 0 to {value}</Text>
                    </View>
                </View>
            )}
        </ThemeConsumer>
    );
};

export default ValueSlider