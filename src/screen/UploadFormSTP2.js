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
import {hp, RF} from '../common/CommonFunctions';
import StyleGlobel from '../Style/StyleGlobel';
import Colors from '../common/Colors';
import {launchImageLibrary} from 'react-native-image-picker';
import C_Button from '../component/C_Button';
import Stapper from '../component/Stapper';
import {uploadImage} from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import {useSelector, useDispatch} from 'react-redux';
import ScreenName from '../common/ScreenName';
import localStorageOp from '../localStorage/LocalData';
import LowOpacityLoader from '../component/LowOpacityLoader';
import Toast from 'react-native-simple-toast';

const UploadFormSTP2 = ({navigation}) => {
  const [image, setImage] = React.useState([]);
  const [loading, setIsLoading] = React.useState(false);
  const uploadData = useSelector(state => state.AllData.uploadData);

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

  const showToast = message => {
    Toast.show(message, Toast.LONG);
  };

  const renderImages = () => {
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

  const uploadRoom = async () => {
    setIsLoading(true);
    if (image.length > 2) {
      var userData = await localStorageOp(false, AsyncKeys.USERDATA, '');
      const formdata = new FormData();
      image.forEach(item => {
        formdata.append('Images', {
          uri: item?.uri,
          name: item?.fileName,
          type: item?.type,
        });
      });
      formdata.append('rm_usr_fkey', userData?.data?.usr_id);
      formdata.append('rm_own_Fullname', uploadData?.rm_own_Fullname);
      formdata.append('rm_own_mble_num', uploadData?.rm_own_mble_num);
      formdata.append('rm_furnisd_status', uploadData?.rm_furnisd_status);
      formdata.append('rm_availble', uploadData?.rm_availble);
      formdata.append('rm_prking_avblity', uploadData?.rm_prking_avblity);
      formdata.append('rm_depndecy', uploadData?.rm_depndecy);
      formdata.append('rm_colny', uploadData?.rm_colny);
      formdata.append('rm_house_no', uploadData?.rm_house_no);
      formdata.append('rm_city', uploadData?.rm_city);
      formdata.append('rm_state', uploadData?.rm_state);
      formdata.append('rm_size', uploadData?.rm_size);
      formdata.append('rm_rent', uploadData?.rm_rent);
      formdata.append('rm_flor', uploadData?.rm_flor);
      formdata.append('rm_latitude', '22.7149');
      formdata.append('rm_longitude', '75.8899');
      formdata.append('rm_description', uploadData?.rm_description);

      uploadImage(formdata, EndPoints.addRoom, 'POST')
        .then(response => {
          setIsLoading(false);
          showToast(response?.message);
          if (response.status === true) {
            navigation.navigate(ScreenName.Home);
            console.log(response, 'Response');
          } else {
            console.log(response, 'error');
          }
        })
        .catch(error => {
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={StyleGlobel.containerStyle}>
      {loading && <LowOpacityLoader />}
      <Stapper fromSTP1={false} />
      <TouchableOpacity
        onPress={() => openCamera()}
        style={style.uploadContainer}>
        <Text style={style.labelUpload}>Upload photos of the residence</Text>
        <Text style={style.labelLimit}>
          Note : Upload minimum 2 and maximum 9 photos.
        </Text>
      </TouchableOpacity>
      {renderImages()}
      <C_Button
        onPress={uploadRoom}
        isSubmitDisabled={false}
        label={'Proceed'}
      />
    </View>
  );
};

export default UploadFormSTP2;

const style = StyleSheet.create({
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
