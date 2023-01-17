import React from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../common/Colors';
const Custome_Image = props => {
  let [loadImage, setLoadImage] = React.useState(true);
  const [isBroken, setIsBroken] = React.useState(false);

  return (
    <View style={[props.container]}>
      <FastImage
        style={{flex: 1, borderRadius: 5}}
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
export default Custome_Image;
const style = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    elevation: 10,
    borderRadius: 5,
    margin: 10,
  },
});
