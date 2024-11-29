import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../components/BackButton';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Selectable from '../../components/Selectable';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {setGender} from '../../redux/slices/registerFormSlice';
import CustomAlert from '../../components/CustomAlert';

const Gender = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [selectedGender, setSelectedGender] = useState(null);
  const dispatch = useDispatch();

  const handleNext = () => {
    if (selectedGender) {
      dispatch(setGender(selectedGender));
      navigation.navigate(SCREEN_NAME.DOB);
    } else {
      CustomAlert({message: 'Please Select Gender'});
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
        currentSignUpStep={1}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>I am a</Text>
        <View style={{gap: 10, marginTop: 15}}>
          <Selectable
            title={'Male'}
            selected={selectedGender === 'Male'}
            onPress={() => setSelectedGender('Male')}
          />
          <Selectable
            title={'Female'}
            selected={selectedGender === 'Female'}
            onPress={() => setSelectedGender('Female')}
          />
          <Selectable
            title={'Others'}
            selected={selectedGender === 'Others'}
            onPress={() => setSelectedGender('Others')}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: Platform.OS === 'android' && 20,
          }}>
          <Button title={'Next'} onPress={handleNext} />
        </View>
      </View>
    </Gradient>
  );
};

export default Gender;

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
