import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import CustomInputText from './InputText';
import {RF, hp} from '../common/CommonFunctions';
import Colors from '../common/Colors';
import CustomCheckBox from './CustomCheckBox';
import Icon from './Icon';
import {useSelector, useDispatch} from 'react-redux';
import {setFilterData} from '../redux/Slice';

const FilterComponent = ({item}) => {
  const [open, setOpen] = useState(false);
  const filterData = useSelector(state => state.AllData.filterData);
  const dispatch = useDispatch();

  const calculateTotalAvailableRoom = value => {
    let totalRoom = 0;
    value?.map(item => {
      if (item?.isApplied === true) {
        totalRoom = totalRoom + 1;
      }
    });
    return totalRoom;
  };
  const onPressFilterSize = item1 => {
    let tmp = item?.data?.map(item2 => {
      if (item?.isMultiSelect === true) {
        return item2?.id === item1?.id
          ? {...item2, isApplied: !item2?.isApplied}
          : item2;
      } else {
        return item2?.id === item1?.id
          ? {...item2, isApplied: !item2?.isApplied}
          : {...item2, isApplied: false};
      }
    });
    let tmpRowData = filterData?.map(item1 => {
      return item1?.id === item?.id ? {...item1, data: tmp} : item1;
    });

    dispatch(setFilterData(tmpRowData));
  };

  const openFilter = () => {
    let tmp = filterData?.map(item2 => {
      return item?.id === item2?.id
        ? {...item2, isOpen: !item2?.isOpen}
        : item2;
    });
    dispatch(setFilterData(tmp));
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style.sizeContainer}
        onPress={() => onPressFilterSize(item)}>
        <CustomCheckBox check={item?.isApplied} />
        <Text style={style.labelFilter1}>{item?.value}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={openFilter} style={style.container1}>
        <Text style={style.label}>{`${item?.label}  (${
          item?.data?.length
        }/${calculateTotalAvailableRoom(item?.data)} )`}</Text>
        <Icon
          name={item?.isOpen ? 'chevrons-up' : 'chevrons-down'}
          size={hp(4)}
          color={Colors.GREY3}
          iconCommunity={'Feather'}
        />
      </TouchableOpacity>

      {item?.isOpen && (
        <View style={style.contentContainer}>
          <FlatList
            style={{flex: 1}}
            renderItem={renderItem}
            data={item?.data}
          />
        </View>
      )}
    </View>
  );
};

export default FilterComponent;

const style = StyleSheet.create({
  label: {
    fontSize: RF(1.9),
    color: Colors.BLACK,
    paddingVertical: hp(1.2),
    paddingLeft: hp(2),
  },
  sizeContainer: {
    flexDirection: 'row',
    marginVertical: hp(0.6),
  },
  labelFilter1: {
    marginHorizontal: hp(1),
    fontSize: RF(1.9),
    color: Colors.BLACK,
  },
  container: {
    backgroundColor: Colors.WHITE,
    elevation: hp(0.3),
    marginTop: hp(0.5),
    marginBottom: hp(2),
    marginHorizontal: hp(1),
    borderRadius: hp(1),
  },
  contentContainer: {
    marginHorizontal: hp(2),
    marginVertical: hp(2),
  },
  container1: {
    flexDirection: 'row',
    backgroundColor: Colors.GREY5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: hp(1),
    borderRadius: hp(1),
  },
});
