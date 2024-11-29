import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../components/BackButton';
import Gradient from '../../components/Gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import Selectable from '../../components/Selectable';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {setLookingFor} from '../../redux/slices/registerFormSlice';
import CustomAlert from '../../components/CustomAlert';

const LookingFor = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState(null);

  const dispatch = useDispatch();

  const handleNext = () => {
    if (selectedType) {
      dispatch(setLookingFor(selectedType));
      navigation.navigate(SCREEN_NAME.ABOUT_YOU);
    } else {
      CustomAlert({message: 'Please Select Looking for'});
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
        currentSignUpStep={5}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>I am looking for</Text>
        <View style={{gap: 10, marginTop: 15}}>
          <Selectable
            title={'A relationship'}
            selected={selectedType === 'A relationship'}
            onPress={() => setSelectedType('A relationship')}
          />
          <Selectable
            title={'Something casual'}
            selected={selectedType === 'Something casual'}
            onPress={() => setSelectedType('Something casual')}
          />
          <Selectable
            title={'I’m not sure yet'}
            selected={selectedType === 'I’m not sure yet'}
            onPress={() => setSelectedType('I’m not sure yet')}
          />
          <Selectable
            title={'Prefer not to say'}
            selected={selectedType === 'Prefer not to say'}
            onPress={() => setSelectedType('Prefer not to say')}
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

export default LookingFor;

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
