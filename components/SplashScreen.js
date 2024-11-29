import {StyleSheet, Image, View, StatusBar} from 'react-native';
import React from 'react';
import {IMAGES} from '../utils/Images';

const SplashScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image style={{width: '100%', height: '100%'}} source={IMAGES.SPLASH} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
