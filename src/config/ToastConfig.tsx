import React from 'react';
import {Text, View} from 'react-native';
import {BaseToastProps} from 'react-native-toast-message';

const commonStyle = {
  width: '92%',
  backgroundColor: '#fff',
  borderLeftWidth: 4,
  borderRadius: 10,
  justifyContent: 'center',
  paddingLeft: 12,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.4,
  shadowRadius: 5,
  elevation: 15,
};

const iconAndTitleStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
};

const titleStyle = {
  color: '#000',
  fontSize: 16,
  fontWeight: 700,
};

const textStyle = {
  color: '#000',
  fontSize: 14,
  fontWeight: 400,
};

export const toastConfig = {
  success: (props: BaseToastProps & any) => (
    <View
      {...props}
      style={[
        commonStyle,
        {
          height: props.text2 ? 60 : 50,
          borderLeftColor: '#2ECE23',
        },
      ]}>
      <View style={iconAndTitleStyle}>
        {/* {props.props.icon && <CheckCircleIcon color={'#2ECE23'} size={18} />} */}
        <Text style={titleStyle}>{props.text1}</Text>
      </View>
      {props.text2 && <Text style={textStyle}>{props.text2}</Text>}
    </View>
  ),
  error: (props: BaseToastProps & any) => (
    <View
      {...props}
      style={[
        commonStyle,
        {
          height: props.text2 ? 60 : 50,
          borderLeftColor: '#ce1c1c',
        },
      ]}>
      <View style={iconAndTitleStyle}>
        {/* {props.props.icon && <XCircleIcon color={'#ce1c1c'} size={18} />} */}
        <Text style={titleStyle}>{props.text1}</Text>
      </View>
      {props.text2 && <Text style={textStyle}>{props.text2}</Text>}
    </View>
  ),
};

// CUSTOM EXAMPLE:
// Toast.show({
//   type: 'custom',
//   text1: 'titulo',
//   text2: 'subtitulo',
//   props: {
//     icon: (
//       <FeatherIcons name="eye" color={theme.colors.gray3} size={22} />
//     ),
//     leftColor: theme.colors.black
//   },
// });
