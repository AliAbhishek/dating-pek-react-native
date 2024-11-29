import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS} from '../../utils/Constants';

const Like = () => {
  return (
    <Gradient
      colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Under Development</Text>
      </View>
    </Gradient>
  );
};

export default Like;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY,
  },
});
