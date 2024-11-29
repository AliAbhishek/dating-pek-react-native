import {Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Gradient = ({colors, style, children, extraColor}) => {
  const insets = useSafeAreaInsets();
  const gradientColors = [...colors, extraColor];
  const gradientLocations = [0, 0, 0.6];

  return (
    <LinearGradient
      style={[
        {
          ...styles.linearGradient,

          paddingTop: Platform.OS === 'ios' ? insets.top : 15,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
      colors={extraColor ? gradientColors : colors}
      locations={extraColor && gradientLocations}>
      {children}
    </LinearGradient>
  );
};

export default Gradient;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
