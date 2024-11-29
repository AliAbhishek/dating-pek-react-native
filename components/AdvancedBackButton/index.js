import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IMAGES} from '../../utils/Images';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../../utils/Constants';
import ActionMenu from '../ActionMenu';

const AdvancedBackButton = ({style, imageStyle, action, heading}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        style,
        {
          flexDirection: 'row',
          justifyContent: action ? 'space-between' : 'center',
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
      {heading && (
        <View style={{flexGrow: 1, alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: FONTS.BOLD,
              color: COLORS.BLACK,
              fontSize: 16,
            }}>
            {heading}
          </Text>
        </View>
      )}
      {action && action}
    </View>
  );
};

export default AdvancedBackButton;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: 16,
    height: 16,
  },
});
