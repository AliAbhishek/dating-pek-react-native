import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import TextField from '../../components/TextField';
import {IMAGES} from '../../utils/Images';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import CustomAlert from '../../components/CustomAlert';
import {useDispatch} from 'react-redux';
import {forgotPassword} from '../../redux/slices/apiSlice';

const ForgotPassword = ({navigation}) => {
  const {height} = Dimensions.get('window');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const handleResetPassword = async () => {
    if (!email) {
      CustomAlert({message: 'Please enter email'});
    } else {
      const result = await dispatch(forgotPassword({email}));
      if (result.payload.status === 200) {
        navigation.navigate(SCREEN_NAME.VERIFY_OTP, {
          email: result.payload.data.email,
          id: result.payload.data._id,
        });
      }
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
        <View style={styles.subContainer}>
          <Text
            style={{
              ...styles.heading,
              fontSize: RFValue(24, height),
            }}>
            Forgot Password
          </Text>
          <Text style={styles.subHeading}>
            Please enter your registered email address
          </Text>
          <View style={{gap: 10}}>
            <TextField
              placeholder={'Email'}
              placeholderTextColor={COLORS.LIGHT_BLACK}
              onChange={setEmail}
              value={email.toLowerCase()}
            />
            <Button title={'Submit'} onPress={handleResetPassword} />
          </View>
        </View>
      </View>
    </Gradient>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 40,
    paddingBottom: 20,
  },
  heading: {
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
  },
  subHeading: {
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
  },
  subContainer: {
    justifyContent: 'flex-end',
    gap: 20,
  },
  forgotText: {
    color: COLORS.BLACK,
    fontFamily: FONTS.SEMI_BOLD,
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  newAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  newAccount: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 14,
    color: COLORS.LIGHT_BLACK,
  },
  signUpText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 14,
    color: COLORS.PRIMARY,
  },
});
