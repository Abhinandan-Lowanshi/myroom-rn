import react, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../common/Colors';
import {hp, RF} from '../common/CommonFunctions';

const CustomPicker = ({
  data,
  onItemChange,
  container,
  placeholder,
  outerContainer,
  labelTop,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[outerContainer, styles.outerContainer]}>
      {labelTop && <Text style={styles.topLabel}>{labelTop}</Text>}
      <View style={[styles.container, container]}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={400}
          itemTextStyle={styles.itemTextStyle}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            onItemChange(item);
            setIsFocus(false);
          }}
        />
      </View>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: hp(0.8),
    height: hp(6.5),
    elevation: 3,
    borderColor: Colors.GREY,
    borderRadius: hp(1),
    borderWidth: hp(0.2),
  },
  outerContainer: {},
  topLabel: {
    fontSize: RF(1.3),
    color: Colors.BLACK,
    marginLeft: hp(3),
    marginTop: hp(1),
    marginBottom: hp(0.5),
  },
  dropdown: {
    height: hp(5.2),
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: hp(2),
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: RF(1.1),
    color: Colors.BLACK,
  },
  placeholderStyle: {
    fontSize: RF(1.6),
    marginLeft: hp(1.5),
    color: Colors.BLACK,
  },
  selectedTextStyle: {
    fontSize: RF(1.6),
    color: Colors.BLACK,
    marginLeft: hp(1.5),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: hp(8),
    color: Colors.BLACK,
  },
  itemTextStyle: {
    color: Colors.BLACK,
  },
});
