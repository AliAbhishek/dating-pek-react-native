import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import * as yup from 'yup';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import PhoneNumberInput from '../../components/PhoneNumberInput';
import {useDispatch} from 'react-redux';
import {registration} from '../../redux/slices/apiSlice';
import AuthContext from '../../context/AuthContext';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please Enter Name')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .email('Please Enter Valid Email')
    .required('Please Enter Email'),
  phoneNumber: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Please Enter a Valid Phone Number')
    .required('Please Enter Phone Number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(10, 'Phone number must be at most 10 digits'),
  password: yup
    .string()
    .required('Please Enter Password')
    .min(5, 'Password must be at least 5 characters'),
});

const Registration = ({navigation}) => {
  const dispatch = useDispatch();
  const [countryCode, setCountryCode] = useState('');
  const {checkToken} = useContext(AuthContext);

  const handleCountryCode = text => {
    setCountryCode(`+${text}`);
  };

  const onSubmit = data => {
    const formattedData = {
      ...data,
      countryCode: countryCode,
    };
    dispatch(registration(formattedData)).then(async res => {
      const status = res?.payload?.status;
      const userId = res?.payload?.data?._id;
      if (status == 200) {
        res?.payload?.status === 200 &&
          navigation.navigate(SCREEN_NAME.VERIFY_EMAIL, {
            email: data.email,
            id: userId,
          });
      } else {
        await checkToken();
      }
    });
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.mainContainer}>
          <Text style={styles.createAccount}>Create a new account</Text>
          <Text style={styles.heading}>
            Liquam euismod sem id eros pulvinar placerat. Maecenas congue
            consectetur nisl.
          </Text>
          <View style={{gap: 10, marginTop: 20}}>
            {/* <TextField
              placeholder={'Name'}
              placeholderTextColor={COLORS.LIGHT_BLACK}
            /> */}
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, onBlur, value}}) => (
                <TextField
                  placeholder={'Name'}
                  placeholderTextColor={COLORS.LIGHT_BLACK}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {/* <TextField
              placeholder={'Email'}
              placeholderTextColor={COLORS.LIGHT_BLACK}
            /> */}
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
            {/* <TextField
              placeholder={'Phone no.'}
              placeholderTextColor={COLORS.LIGHT_BLACK}
            /> */}
            <Controller
              control={control}
              name="phoneNumber"
              render={({field: {onChange, onBlur, value}}) => (
                // <TextField
                //   placeholder={'Phone no.'}
                //   placeholderTextColor={COLORS.LIGHT_BLACK}
                //   onChange={onChange}
                //   onBlur={onBlur}
                //   value={value}
                // />
                <PhoneNumberInput
                  placeholder={'Phone no.'}
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  handleCountryCode={handleCountryCode}
                />
              )}
            />
            {/* <TextField
              placeholder={'Password'}
              source={IMAGES.SHOW_PASSWORD}
              isImage={true}
              placeholderTextColor={COLORS.LIGHT_BLACK}
            /> */}
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <TextField
                  placeholder={'Password'}
                  placeholderTextColor={COLORS.LIGHT_BLACK}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            <Text style={styles.agreeText}>
              By signing up with Peek you are agree to our
              <Text style={styles.policyText}> Term & conditions </Text>
              or
              <Text style={styles.policyText}> Privacy policy.</Text>
            </Text>

            <Button
              // onPress={() => navigation.navigate(SCREEN_NAME.VERIFY_EMAIL)}
              onPress={handleSubmit(onSubmit, onError)}
              title={'Sign Up'}
              style={{marginTop: 20}}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.existingAccount}
          onPress={() => navigation.navigate(SCREEN_NAME.LOGIN)}>
          <Text style={styles.existingText}>Already have an account?</Text>
          <Text style={styles.loginText}> Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </Gradient>
  );
};

export default Registration;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  createAccount: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: COLORS.BLACK,
  },
  heading: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.LIGHT_BLACK,
    marginTop: 10,
  },
  existingAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  existingText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 14,
    color: COLORS.LIGHT_BLACK,
  },
  loginText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 14,
    color: COLORS.PRIMARY,
  },
  agreeText: {
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.LIGHT_BLACK,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  policyText: {
    fontSize: 14,
    fontFamily: FONTS.BOLD,
    color: COLORS.BLACK,
    textDecorationLine: 'underline',
  },
});
