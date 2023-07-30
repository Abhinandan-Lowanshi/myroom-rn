import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Feather from 'react-native-vector-icons/dist/Feather';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

const Icon = ({color, size, name, iconCommunity, style}) => {
  switch (iconCommunity) {
    case 'FontAwesome': {
      return (
        <FontAwesome color={color} size={size} name={name} style={style} />
      );
      break;
    }
    case 'MaterialCommunityIcons': {
      return (
        <MaterialCommunityIcons
          color={color}
          size={size}
          name={name}
          style={style}
        />
      );
      break;
    }
    case 'Feather': {
      return <Feather color={color} size={size} name={name} style={style} />;
      break;
    }
    case 'Entypo': {
      return <Entypo color={color} size={size} name={name} style={style} />;
      break;
    }
    case 'AntDesign': {
      return <AntDesign color={color} size={size} name={name} style={style} />;
      break;
    }
  }
};

export default Icon;
