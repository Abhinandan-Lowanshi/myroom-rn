import React, {useEffect, useState, useCallback} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';
import Colors from '../common/Colors';
import {RF, hp} from '../common/CommonFunctions';
import Icon from './Icon';
import FilterComponent from './FilterComponent';
import {useSelector} from 'react-redux';
const RenderFilter = ({visible, onPressClose}) => {
  const filterData = useSelector(state => state.AllData.filterData);

  const renderItem = ({item}) => {
    console.log('item', item);
    return <FilterComponent item={item} />;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'slide'}
      style={{
        flex: 1,
      }}>
      <View style={styles.lowOpacity}></View>
      <View style={styles.container}>
        <View style={styles.containerClose}>
          <Text style={styles.labelFilter}>Filter</Text>
          <TouchableOpacity style={styles.close} onPress={onPressClose}>
            <Icon
              name={'close'}
              size={hp(3)}
              color={Colors.BLACK}
              iconCommunity={'MaterialCommunityIcons'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.scrollView}>
          <FlatList
            data={filterData}
            renderItem={renderItem}
            style={{flex: 1}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default RenderFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginHorizontal: hp(1),
    marginVertical: hp(2),
    borderRadius: hp(1),
  },
  lowOpacity: {
    backgroundColor: Colors.GREY2,
    width: '100%',
    height: '100%',
    opacity: 0.4,
    position: 'absolute',
  },
  close: {
    alignSelf: 'flex-end',
    marginVertical: hp(0.5),
  },
  scrollView: {
    flex: 1,
    marginHorizontal: hp(1),
    marginTop: hp(1),
    marginBottom: hp(1),
  },

  containerClose: {
    backgroundColor: Colors.GREY1,
    borderRadius: hp(1),
    alignItems: 'center',
    paddingRight: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelFilter: {
    fontSize: RF(2),
    color: Colors.BLACK,
    marginLeft: hp(2),
    fontWeight: '500',
  },
  containerSizeFlat: {
    borderWidth: hp(0.2),
    borderRadius: hp(0.8),
    borderColor: Colors.GREY1,
    paddingHorizontal: hp(1),
  },
  removeFilter: {
    position: 'absolute',
    right: hp(0),
    backgroundColor: Colors.RED,
    elevation: hp(0.2),
    borderRadius: hp(15),
    padding: hp(0.12),
  },
});
