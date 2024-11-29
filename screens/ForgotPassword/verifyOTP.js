import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import OTP from '../../components/OTP';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {resendOTP, verifyOTP} from '../../redux/slices/apiSlice';
import CustomAlert from '../../components/CustomAlert';
import {useDispatch} from 'react-redux';

const VerifyOTP = ({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [seconds, setSeconds] = useState(30);
  const {email, id} = route?.params;

  const [otp, setOtp] = useState('');
  const [isTimerStart, setIsTimerStart] = useState(true);

  const handleOTPChange = code => {
    setOtp(code);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerStart]);

  const handleResendOtp = () => {
    dispatch(resendOTP({data: {userId: id}})).then(res => {
      const status = res?.payload?.status;
      if (status === 200) {
        setIsTimerStart(!isTimerStart);
        setSeconds(30);
      }
    });
  };

  const handleVerify = () => {
    const formattedData = {
      userId: id,
      otp: Number(otp),
    };
    if (otp.length !== 4) {
      CustomAlert({message: 'Please Enter OTP'});
    } else {
      dispatch(verifyOTP(formattedData)).then(async res => {
        const status = res?.payload?.status;
        if (status === 200) {
          navigation.navigate(SCREEN_NAME.RESET_PASSWORD, {
            id: id,
          });
        }
      });
    }
  };

  return (
    <Gradient
      style={styles.linearGradient}
      colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}>
      <BackButton
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          top: Platform.OS === 'ios' ? insets.top + 5 : 30,
        }}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.forgotText}>OTP Verification</Text>
        <Text style={styles.otpGetText}>
          Please enter the 4 digit code sent to your registered email id
          <Text style={styles.emailText}> {email}.</Text>
        </Text>
        <OTP handleChange={handleOTPChange} containerStyle={{marginTop: 15}} />
        <Button
          title={'Verify'}
          onPress={handleVerify}
          style={{
            marginTop: 15,
          }}
        />
        {!seconds ? (
          <TouchableOpacity
            onPress={handleResendOtp}
            style={styles.resendCodeContainer}>
            <Text style={styles.resendCodeText}>Resend code</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.resendCodeContainer}>
            <Text style={styles.resendCodeIn}>
              Resend code in{' '}
              <Text style={styles.secondsText}>00:{seconds}</Text>
            </Text>
          </View>
        )}
      </View>
    </Gradient>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  forgotText: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: COLORS.BLACK,
  },
  otpGetText: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.LIGHT_BLACK,
    marginTop: 10,
  },
  emailText: {
    fontSize: 16,
    fontFamily: FONTS.BOLD,
    color: COLORS.LIGHT_BLACK,
  },
  resendCodeContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  resendCodeText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.BLACK,
  },
  resendCodeIn: {
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.BLACK,
  },
  secondsText: {
    fontSize: 14,
    fontFamily: FONTS.BOLD,
    color: COLORS.BLACK,
  },
});
