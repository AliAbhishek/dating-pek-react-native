import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IMAGES} from '../../utils/Images';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../../utils/Constants';

const BackButton = ({style, imageStyle, currentSignUpStep, skip, onSkip}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        style,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        },
      ]}>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'transparent',
        }}
        onPress={() => navigation.goBack()}>
        <Image source={IMAGES.BACK} style={[styles.image, imageStyle]} />
      </TouchableOpacity>
      {currentSignUpStep && (
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.PRIMARY,
            borderRadius: 50,
            width: 50,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: FONTS.SEMI_BOLD,
              color: COLORS.PRIMARY,
              fontSize: 14,
            }}>
            {currentSignUpStep}/9
          </Text>
        </View>
      )}
      {skip && (
        <TouchableOpacity
          onPress={onSkip}
          style={{
            backgroundColor: COLORS.PRIMARY,
            borderRadius: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
          }}>
          <Text
            style={{
              fontFamily: FONTS.SEMI_BOLD,
              color: COLORS.WHITE,
              fontSize: 14,
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: 16,
    height: 16,
  },
});
