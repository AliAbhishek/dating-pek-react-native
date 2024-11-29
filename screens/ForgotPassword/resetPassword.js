import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import CustomAlert from '../../components/CustomAlert';
import {resetPassword, updatePassword} from '../../redux/slices/apiSlice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const ResetPassword = ({route}) => {
  const {id} = route?.params;
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      CustomAlert({message: 'New password and confirm password do not match.'});
      return;
    }
    if (!newPassword || !confirmPassword) {
      CustomAlert({message: 'Please enter password'});
      return;
    }

    const data = {
      userId: id,
      password: newPassword,
    };
    dispatch(resetPassword(data)).then(res => {
      if (res?.payload?.status === 200) {
        setConfirmPassword('');
        setNewPassword('');
        navigation.navigate(SCREEN_NAME.LOGIN);
      }
    });
  };
  return (
    <Gradient colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}>
      <View style={styles.mainContainer}>
        <Text style={styles.createPwdText}>Reset password</Text>
        <Text style={styles.strongPwdText}>
          Please create a new and a strong password
        </Text>
        <View style={{gap: 10, marginVertical: 20}}>
          <TextField
            placeholder={'New password'}
            placeholderTextColor={COLORS.LIGHT_BLACK}
            onChange={setNewPassword}
            value={newPassword}
          />
          <TextField
            placeholder={'Confirm password'}
            placeholderTextColor={COLORS.LIGHT_BLACK}
            onChange={setConfirmPassword}
            value={confirmPassword}
          />
        </View>
        <Button onPress={handleUpdatePassword} title={'Update Password'} />
      </View>
    </Gradient>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  createPwdText: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: COLORS.BLACK,
  },
  strongPwdText: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.LIGHT_BLACK,
    marginTop: 10,
  },
});
