import React from 'react';
import {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import images from '../../common/images';
import {hp} from '../../common/CommonFunctions';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import Colors from '../../common/Colors';
const SliderView = props => {
  const [data, setData] = useState([
    {
      id: 1,
      image: images.intro,
    },
    {
      id: 2,
      image: images.search,
    },
    {
      id: 3,
      image: images.upload,
    },
  ]);
  const windowWidth = Dimensions.get('window').width;
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatlistRef = useRef();

  const renderItem = ({item, index}) => {
    return (
      <View style={style.itemContainer(windowWidth)}>
        <Image source={item?.image} style={style.image} resizeMode="stretch" />
        {index !== 0 && index === 2 && (
          <TouchableOpacity
            style={style.buttonUpload}
            onPress={props?.onPresUpload}>
            <Text style={style.labelButton}>Click to upload</Text>
          </TouchableOpacity>
        )}
        {index !== 0 && index === 1 && (
          <TouchableOpacity
            style={style.buttonSearch}
            onPress={props?.onPresSearch}>
            <Text style={style.labelButton}>Click to search</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <View style={style.container}>
      <FlatList
        ref={flatlistRef}
        data={data}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        pagingEnabled
        decelerationRate={'normal'}
        scrollEventThrottle={16}
      />
      <ExpandingDot
        data={data}
        expandingDotWidth={30}
        scrollX={scrollX}
        inActiveDotOpacity={0.6}
        dotStyle={{
          width: 10,
          height: 10,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginHorizontal: 5,
        }}
        activeDotColor={Colors.PRIMARY}
        inActiveDotColor={Colors.PRIMARYLITE}
        containerStyle={{
          position: 'absolute',
          bottom: hp(-3),
        }}
      />
    </View>
  );
};

export default SliderView;

const style = StyleSheet.create({
  container: {
    borderWidth: hp(0.2),
    borderColor: Colors.GREY1,
    marginTop: hp(0.1),
    height: hp(17),
  },
  itemContainer: windowWidth => ({width: windowWidth}),
  image: {
    height: hp(17),
    width: '100%',
  },
  buttonUpload: {
    position: 'absolute',
    backgroundColor: Colors.PRIMARY,
    borderRadius: hp(0.5),
    bottom: hp(2),
    left: hp(2),
  },
  buttonSearch: {
    position: 'absolute',
    backgroundColor: Colors.PRIMARY,
    borderRadius: hp(0.5),
    bottom: hp(2),
    right: hp(2),
  },
  labelButton: {
    color: Colors.WHITE,
    marginHorizontal: hp(1),
    marginVertical: hp(0.5),
  },
});
