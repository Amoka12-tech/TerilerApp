import React from 'react';
import { Dimensions, Image } from 'react-native';
import { View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export default function CarouselPage({ content, setActiveIndex, activeIndex }) {

    const _renderItems = ({item, index}) => {
        return(
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
                marginBottom: 20,
            }} key={index}>
                <Image source={item.image} />
            </View>
        );
    };
  return (
    <Carousel 
        layout={"default"}
        data={content}
        sliderWidth={SLIDER_WIDTH}
        sliderHeight={300}
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        renderItem={_renderItems}
        onSnapToItem={index => setActiveIndex(index)}
        slideStyle={{
            justifyContent: 'center',
            marginBottom: 40,
        }}
        showsHorizontalScrollIndicator={true}
    />
  );
}
