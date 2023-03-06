import React from 'react';
import {FlatList, Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';
const RenderRecentSearch = props => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style.containerLabel(item?.status)}
        onPress={() => props?.onPress(item)}>
        <Text style={style.label(item?.status)}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[style.container, props?.container]}>
      <Text style={style.labelRecent}>Recent searches </Text>
      <FlatList data={props?.data} renderItem={renderItem} horizontal={true} />
    </View>
  );
};
export default RenderRecentSearch;

const style = StyleSheet.create({
  container: {
    marginHorizontal: hp(2),
  },
  label: status => ({
    color: status ? Colors.WHITE : Colors.GREY2,
    padding: hp(0.6),
    fontSize: hp(1.45),
  }),
  containerLabel: status => ({
    borderWidth: hp(0.2),
    marginRight: hp(0.8),
    borderRadius: hp(0.7),
    borderColor: Colors.GREY1,
    backgroundColor: status ? Colors.PRIMARY : Colors.WHITE,
  }),
  labelRecent: {
    color: Colors.GREY2,
    marginBottom: hp(0.5),
  },
});
