// ** React Imports
import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS} from '../../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';

// ** Utils Imports

const TextField = ({
  placeholder,
  style,
  placeholderTextColor,
  onChange,
  onPress,
  source,
  value,
  isImage,
  isText,
  keyType,
  onBlur,
  secureTextEntry,
  disabled,
  defaultValue,
}) => {
  return (
    <View style={{...styles.subContainer}}>
      <TextInput
        style={[{...styles.input}, style]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChange}
        value={value}
        onBlur={onBlur}
        defaultValue={defaultValue}
        editable={disabled == false ? false : true}
        secureTextEntry={secureTextEntry}
        keyboardType={keyType === 'numeric' ? keyType : 'text'}
      />
      {isImage && (
        <TouchableOpacity onPress={onPress}>
          <Image
            source={source}
            style={{width: 25, height: 25, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      )}
      {isText && (
        <Text
          style={{
            color: COLORS.BLACK,
            fontSize: 16,
            fontFamily: FONTS.SEMI_BOLD,
          }}>
          in cm
        </Text>
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  input: {
    color: COLORS.LIGHT_BLACK,
    flex: 1,
    height: 50,
    fontFamily: FONTS.MEDIUM,
    fontSize: 16,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.OFF_WHITE,
    height: 50,
    color: COLORS.BLACK,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
    paddingHorizontal: 15,
  },
});
