import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import Gradient from '../../components/Gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import AdvancedSelectable from '../../components/AdvancedSelectable';
import {IMAGES} from '../../utils/Images';
import {interestData} from '../../utils/Static';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import CustomAlert from '../../components/CustomAlert';
import {setInterest} from '../../redux/slices/registerFormSlice';

const Interest = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const dispatch = useDispatch();

  const toggleInterest = name => {
    setSelectedTypes(prevSelected =>
      prevSelected.includes(name)
        ? prevSelected.filter(typeId => typeId !== name)
        : [...prevSelected, name],
    );
  };

  const handleNext = () => {
    if (selectedTypes.length > 4) {
      dispatch(setInterest(selectedTypes));
      navigation.navigate(SCREEN_NAME.ADD_PHOTO);
    } else {
      CustomAlert({message: 'Please Select Minimum Five Interests'});
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
        currentSignUpStep={7}
      />

      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Your interest</Text>
        <Text style={styles.subHeading}>
          Select minimum 5 of your interests and let everyone know what you’re
          passionate about.
        </Text>
        <View style={styles.interestContainer}>
          {interestData.map((el, index) => (
            <View key={index}>
              <AdvancedSelectable
                title={el.name}
                imageSource={el.image}
                selected={selectedTypes.includes(el.name)}
                onPress={() => toggleInterest(el.name)}
              />
            </View>
          ))}
        </View>
        <Button
          title={'Next'}
          onPress={handleNext}
          style={{
            paddingBottom: Platform.OS === 'android' && 20,
          }}
        />
      </View>
    </Gradient>
  );
};

export default Interest;

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
  subHeading: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.LIGHT_BLACK,
    marginTop: 10,
  },
  interestContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 5,
    marginTop: 20,
  },
});
