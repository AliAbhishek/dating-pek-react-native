import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Gradient from '../../components/Gradient';
import {IMAGES} from '../../utils/Images';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import Button from '../../components/Button';
import {RFValue} from 'react-native-responsive-fontsize';

const LandingScreen = ({navigation}) => {
  const {height} = Dimensions.get('window');
  return (
    <Gradient
      colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}
      style={styles.linearGradient}>
      <View>
        <Image
          source={IMAGES.LANDING}
          style={{width: '100%', height: height / 2}}
        />
        <View style={styles.subContainer}>
          <Text
            style={{
              ...styles.heading,
              fontSize: RFValue(24, height),
            }}>
            Start your dating journey today.
          </Text>
          <Text
            style={{
              ...styles.subHeading,
              fontSize: RFValue(22, height),
            }}>
            Etiam at consectetur turpis. Duis ac eleifend justo, in ultricies
            lacus. Pellentesque non neque ac massa pharetra egestas. Proin
            consequat mollis porttitor.
          </Text>

          <Button
            style={styles.signupButton}
            title={'Signup'}
            onPress={() => navigation.navigate(SCREEN_NAME.REGISTRATION)}
          />
          <Button
            style={styles.signupButton}
            title={'Login'}
            isBgWhite={true}
            onPress={() => navigation.navigate(SCREEN_NAME.LOGIN)}
          />
        </View>
      </View>
    </Gradient>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: 'flex-end',
  },
  subContainer: {
    paddingHorizontal: 20,
  },
  heading: {
    textAlign: 'center',
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
  },
  subHeading: {
    textAlign: 'center',
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.REGULAR,
    marginTop: 15,
  },
  signupButton: {
    marginTop: 10,
  },
});
