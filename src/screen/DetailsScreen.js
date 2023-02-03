import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import FullScreenLoader from '../component/FullScreenLoader';
import {useSelector, useDispatch} from 'react-redux';
import StyleGlobel from '../Style/StyleGlobel';
import Custome_Image from '../component/Custome_Image';
import Header from '../component/Header';
import Icon from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {RF, hp} from '../common/CommonFunctions';
import labels from '../common/labels';
import Labels from '../common/labels';
import IconName from '../common/IconName';
import Colors from '../common/Colors';
import ImageScaleType from '../common/ImageScaleType';
const DetailsScreen = props => {
  const {navigation} = props;
  const [like, setLike] = useState(false);
  const [imageData, setImageData] = useState({});
  const [visible, setVisible] = useState(false);
  const propData = props?.route?.params?.item;
  const onPressFav = props?.route?.params?.onPressFav;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  useEffect(() => {
    setLike(propData?.favorite_key);
  }, []);

  // const prePareImageData = data => {
  //   let temp = [];
  //   data.map(item => {
  //     let ob = {
  //       img: item.img_name,
  //     };
  //     temp.push(ob);
  //   });
  //   setImageData(temp);
  // };

  const ShowFullImage = () => {
    return (
      <Modal
        // transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <Custome_Image
          resizeMode={ImageScaleType.contain}
          uri={imageData?.img_name}
          container={{width: '100%', height: '97%', borderRadius: hp(2)}}
        />
        <IconButton_MaterialCommunityIcons
          onPress={() => {
            setVisible(false);
          }}
          iconContainer={{position: 'absolute', right: hp(2), top: hp(1)}}
          fValue={IconName?.close}
        />
      </Modal>
    );
  };

  const ShareLayout = () => {
    return (
      <View style={style.containeshare}>
        <IconButton_MaterialCommunityIcons
          iconContainer={style.iconeShareContainer}
          fValue={IconName?.googlemaps}
          iconColor={Colors.GREEN1}
        />
        <IconButton_MaterialCommunityIcons
          iconContainer={style.iconeShareContainer}
          fValue={IconName?.whatsapp}
          iconColor={Colors.GREEN2}
        />
        <IconButton_MaterialCommunityIcons
          iconContainer={style.iconeShareContainer}
          fValue={IconName?.share}
        />
      </View>
    );
  };

  const ContentHeader = props => {
    return (
      <View style={[style.headerContainer, props.headerContainer]}>
        <Text style={style.labelOwnerInfo}>{props?.label}</Text>
      </View>
    );
  };
  const renderImages = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setVisible(true);
          setImageData(item);
        }}>
        <Custome_Image
          uri={item?.img_name}
          container={style.image(windowWidth)}
        />
      </TouchableOpacity>
    );
  };

  const SpecificationDetails = props => {
    return (
      <View style={style.containerInside}>
        <Text style={style.labelSt}>{props?.label}</Text>
        <Text style={style.labelANS}>{props?.labelAns}</Text>
      </View>
    );
  };

  const IconButton_Entypo = props => {
    return (
      <TouchableOpacity
        style={[style.iconContainer, props?.iconContainer]}
        onPress={props?.onPress}>
        <Icon
          name={props?.value ? props?.tValue : props.fValue}
          size={props?.iconSize || hp(3)}
          color={props?.iconColor || Colors.RED}
        />
      </TouchableOpacity>
    );
  };
  const IconButton_MaterialCommunityIcons = props => {
    return (
      <TouchableOpacity
        style={[style.iconContainer, props?.iconContainer]}
        onPress={props?.onPress}>
        <MaterialCommunityIcons
          name={props?.value ? props?.tValue : props.fValue}
          size={props?.iconSize || hp(5)}
          color={props?.iconColor || Colors.RED}
        />
      </TouchableOpacity>
    );
  };
  const ownerDetails = () => {
    return (
      <View style={style.ownerView}>
        <Image
          style={style.ownerImage}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
          }}></Image>
        <View style={style.ownernameContainer}>
          <Text style={style.labelName}>{propData?.rm_own_Fullname}</Text>
          <Text style={style.labelmoble}>{propData?.rm_own_Fullname}</Text>
        </View>
        <View style={style.containerContact}>
          <IconButton_Entypo
            fValue={IconName?.message}
            iconColor={Colors.BLUE2}
          />
          <IconButton_Entypo
            fValue={IconName?.phone}
            iconColor={Colors.GREEN1}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={StyleGlobel.containerStyle}>
      <ShowFullImage />
      <Header label={Labels?.Details} navigation={navigation} />
      <ScrollView style={{opacity: visible ? 0.2 : 1}}>
        <FlatList
          horizontal={true}
          data={propData?.images}
          renderItem={renderImages}
        />
        <View style={style.contanetConatiner}>
          <View style={style.addressView}>
            <View style={style.addressContainer}>
              <Text style={style.sizelabel}>{propData?.rm_size}</Text>
              <Text style={style.labelAddress}>
                {`${propData?.rm_house_no},${propData?.rm_colny}, ${propData?.rm_city}`}
              </Text>
            </View>
            {props?.route?.params?.isFrom === 'MyPost' ? null : (
              <IconButton_Entypo
                value={like}
                tValue={IconName?.heartActive}
                fValue={IconName?.heartDeActive}
                isLike={true}
                onPress={() => {
                  setLike(!like);
                  onPressFav({roomId: propData?.rm_pkey, like: !like}).then(
                    res => {
                      if (res === false) {
                        setLike(like);
                      }
                    },
                  );
                }}
              />
            )}
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <ContentHeader
              label={labels.ListingAgent}
              headerContainer={{marginTop: 0}}
            />
            <Text style={style.labelRent}>{`\u20B9${propData?.rm_rent}`}</Text>
          </View>

          {ownerDetails()}
          <ContentHeader label={labels.Specification} />
          <View style={style.contantConatainer2}>
            <SpecificationDetails
              label={labels?.Availablefor}
              labelAns={propData?.rm_availble}
            />
            <SpecificationDetails
              label={labels?.ParkingAvailability}
              labelAns={propData?.rm_prking_avblity}
            />
            <SpecificationDetails
              label={labels?.WhichFloor}
              labelAns={propData?.rm_flor}
            />
            <SpecificationDetails
              label={labels?.Dependency}
              labelAns={propData?.rm_depndecy}
            />
            <SpecificationDetails
              label={labels?.Furnished}
              labelAns={propData?.rm_furnisd_status}
            />
          </View>
          <ContentHeader label={labels?.Description} />
          <Text style={style.labelDiscription}>{propData?.rm_description}</Text>
          <ShareLayout />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
const style = StyleSheet.create({
  headerContainer: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.BLUE1,
    marginTop: hp(5),
    paddingHorizontal: hp(2),
    borderRadius: hp(0.5),
    paddingVertical: hp(0.2),
    elevation: hp(0.5),
  },
  iconContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: hp(1),
    marginHorizontal: hp(1),
    borderRadius: hp(90),
    height: hp(5),
    width: hp(5),
  },

  labelDiscription: {
    color: Colors.GREY2,
    marginTop: hp(1),
    fontWeight: '600',
    fontSize: RF(2),
  },
  containerInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelSt: {
    fontWeight: '600',
    marginLeft: hp(0.8),
    fontSize: RF(1.8),
    color: Colors.BLACK,
  },
  labelANS: {
    color: Colors.GREY2,
    marginLeft: hp(0),
    fontSize: RF(1.8),
    fontWeight: '600',
    marginRight: hp(1.5),
  },

  contantConatainer2: {
    marginTop: 5,
    marginHorizontal: 10,
  },
  contanetConatiner: {
    marginHorizontal: hp(2),
  },
  containerContact: {
    flexDirection: 'row',
  },
  ownernameContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: hp(1.3),
  },
  image: width => ({
    height: hp(60),
    width: width,
  }),
  addressView: {
    flexDirection: 'row',
    marginTop: hp(2),
  },
  sizelabel: {
    color: Colors.BLACK,
    fontSize: RF(3),
    fontWeight: '700',
  },
  labelAddress: {
    color: Colors.GREY2,
    fontSize: hp(2.2),
    fontWeight: '600',
  },
  addressContainer: {
    flex: 1,
  },
  labelOwnerInfo: {
    fontSize: RF(2),
    color: Colors.WHITE,
    fontWeight: '600',
  },
  ownerView: {
    flexDirection: 'row',
    marginTop: hp(1.5),
  },
  ownerImage: {
    height: hp(8),
    width: hp(8),
    borderRadius: hp(90),
  },
  labelName: {
    color: Colors.BLACK,
    fontWeight: '600',
    fontSize: RF(2.2),
  },
  labelmoble: {
    color: Colors.GREY2,
    fontWeight: '600',
    marginTop: hp(0.2),
  },
  containeshare: {
    flexDirection: 'row',
    backgroundColor: Colors.GREY,
    marginBottom: hp(10),
    marginTop: hp(4),
    borderRadius: hp(1.5),
    // elevation: 10,
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
  },
  iconeShareContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    elevation: hp(1),
    marginHorizontal: hp(2),
    borderRadius: hp(90),
    height: hp(7.2),
    width: hp(7.2),
    marginVertical: hp(1.5),
  },
  labelRent: {
    fontSize: RF(2.5),
    color: Colors.GREEN1,
    fontWeight: '700',
  },
});
