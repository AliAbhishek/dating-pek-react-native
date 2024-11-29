import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../components/BackButton';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import Gradient from '../../components/Gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {setHeight} from '../../redux/slices/registerFormSlice';
import CustomAlert from '../../components/CustomAlert';

const Height = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [heightInCM, setHeightInCM] = useState();

  const dispatch = useDispatch();

  const handleNext = () => {
    if (heightInCM) {
      dispatch(setHeight(heightInCM));
      navigation.navigate(SCREEN_NAME.PREFERENCES);
    } else {
      CustomAlert({message: 'Please Select Height'});
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
        currentSignUpStep={3}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>What’s your height?</Text>
          <View style={{marginTop: 20}}>
            <TextField
              placeholder={'Enter height'}
              placeholderTextColor={COLORS.LIGHT_BLACK}
              isText={true}
              keyType={'numeric'}
              value={heightInCM}
              onChange={setHeightInCM}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
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

export default Height;

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
