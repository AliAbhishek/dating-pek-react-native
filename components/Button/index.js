// ** React Imports
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../utils/Constants';
import {IMAGES} from '../../utils/Images';

// ** Utils Imports

const Button = ({
  title,
  onPress,
  gradientStyle,
  textStyle,
  disabled,
  style,
  isBgWhite,
  isImage,
  source,
}) => {
  return (
    <>
      {!isBgWhite ? (
        <TouchableOpacity
          disabled={disabled}
          style={[styles.touchable, style]}
          onPress={onPress}>
          <LinearGradient
            colors={[COLORS.PRIMARY, COLORS.SECONDARY]}
            style={[styles.gradient, gradientStyle]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : isImage ? (
        <TouchableOpacity
          disabled={disabled}
          style={[styles.touchableWhiteWithImg, style]}
          onPress={onPress}>
          <Image source={source} style={{width: 16, height: 16}} />
          <Text style={[styles.buttonTextWhiteWithImg, textStyle]}>
            {title}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={disabled}
          style={[styles.touchableWhite, style]}
          onPress={onPress}>
          <Text style={[styles.buttonTextWhite, textStyle]}>{title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  touchableWhite: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  touchableWhiteWithImg: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.WHITE,
  },
  buttonTextWhite: {
    fontSize: 16,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY,
  },
  buttonTextWhiteWithImg: {
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY,
  },
});

export default Button;
