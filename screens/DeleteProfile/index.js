import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS} from '../../utils/Constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AdvancedBackButton from '../../components/AdvancedBackButton';
import DropdownComponent from '../../components/Dropdown';
import {deleteProfileData} from '../../utils/Static';
import Button from '../../components/Button';

const DeleteProfile = () => {
  const insets = useSafeAreaInsets();

  return (
    <Gradient colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}>
      <AdvancedBackButton
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          top: Platform.OS === 'ios' ? insets.top + 5 : 30,
        }}
        heading={'Delete profile'}
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}>
        <Text style={styles.label}>Delete reason</Text>
        <DropdownComponent
          data={deleteProfileData}
          placeholder="Select reason"
        />
        <Text style={styles.label}>What’s happing</Text>

        <TextInput
          placeholder="Please write here..."
          key={'details'}
          placeholderTextColor={COLORS.LIGHT_BLACK}
          style={{...styles.textArea, height: 160}}
          multiline={true}
          textAlignVertical="top"
        />
      </ScrollView>
      <View>
        <Button
          title={'Submit'}
          style={{
            paddingBottom: Platform.OS === 'android' && 20,
            paddingHorizontal: 20,
          }}
        />
      </View>
    </Gradient>
  );
};

export default DeleteProfile;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  label: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONTS.SEMI_BOLD,
    marginTop: 10,
  },
  textArea: {
    padding: 15,
    borderRadius: 16,
    backgroundColor: COLORS.OFF_WHITE,
    color: COLORS.LIGHT_BLACK,
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
  },
});
