// ** React Imports
import React, {useContext, useEffect, useState} from 'react';

// ** Third Party Imports
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// ** Screen Imports
import {SCREEN_NAME} from '../../utils/Constants';
import LandingScreen from '../../screens/LandingScreen';
import Login from '../../screens/Login';
import VerifyOTP from '../../screens/ForgotPassword/verifyOTP';
import ResetPassword from '../../screens/ForgotPassword/resetPassword';
import Registration from '../../screens/Registration';
import VerifyEmail from '../../screens/Registration/verifyEmail';
import Gender from '../../screens/Registration/gender';
import DOB from '../../screens/Registration/DOB';
import Height from '../../screens/Registration/height';
import Preferences from '../../screens/Registration/preferences';
import LookingFor from '../../screens/Registration/lookingFor';
import AboutYou from '../../screens/Registration/aboutYou';
import Interest from '../../screens/Registration/interest';
import AddPhoto from '../../screens/Registration/addPhoto';
import Subscription from '../../screens/Subscription';
import HomeTabs from '../Tabs';
import ForgotPassword from '../../screens/ForgotPassword';
import EditProfile from '../../screens/Profile/editProfile';
import DeleteProfile from '../../screens/DeleteProfile';
import EditPhotos from '../../screens/Profile/editPhotos';
import ChangePassword from '../../screens/Profile/changePassword';
import AuthContext from '../../context/AuthContext';
import SplashScreen from '../../components/SplashScreen';

const StackNavigation = () => {
  const Stack = createStackNavigator();
  const {isLoading, isProfileCreated, isAuthenticated} =
    useContext(AuthContext);

  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible || isLoading) {
    return <SplashScreen />;
  }

  const RegistrationPendingSteps = (
    <React.Fragment>
      <Stack.Screen
        name={SCREEN_NAME.GENDER}
        component={Gender}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREEN_NAME.DOB}
        component={DOB}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREEN_NAME.HEIGHT}
        component={Height}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREEN_NAME.PREFERENCES}
        component={Preferences}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREEN_NAME.LOOKING_FOR}
        component={LookingFor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREEN_NAME.ABOUT_YOU}
        component={AboutYou}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREEN_NAME.INTEREST}
        component={Interest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREEN_NAME.ADD_PHOTO}
        component={AddPhoto}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREEN_NAME.SUBSCRIPTION}
        component={Subscription}
        options={{headerShown: false}}
      />
    </React.Fragment>
  );
  const ForgotPasswordScreens = (
    <React.Fragment>
      <Stack.Screen
        name={SCREEN_NAME.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREEN_NAME.VERIFY_OTP}
        component={VerifyOTP}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREEN_NAME.RESET_PASSWORD}
        component={ResetPassword}
        options={{headerShown: false}}
      />
    </React.Fragment>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREEN_NAME.LANDING_SCREEN}>
        {!isAuthenticated ? (
          <React.Fragment>
            <Stack.Screen
              name={SCREEN_NAME.LANDING_SCREEN}
              component={LandingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREEN_NAME.LOGIN}
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREEN_NAME.REGISTRATION}
              component={Registration}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREEN_NAME.VERIFY_EMAIL}
              component={VerifyEmail}
              options={{headerShown: false}}
            />
            {ForgotPasswordScreens}
          </React.Fragment>
        ) : isProfileCreated ? (
          <React.Fragment>
            <Stack.Screen
              name={SCREEN_NAME.HOME_TABS}
              component={HomeTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREEN_NAME.EDIT_PROFILE}
              component={EditProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREEN_NAME.DELETE_PROFILE}
              component={DeleteProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREEN_NAME.EDIT_PHOTOS}
              component={EditPhotos}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={SCREEN_NAME.CHANGE_PASSWORD}
              component={ChangePassword}
              options={{headerShown: false}}
            />
          </React.Fragment>
        ) : (
          RegistrationPendingSteps
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
