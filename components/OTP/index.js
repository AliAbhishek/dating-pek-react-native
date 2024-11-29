import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {COLORS} from '../../utils/Constants';

const OTP = ({otp, handleChange, containerStyle}) => {
  const otpInputRef = useRef(null);

  return (
    <View style={[styles.container, containerStyle]}>
      <OTPTextInput
        ref={otpInputRef}
        handleTextChange={handleChange}
        defaultValue={otp}
        textInputStyle={styles.otpInput}
        tintColor={COLORS.LIGHT_GREY}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    width: '100%',
  },
  otpInput: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
    backgroundColor: COLORS.OFF_WHITE,
    textAlign: 'center',
    borderRadius: 12,
    fontSize: 20,
  },
});

export default OTP;
