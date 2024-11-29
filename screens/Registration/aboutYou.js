import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import BackButton from '../../components/BackButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DropdownComponent from '../../components/Dropdown';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import {occupationData, qualificationData} from '../../utils/Static';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAbout,
  setDesignation,
  setHighestQualification,
  setOccupation,
} from '../../redux/slices/registerFormSlice';
import CustomAlert from '../../components/CustomAlert';

const AboutYou = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {occupation, designation, about, highestQualification} = useSelector(
    state => state.registerFormData,
  );

  const handleNext = () => {
    if (!occupation) {
      CustomAlert({message: 'Please Select Occupation'});
    } else if (!designation) {
      CustomAlert({message: 'Please Enter Designation'});
    } else if (!highestQualification) {
      CustomAlert({message: 'Please Select Highest Qualification'});
    } else if (!about) {
      CustomAlert({message: 'Please Enter About Yourself'});
    } else {
      navigation.navigate(SCREEN_NAME.INTEREST);
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
        currentSignUpStep={6}
      />

      <ScrollView
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}>
        <Text style={styles.heading}>Tell us about yourself!</Text>
        <Text style={styles.subHeading}>Let other users know you better!</Text>
        <View style={{marginVertical: 20, gap: 10}}>
          <Text style={styles.label}>What’s your occupation?</Text>
          <DropdownComponent
            data={occupationData}
            onChange={value => dispatch(setOccupation(value))}
            placeholder="Select occupation"
          />
          <Text style={styles.label}>What’s your designation?</Text>
          <TextField
            placeholder={'Designation'}
            onChange={value => dispatch(setDesignation(value))}
            placeholderTextColor={COLORS.LIGHT_BLACK}
          />
          <Text style={styles.label}>What’s your highest qualification?</Text>
          <DropdownComponent
            data={qualificationData}
            onChange={value => dispatch(setHighestQualification(value))}
            placeholder="Select qualification"
          />
          <Text style={styles.label}>Tell us about yourself</Text>

          <TextInput
            placeholder="Type here..."
            key={'details'}
            placeholderTextColor={COLORS.LIGHT_BLACK}
            style={{...styles.textArea, height: 160}}
            multiline={true}
            textAlignVertical="top"
            onChangeText={value => dispatch(setAbout(value))}
          />
        </View>
        <View>
          <Button
            title={'Next'}
            onPress={handleNext}
            style={{
              paddingBottom: Platform.OS === 'android' && 20,
            }}
          />
        </View>
      </ScrollView>
    </Gradient>
  );
};

export default AboutYou;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  heading: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: COLORS.BLACK,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.LIGHT_BLACK,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONTS.SEMI_BOLD,
    marginTop: 10,
  },
  textArea: {
    padding: 15,
    borderRadius: 16,
    backgroundColor: COLORS.OFF_WHITE,
    color: COLORS.LIGHT_BLACK,
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
  },
});
