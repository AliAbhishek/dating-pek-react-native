import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import TextField from '../../components/TextField';
import {IMAGES} from '../../utils/Images';
import Button from '../../components/Button';
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/slices/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../context/AuthContext';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please Enter a Valid Email')
    .required('Please Enter Email'),
  password: yup
    .string()
    .required('Please Enter Password')
    .min(5, 'Password must be at least 5 characters'),
});

const Login = ({navigation}) => {
  const {height} = Dimensions.get('window');
  const dispatch = useDispatch();
  const {token, checkToken} = useContext(AuthContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const togglePasswordVisibility = () => {
    setSecureTextEntry(prevState => !prevState);
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(login(data)).then(async res => {
      const status = res?.payload?.status;
      const isProfileCompleted =
        res?.payload?.data?.updatedUser?.isProfileCompleted;
      if (status === 200 && isProfileCompleted === 1) {
        console.log('here');
        await AsyncStorage.setItem('isProfileCreated', 'true');
        await checkToken();
      } else {
        await checkToken();
      }
    });
  };

  // const onError = errors => {
  //   const errorMessages = Object.values(errors)
  //     .map(error => error.message)
  //     .join('\n');
  //   Alert.alert('Peek', errorMessages);
  // };

  const onError = errors => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      Alert.alert('Peek', errors[firstErrorKey].message);
    }
  };

  return (
    <Gradient
      style={styles.linearGradient}
      colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}>
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <Text
            style={{
              ...styles.heading,
              fontSize: RFValue(24, height),
            }}>
            Login to your account
          </Text>
          <Text style={styles.subHeading}>
            Enter your registered email id and password to access your account
            and matching.
          </Text>
          <View style={{gap: 10}}>
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, onBlur, value}}) => (
                <TextField
                  placeholder={'Email'}
                  placeholderTextColor={COLORS.LIGHT_BLACK}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <TextField
                  placeholder={'Password'}
                  source={
                    secureTextEntry
                      ? IMAGES.SHOW_PASSWORD
                      : IMAGES.HIDE_PASSWORD
                  }
                  isImage={true}
                  placeholderTextColor={COLORS.LIGHT_BLACK}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={secureTextEntry}
                  onPress={togglePasswordVisibility}
                />
              )}
            />

            {/* <TextField
              placeholder={'Email'}
              placeholderTextColor={COLORS.LIGHT_BLACK}
            />
            <TextField
              placeholder={'Password'}
              source={IMAGES.SHOW_PASSWORD}
              isImage={true}
              placeholderTextColor={COLORS.LIGHT_BLACK}
            /> */}
          </View>
          <Button title={'Login'} onPress={handleSubmit(onSubmit, onError)} />
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREEN_NAME.FORGOT_PASSWORD)}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.newAccountContainer}
          onPress={() => navigation.navigate(SCREEN_NAME.REGISTRATION)}>
          <Text style={styles.newAccount}>Don’t have an account?</Text>
          <Text style={styles.signUpText}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </Gradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
  },
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
