import React from 'react';
import {Alert} from 'react-native';

const CustomAlert = ({message}) => {
  Alert.alert('Peek', message, [{text: 'OK'}], {cancelable: false});
};

export default CustomAlert;
