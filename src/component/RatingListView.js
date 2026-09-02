import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import ReviewRow from './ReviewRow';
import Colors from '../common/Colors';
import {RF, hp} from '../common/CommonFunctions';

const RatingListView = ({
  data = [],
  isExpand = true,
  ListFooterComponent = () => {},
  styleRow,
}) => {
  const renderItem = ({item}) => {
    return <ReviewRow data={item} styleRow={styleRow} />;
  };
  return (
    <View style={style.container}>
      {isExpand && (
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: hp(1.5)}}
          data={data}
          renderItem={renderItem}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={() => (
            <Text
              style={{
                alignSelf: 'center',
                color: Colors.GREY4,
                fontSize: RF(1.8),
              }}>
              No reviews yet
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default RatingListView;

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.WHITE},
});
