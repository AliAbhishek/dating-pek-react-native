import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {COLORS, FONTS} from '../utils/Constants';

const PhoneNumberInput = ({
  placeholder,
  onChange,
  value,
  onBlur,
  handleCountryCode,
  defaultValue,
}) => {
  const phoneInput = useRef(null);

  return (
    <PhoneInput
      ref={phoneInput}
      defaultCode="IN"
      defaultValue={defaultValue ? defaultValue : ''}
      layout="second"
      placeholder={placeholder}
      onChangeText={onChange}
      onChangeFormattedText={() =>
        handleCountryCode(phoneInput.current?.getCallingCode())
      }
      withDarkTheme={false}
      withShadow
      onBlur={onBlur}
      textContainerStyle={styles.textContainer}
      textInputStyle={{
        height: 50,
        fontFamily: FONTS.MEDIUM,
      }}
      containerStyle={styles.phoneInputContainer}
      codeTextStyle={{
        fontFamily: FONTS.MEDIUM,
        fontSize: 16,
        color: COLORS.BLACK,
      }}
    />
  );
};

const styles = StyleSheet.create({
  phoneInputContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: COLORS.LIGHT_GREY,
    borderWidth: 1,
    backgroundColor: COLORS.OFF_WHITE,
    width: '100%',
    borderRadius: 50,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.LIGHT_GREY,
    backgroundColor: 'transparent',
    height: 50,
    color: COLORS.BLACK,
    borderRadius: 50,
    paddingHorizontal: 15,
    width: '100%',
  },
});

export default PhoneNumberInput;
