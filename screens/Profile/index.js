import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import {IMAGES} from '../../utils/Images';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from '../../redux/slices/apiSlice';
import AuthContext from '../../context/AuthContext';
import {baseURL} from '../../utils/Axios';

const {width} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const {token, handleLogOut} = useContext(AuthContext);

  useEffect(() => {
    dispatch(getProfile(token));
  }, []);

  const profileData = useSelector(
    state => state.API.data?.getProfileResponse?.data,
  );

  return (
    <Gradient
      extraColor={'white'}
      colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}>
      <View
        style={{
          paddingHorizontal: 20,
          alignItems: 'center',
          marginTop: 20,
          gap: 10,
        }}>
        <Image
          source={{uri: baseURL + '/' + profileData?.images[0]}}
          style={{width: 80, height: 80, borderRadius: 50}}
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTS.BOLD,
            color: COLORS.BLACK,
          }}>
          {profileData?.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: FONTS.REGULAR,
            color: COLORS.LIGHT_BLACK,
          }}>
          {profileData?.email}
        </Text>
        <Button
          title={'Boost your Profile'}
          isBgWhite={true}
          source={IMAGES.ROCKET}
          isImage={true}
          style={{width: '100%'}}
        />
        <Button
          title={'Buy Verification'}
          isBgWhite={true}
          source={IMAGES.VERIFIED}
          isImage={true}
          style={{width: '100%'}}
        />
        <View style={styles.viewsContainer}>
          <View style={styles.box}>
            <Text style={styles.viewsCount}>50</Text>
            <Text style={styles.viewsHeading}>Profile viewers</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.viewsCount}>100</Text>
            <Text style={styles.viewsHeading}>Peeks</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{paddingHorizontal: 20}}>
        <View style={styles.mainActionContainer}>
          <TouchableOpacity
            style={styles.actionContainer}
            onPress={() => navigation.navigate(SCREEN_NAME.EDIT_PROFILE)}>
            <View style={styles.actionSubContainer}>
              <Image style={styles.actionImage} source={IMAGES.USER} />
              <Text style={styles.actionText}>Edit profile</Text>
            </View>
            <Image style={styles.arrowImage} source={IMAGES.RIGHT_ARROW} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionContainer}
            onPress={() => navigation.navigate(SCREEN_NAME.EDIT_PHOTOS)}>
            <View style={styles.actionSubContainer}>
              <Image style={styles.actionImage} source={IMAGES.IMAGE} />
              <Text style={styles.actionText}>Edit photos</Text>
            </View>
            <Image style={styles.arrowImage} source={IMAGES.RIGHT_ARROW} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionContainer}
            onPress={() => navigation.navigate(SCREEN_NAME.CHANGE_PASSWORD)}>
            <View style={styles.actionSubContainer}>
              <Image style={styles.actionImage} source={IMAGES.LOCK} />
              <Text style={styles.actionText}>Change password</Text>
            </View>
            <Image style={styles.arrowImage} source={IMAGES.RIGHT_ARROW} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogOut}
            style={{
              ...styles.actionContainer,
              backgroundColor: 'rgba(223, 32, 36, 0.1)',
            }}>
            <View style={styles.actionSubContainer}>
              <Image style={styles.actionImage} source={IMAGES.EXIT} />
              <Text style={styles.actionText}>Log out</Text>
            </View>
            <Image style={styles.arrowImage} source={IMAGES.RIGHT_ARROW} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Gradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  viewsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  box: {
    width: width / 2 - 30,
    padding: 20,
    backgroundColor: 'rgba(223, 32, 36, 0.08)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewsCount: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY,
  },
  viewsHeading: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.LIGHT_BLACK,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.LIGHT_GREY,
  },
  actionSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionImage: {
    width: 19,
    height: 19,
  },
  actionText: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.BLACK,
  },
  arrowImage: {
    width: 15,
    height: 15,
  },
  mainActionContainer: {
    gap: 10,
    marginTop: 10,
  },
});
