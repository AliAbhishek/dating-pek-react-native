// ** React Imports
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

// ** Third Party Imports
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS, FONTS} from '../../utils/Constants';

const DropdownComponent = ({data, value, placeholder, onChange}) => {
  const [values, setValues] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={[styles.dropdown]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      containerStyle={{
        borderRadius: 10,
      }}
      data={data}
      showsVerticalScrollIndicator={false}
      maxHeight={280}
      labelField="label"
      valueField="value"
      itemTextStyle={styles.selectedTextStyle}
      placeholder={!isFocus ? placeholder : placeholder}
      value={value ? value : values}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        onChange(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.OFF_WHITE,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.MEDIUM,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.MEDIUM,
  },
});
