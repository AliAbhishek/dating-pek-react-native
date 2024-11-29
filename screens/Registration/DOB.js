import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../components/BackButton';
import Gradient from '../../components/Gradient';
import {FONTS, COLORS, SCREEN_NAME} from '../../utils/Constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RNCalendar from '../../components/Calendar';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {setDob} from '../../redux/slices/registerFormSlice';
import CustomAlert from '../../components/CustomAlert';

const DOB = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [DOB, setDOB] = useState('');
  const dispatch = useDispatch();

  const handleNext = () => {
    if (DOB) {
      dispatch(setDob(DOB));
      navigation.navigate(SCREEN_NAME.HEIGHT);
    } else {
      CustomAlert({message: 'Please Select Date of Birth'});
    }
  };

  return (
    <Gradient colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}>
      <BackButton
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          top: Platform.OS === 'ios' ? insets.top + 5 : 30,
        }}
        currentSignUpStep={2}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>How old are you?</Text>
        <RNCalendar
          selected={DOB}
          setSelected={setDOB}
          style={{marginTop: 15}}
        />
      </View>
      <Button
        onPress={handleNext}
        style={{
          paddingBottom: Platform.OS === 'android' && 20,
          paddingHorizontal: 20,
        }}
        title={'Next'}
      />
    </Gradient>
  );
};

export default DOB;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: COLORS.BLACK,
  },
});
