import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import CustomPicker from '../component/CustomPicker';
import CustomInputText from '../component/InputText';
import {hp, RF} from '../common/CommonFunctions';
import data from '../common/SpinnerData';
import StyleGlobel from '../Style/StyleGlobel';
import Colors from '../common/Colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import C_Button from '../component/C_Button';
import Stapper from '../component/Stapper';

const UploadFormSTP2 = () => {
  const [image, setImage] = React.useState([]);

  const openCamera = async () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      selectionLimit: 0,
    };
    await launchImageLibrary(options, response => {
      console.log(response.assets);
      let imageData = response.assets;
      let temp = [...image];
      imageData?.forEach(item => {
        if (!image.some(data => data.fileName === item.fileName))
          temp.push(item);
      });
      setImage(temp);
    });
  };
  const RemoveFile = data => {
    let temp = image.filter(item => {
      return item.fileName !== data.fileName;
    });
    setImage(temp);
  };
  const renderImges = () => {
    return (
      <FlatList
        data={image}
        renderItem={({item}) => {
          return (
            <View style={style.containerImage}>
              <Image source={{uri: item.uri}} style={style.imageStyle}></Image>
              <View style={style.imageContainer}>
                <Text style={{color: 'black', fontSize: 11}}>
                  {item.fileName}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => RemoveFile(item)}
                style={style.containerRemove}>
                <Text style={style.labelRemove}>Remove</Text>
              </TouchableOpacity>
            </View>
          );
        }}></FlatList>
    );
  };
  return (
    <View style={StyleGlobel.containerStyle}>
      <Stapper fromSTP1={false} />
      <TouchableOpacity
        onPress={() => openCamera()}
        style={style.uploadContainer}>
        <Text style={style.labelUpload}>Upload photos of the residence</Text>
        <Text style={style.labelLimit}>
          Note : Upload minimum 2 and maximum 9 photos.
        </Text>
      </TouchableOpacity>
      {renderImges()}
      <C_Button
        isLoading={false}
        // onPress={getOtp}
        // outerContainer={style.outerContainer}
        isSubmitDisabled={true}
        label={'Proceed'}
      />
    </View>
  );
};

export default UploadFormSTP2;

const style = StyleSheet.create({
  pickerstyle: {
    elevation: 5,
    // marginTop: hp(2.3),
  },
  labelLimit: {
    color: Colors.BLACK,
    fontSize: RF(1.2),
  },
  uploadContainer: {
    height: hp(10),
    marginHorizontal: hp(3),
    marginTop: hp(2),
    elevation: 5,
    backgroundColor: Colors.WHITE,
    borderRadius: hp(0.5),
    borderColor: Colors.GREY,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelUpload: {
    color: Colors.BLACK,
    fontSize: RF(2.2),
  },
  labelRemove: {
    color: 'red',
    fontSize: 13,
  },
  containerRemove: {
    marginRight: 10,
  },
  imageStyle: {
    width: 40,
    height: 40,
    marginLeft: 10,
    elevation: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  outerContainer: {
    marginTop: hp(1),
  },
  labelHouseNoMessage: {
    color: Colors.BLACK1,
    fontSize: RF(1.3),
    marginLeft: hp(3),
    marginTop: hp(1),
  },
  imageContainer: {
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  containerImage: {
    backgroundColor: Colors.WHITE,
    marginTop: 5,
    elevation: 10,
    paddingVertical: 5,
    marginHorizontal: hp(3),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 2,
  },
});
