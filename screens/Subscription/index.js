import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import BackButton from '../../components/BackButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGES} from '../../utils/Images';
import {subscriptionData} from '../../utils/Static';
import {useDispatch, useSelector} from 'react-redux';
import {editProfile} from '../../redux/slices/apiSlice';
import AuthContext from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const transformData = data => {
  const genderMapping = {
    Male: 0,
    Female: 1,
    Others: 2,
  };

  const preferMapping = {
    Men: 1,
    Women: 2,
    Everyone: 3,
  };

  const lookingForMapping = {
    'A relationship': 1,
    'Something casual': 2,
    "I'm not sure": 3,
    'Prefer not to say': 4,
  };

  const occupationMapping = {
    Student: 1,
    Unemployed: 2,
    Employed: 3,
    'Self employed': 4,
  };

  const highestQualificationMapping = {
    'High school': 1,
    Undergraduate: 2,
    Graduate: 3,
    Postgraduate: 4,
    Doctorate: 5,
  };

  return {
    about: data.about,
    designation: data.designation,
    dob: data.dob,
    gender: genderMapping[data.gender],
    height: data.height,
    highestQualification:
      highestQualificationMapping[data.highestQualification],
    images: data.images,
    interest: data.interest,
    lookingFor: lookingForMapping[data.lookingFor],
    occupation: occupationMapping[data.occupation],
    prefer: preferMapping[data.prefer],
  };
};

const Subscription = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Basic');
  const dispatch = useDispatch();
  const {token, checkToken} = useContext(AuthContext);

  const getRegisterFormData = useSelector(state => state.registerFormData);
  const transformedData = transformData(getRegisterFormData);

  const prepareFormData = data => {
    const formData = new FormData();

    formData.append('about', data.about);
    formData.append('designation', data.designation);
    formData.append('dob', data.dob);
    formData.append('gender', data.gender);
    formData.append('height', data.height);
    formData.append('highestQualification', data.highestQualification);
    formData.append('lookingFor', data.lookingFor);
    formData.append('occupation', data.occupation);
    formData.append('preference', data.prefer);

    data.interest.forEach(interest => {
      formData.append('interest', interest);
    });

    data.images.forEach((image, index) => {
      formData.append('images', image[1]);
    });

    return formData;
  };

  const formData = prepareFormData(transformedData);

  const handleRegistration = () => {
    dispatch(editProfile({data: formData, token: token})).then(async res => {
      const status = res?.payload?.status;
      const isProfileCompleted = res?.payload?.data?.isProfileCompleted;
      if (status === 200 && isProfileCompleted === 1) {
        await AsyncStorage.setItem('isProfileCreated', 'true');
        // navigation.navigate(SCREEN_NAME.PROFILE);
        checkToken();
      } else {
        checkToken();
      }
    });
  };

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const renderPrice = () => {
    switch (activeTab) {
      case 'Basic':
        return (
          <Text style={styles.price}>
            $20
            <Text style={{...styles.price, fontSize: 20}}>/month</Text>
          </Text>
        );
      case 'Standard':
        return (
          <Text style={styles.price}>
            $40
            <Text style={{...styles.price, fontSize: 20}}>/month</Text>
          </Text>
        );
      case 'Premium':
        return (
          <Text style={styles.price}>
            $60
            <Text style={{...styles.price, fontSize: 20}}>/month</Text>
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <Gradient colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}>
      <BackButton
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          top: Platform.OS === 'ios' ? insets.top + 5 : 30,
        }}
        skip={true}
        onSkip={handleRegistration}
      />

      <ScrollView
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}>
        <Text style={styles.heading}>Subscription Plans</Text>

        <View style={styles.tabContainer}>
          {['Basic', 'Standard', 'Premium'].map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTabChange(tab)}
              style={styles.tab}>
              {activeTab === tab ? (
                <LinearGradient
                  colors={[COLORS.PRIMARY, COLORS.SECONDARY]}
                  style={styles.activeTab}>
                  <Text style={styles.activeTabText}>{tab}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.activeTab}>
                  <Text style={styles.tabText}>{tab}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <LinearGradient
          colors={['rgba(223, 32, 36, 0.12)', 'rgba(242, 60, 158, 0.12)']}
          style={styles.priceHeadingContainer}>
          {renderPrice()}
        </LinearGradient>

        <View
          style={{
            gap: 8,
          }}>
          <Text style={styles.featuresText}>Features:</Text>
          {subscriptionData.map((el, index) => {
            return (
              <View key={index} style={styles.features}>
                <Image source={IMAGES.CIRCLE_CHECK} style={styles.checkImage} />

                <Text style={styles.featuresDetails}>{el.name}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Button
        style={{
          paddingHorizontal: 20,
          paddingBottom: Platform.OS === 'android' && 20,
        }}
        title={'Buy Now'}
      />
    </Gradient>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  heading: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: COLORS.BLACK,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: COLORS.LIGHT_GREY,
    backgroundColor: COLORS.OFF_WHITE,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    padding: 10,
    paddingVertical: 13,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.LIGHT_BLACK,
  },
  activeTabText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
  },
  price: {
    fontSize: 32,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY,
  },
  priceHeadingContainer: {
    width: '100%',
    borderRadius: 50,
    alignItems: 'center',
    padding: 8,
    marginTop: 20,
  },
  featuresText: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontFamily: FONTS.BOLD,
    marginTop: 20,
    marginBottom: 10,
  },
  features: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  checkImage: {
    resizeMode: 'contain',
    width: 16,
    height: 16,
  },
  featuresDetails: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.LIGHT_BLACK,
  },
});
