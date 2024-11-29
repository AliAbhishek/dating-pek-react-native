import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import AdvancedBackButton from '../../components/AdvancedBackButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ActionMenu from '../../components/ActionMenu';
import {IMAGES} from '../../utils/Images';
import AdvancedSelectable from '../../components/AdvancedSelectable';
import BottomSheet from '../../components/BottomSheet';
import {useDispatch, useSelector} from 'react-redux';

const EditProfile = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const getProfileData = useSelector(
    state => state.API.data?.getProfileResponse?.data,
  );

  const [profileData, setProfileData] = useState({
    name: getProfileData?.name || 'N/A',
    email: getProfileData?.email || 'N/A',
    phone: getProfileData?.phoneNumber,
    height: getProfileData?.height,
    dob: getProfileData?.dob,
    gender:
      getProfileData?.gender == 0
        ? 'Male'
        : getProfileData?.gender == 1
        ? 'Female'
        : 'Others',
    occupation:
      getProfileData?.occupation == 1
        ? 'Student'
        : getProfileData?.occupation == 2
        ? 'Unemployed'
        : getProfileData?.occupation == 3
        ? 'Employed'
        : 'Self employed',
    bio: getProfileData?.about,
    interests: getProfileData?.interest,
    designation: getProfileData?.designation,
    highestQualification: getProfileData?.highestQualification,
    highestQualification:
      getProfileData?.highestQualification == 1
        ? 'High school'
        : getProfileData?.highestQualification == 2
        ? 'Undergraduate'
        : getProfileData?.highestQualification == 3
        ? 'Graduate'
        : getProfileData?.highestQualification == 4
        ? 'Postgraduate'
        : 'Doctorate',
  });

  const [currentField, setCurrentField] = useState({label: '', value: ''});

  const onOpen = (label, value) => {
    setCurrentField({label, value});
    modalRef.current?.open();
  };

  const handleSave = newValue => {
    setProfileData(prevData => ({
      ...prevData,
      [currentField.label.toLowerCase()]: newValue,
    }));
  };

  return (
    <Gradient colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}>
      <AdvancedBackButton
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          top: Platform.OS === 'ios' ? insets.top + 5 : 30,
        }}
        heading={'Edit profile'}
        action={
          <ActionMenu
            props={{
              heading: 'Delete profile',
              show: modalVisible,
              toggle: setModalVisible,
              onPress: () => navigation.navigate(SCREEN_NAME.DELETE_PROFILE),
            }}
          />
        }
      />

      <BottomSheet
        modalRef={modalRef}
        label={currentField.label}
        value={currentField.value}
        onSave={handleSave}
        userId={getProfileData?._id}
        cCode={getProfileData?.countryCode}
      />

      <ScrollView
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        style={styles.mainContainer}>
        {/* <TouchableWithoutFeedback onPress={() => setModalVisible(false)}> */}
        <View style={styles.detailContainer}>
          <View style={styles.content}>
            <Text style={styles.label}>{'Name'}</Text>
            <Text style={styles.value}>{profileData?.name}</Text>
          </View>
          <TouchableOpacity onPress={() => onOpen('Name', profileData.name)}>
            <Image source={IMAGES.EDIT} style={styles.editImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.content}>
            <Text style={styles.label}>{'Email'}</Text>
            <Text style={styles.value}>{profileData?.email}</Text>
          </View>
          <TouchableOpacity onPress={() => onOpen('Email', profileData.email)}>
            <Image source={IMAGES.EDIT} style={styles.editImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.content}>
            <Text style={styles.label}>{'Phone no.'}</Text>
            <Text style={styles.value}>
              {getProfileData?.countryCode} {profileData?.phone}
            </Text>
          </View>
          <TouchableOpacity onPress={() => onOpen('Phone', profileData.phone)}>
            <Image source={IMAGES.EDIT} style={styles.editImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.content}>
            <Text style={styles.label}>{'Height'}</Text>
            <Text style={styles.value}>{profileData?.height} cm</Text>
          </View>
          <TouchableOpacity
            onPress={() => onOpen('Height', profileData.height)}>
            <Image source={IMAGES.EDIT} style={styles.editImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.content}>
            <Text style={styles.label}>{'Date of birth'}</Text>
            <Text style={styles.value}>{profileData.dob}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onOpen('Date of Birth', profileData.dob)}>
            <Image source={IMAGES.EDIT} style={styles.editImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.content}>
            <Text style={styles.label}>{'Gender'}</Text>
            <Text style={styles.value}>{profileData?.gender}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onOpen('Gender', profileData.gender)}>
            <Image source={IMAGES.EDIT} style={styles.editImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.content}>
            <Text style={styles.label}>{'Occupation'}</Text>
            <Text style={styles.value}>{profileData?.occupation}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              onOpen('Occupation', {
                data: {
                  occupation: profileData?.occupation,
                  highestQualification: profileData?.highestQualification,
                  designation: profileData?.designation,
                },
              })
            }>
            <Image source={IMAGES.EDIT} style={styles.editImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.content}>
            <Text style={styles.label}>{'Bio'}</Text>
            <Text style={styles.value}>{profileData?.bio}</Text>
          </View>
          <TouchableOpacity onPress={() => onOpen('Bio', profileData.bio)}>
            <Image source={IMAGES.EDIT} style={styles.editImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.content}>
            <Text style={styles.label}>{'Interests'}</Text>
            <View style={styles.interestContainer}>
              {profileData?.interests.map((el, index) => {
                return (
                  <View key={index}>
                    <AdvancedSelectable
                      title={el}
                      imageSource={IMAGES.ART}
                      selected={true}
                    />
                  </View>
                );
              })}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => onOpen('interest', profileData.interests)}>
            <Image source={IMAGES.EDIT} style={styles.editImage} />
          </TouchableOpacity>
        </View>
        {/* </TouchableWithoutFeedback> */}
      </ScrollView>
    </Gradient>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
    padding: 15,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.LIGHT_BLACK,
  },
  value: {
    fontSize: 16,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.BLACK,
  },
  editImage: {
    width: 24,
    height: 24,
  },
  interestContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 5,
    marginTop: 20,
  },
});
