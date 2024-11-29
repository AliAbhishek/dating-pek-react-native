import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../utils/Images';
import {COLORS, FONTS} from '../../utils/Constants';

const ActionMenu = ({props}) => {
  const {show, toggle, heading, onPress} = props;

  const toggleModal = () => {
    toggle(!show);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={IMAGES.THREE_DOTS} style={{width: 16, height: 16}} />
      </TouchableOpacity>

      {show && (
        <TouchableOpacity onPress={onPress} style={styles.dropdown}>
          <Text style={styles.modalHeading}>{heading}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ActionMenu;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dropdown: {
    width: 150,
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: COLORS.WHITE,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 14,
  },
  modalHeading: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONTS.SEMI_BOLD,
  },
});
