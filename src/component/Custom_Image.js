import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../common/Colors';
import images from '../common/images';
const Custom_Image = props => {
  let [loadImage, setLoadImage] = React.useState(true);
  const [isBroken, setIsBroken] = React.useState(false);

  return (
    <View style={[style.container, props.container]}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover || props?.resizeMode}
        style={{flex: 1, borderRadius: 0} || props?.imageStyle}
        onLoadEnd={() => {
          setLoadImage(false);
        }}
        onError={() => {
          setIsBroken(true);
        }}
        onLoadStart={() => {}}
        source={
          props.uri ? {uri: props.uri} : images.imagePlaceHolder
        }></FastImage>
      {loadImage && (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size={'large'}
            color={Colors.PRIMARY}></ActivityIndicator>
        </View>
      )}
    </View>
  );
};
export default Custom_Image;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREY5,
  },
});
