import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../common/Colors';
const Custom_Image = props => {
  let [loadImage, setLoadImage] = React.useState(true);
  const [isBroken, setIsBroken] = React.useState(false);

  return (
    <View style={[style.container, props.container]}>
      <FastImage
        resizeMode={props?.resizeMode || FastImage.resizeMode.cover}
        style={props?.imageStyle || {flex: 1, borderRadius: 5}}
        onLoadEnd={() => {
          setLoadImage(false);
        }}
        onError={() => {
          setIsBroken(true);
        }}
        onLoadStart={() => {}}
        source={{
          uri: isBroken ? 'https://picsum.photos/id/237/200/300' : props.uri,
        }}></FastImage>
      {loadImage && (
        <ActivityIndicator
          size={'large'}
          style={{
            position: 'absolute',
            top: '50%',
            right: '50%',
          }}
          color={Colors.PRIMARY}></ActivityIndicator>
      )}
    </View>
  );
};
export default Custom_Image;
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
