import react from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomPicker from '../component/CustomPicker';
import CustomInputText from '../component/InputText';
import {hp} from '../common/CommonFunctions';
import StyleGlobel from '../Style/StyleGlobel';
const Upload = () => {
  const onItemChange = value => {};
  return (
    <View style={StyleGlobel.containerStyle}>
      <CustomInputText
        outerContainer={style.outerContainer}
        error={false}
        placeholder={'Enter Name'}
        errorMessage={'Invalid Name'}
      />
      <CustomInputText
        // outerContainer={style.outerContainerSocial}
        error={false}
        placeholder={'Enter Name'}
        errorMessage={'Invalid Name'}
      />

      <CustomPicker
        container={style.pickerstyle}
        label={'Available for'}
        onItemChange={onItemChange}
        data={[
          {label: 'Item 1', value: '1'},
          {label: 'Item 2', value: '2'},
          {label: 'Item 3', value: '3'},
          {label: 'Item 4', value: '4'},
          {label: 'Item 5', value: '5'},
          {label: 'Item 6', value: '6'},
          {label: 'Item 7', value: '7'},
          {label: 'Item 8', value: '8'},
        ]}></CustomPicker>
    </View>
  );
};

export default Upload;

const style = StyleSheet.create({
  pickerstyle: {
    elevation: 5,
    marginTop: hp(2.3),
  },
  outerContainer: {
    marginTop: hp(1),
  },
});
