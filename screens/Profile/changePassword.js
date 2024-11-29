import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Gradient from '../../components/Gradient';
import AdvancedBackButton from '../../components/AdvancedBackButton';
import {COLORS} from '../../utils/Constants';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomAlert from '../../components/CustomAlert';
import AuthContext from '../../context/AuthContext';
import {updatePassword} from '../../redux/slices/apiSlice';
import {useDispatch} from 'react-redux';

const ChangePassword = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {token} = useContext(AuthContext);
  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      CustomAlert({message: 'New password and confirm password do not match.'});
      return;
    }
    if (!currentPassword || !newPassword || !confirmPassword) {
      CustomAlert({message: 'Please enter password'});
      return;
    }

    const data = {
      oldpassword: currentPassword,
      newpassword: newPassword,
    };

    dispatch(updatePassword({data, token})).then(res => {
      if (res?.payload?.status === 200) {
        setConfirmPassword('');
        setCurrentPassword('');
        setNewPassword('');
      }
    });
  };

  return (
    <Gradient colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}>
      <AdvancedBackButton
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          top: Platform.OS === 'ios' ? insets.top + 5 : 30,
        }}
        heading={'Change password'}
      />

      <View style={styles.mainContainer}>
        <View
          style={{
            gap: 5,
          }}>
          <TextField
            placeholder={'Current password'}
            placeholderTextColor={COLORS.LIGHT_BLACK}
            onChange={setCurrentPassword}
            value={currentPassword}
          />
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
        <Button
          onPress={handleUpdatePassword}
          title={'Update password'}
          style={{
            marginBottom: Platform.OS === 'android' && 20,
          }}
        />
      </View>
    </Gradient>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
    flex: 1,
    justifyContent: 'space-between',
  },
});
