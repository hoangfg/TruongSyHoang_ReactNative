import { Animated, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import SlideItem from './SlideItem';
import Pagination from './Pagination';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const ListBanner = ({ data }) => {
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleOnScroll = event => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
    };

    const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
        // console.log('viewableItems', viewableItems);
        setIndex(viewableItems[0].index);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    return (
        <View style={[styles.container, styles.pađingForBanner]}>
            <FlatList
                data={data}
                renderItem={({ item }) => <SlideItem item={item} />}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
            <Pagination data={data} scrollX={scrollX} index={index} />
        </View>
    );
};

export default ListBanner;

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT * 0.3,
        backgroundColor: "red"
    },

});


