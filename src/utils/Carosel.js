import { Dimensions, Image, View } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import Carousel from 'react-native-reanimated-carousel';

const Carosel = () => {
    const data = [{
        src: require("../assets/carosel-1.jpg")
    },
    {
        src: require("../assets/carosel-2.jpeg")
    },
    {
        src: require("../assets/carosel-3.jpg")
    }
    ]
    const renderItem = ({ item }) => {
        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <View style={theme.CaroselStyle.caroselStyle}>
                        <Image source={item.src} style={theme.CaroselStyle.caroselImgStyle} />
                    </View>
                )}
            </ThemeConsumer>
        )
    }
    const width = Dimensions.get('window').width;
    return (
        <Carousel
            testID='carosel'
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={data}
            scrollAnimationDuration={1000}
            renderItem={renderItem}
        />
    );
}
export default Carosel
