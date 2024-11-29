import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../utils/Constants';

const Selectable = ({
  style,
  onPress,
  gradientStyle,
  textStyle,
  title,
  selected,
}) => {
  return (
    <TouchableOpacity style={[styles.touchable, style]} onPress={onPress}>
      {selected ? (
        <LinearGradient
          colors={[COLORS.PRIMARY, COLORS.SECONDARY]}
          style={[styles.gradient, gradientStyle]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.unselectedContainer]}>
          <Text style={[styles.unselectedText, textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Selectable;

const styles = StyleSheet.create({
  gradient: {
    justifyContent: 'center',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.WHITE,
  },
  unselectedContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
    backgroundColor: COLORS.OFF_WHITE,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
  },
  unselectedText: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.LIGHT_BLACK,
  },
});
