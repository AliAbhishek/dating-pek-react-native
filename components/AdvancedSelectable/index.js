import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../utils/Constants';

const AdvancedSelectable = ({
  style,
  onPress,
  gradientStyle,
  textStyle,
  title,
  selected,
  imageSource,
}) => {
  return (
    <TouchableOpacity style={[styles.touchable, style]} onPress={onPress}>
      {selected ? (
        <LinearGradient
          colors={[COLORS.PRIMARY, COLORS.SECONDARY]}
          style={[styles.gradient, gradientStyle]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View style={styles.content}>
            {imageSource && (
              <Image
                source={imageSource}
                style={{...styles.image, tintColor: 'white'}}
              />
            )}
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
          </View>
        </LinearGradient>
      ) : (
        <View style={[styles.unselectedContainer]}>
          <View style={styles.content}>
            {imageSource && <Image source={imageSource} style={styles.image} />}
            <Text style={[styles.unselectedText, textStyle]}>{title}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AdvancedSelectable;

const styles = StyleSheet.create({
  gradient: {
    justifyContent: 'center',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 14,
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
  },
  unselectedText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.BLACK,
  },
});
