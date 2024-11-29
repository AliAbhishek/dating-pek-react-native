import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../components/BackButton';
import Gradient from '../../components/Gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import Selectable from '../../components/Selectable';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {setPrefer} from '../../redux/slices/registerFormSlice';
import CustomAlert from '../../components/CustomAlert';

const Preferences = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [selectedGender, setSelectedGender] = useState(null);

  const dispatch = useDispatch();

  const handleNext = () => {
    if (selectedGender) {
      dispatch(setPrefer(selectedGender));
      navigation.navigate(SCREEN_NAME.LOOKING_FOR);
    } else {
      CustomAlert({message: 'Please Select Preference'});
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
        currentSignUpStep={4}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Who do you prefer?</Text>
        <View style={{gap: 10, marginTop: 15}}>
          <Selectable
            title={'Men'}
            selected={selectedGender === 'Men'}
            onPress={() => setSelectedGender('Men')}
          />
          <Selectable
            title={'Women'}
            selected={selectedGender === 'Women'}
            onPress={() => setSelectedGender('Women')}
          />
          <Selectable
            title={'Everyone'}
            selected={selectedGender === 'Everyone'}
            onPress={() => setSelectedGender('Everyone')}
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

export default Preferences;

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
