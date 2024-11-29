// ** React Imports
import React from 'react';
import {Image} from 'react-native';

// ** THird Party Imports
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// ** Screen Imports
import {IMAGES} from '../../utils/Images';
import {COLORS, SCREEN_NAME} from '../../utils/Constants';
import Chat from '../../screens/Chat';
import Profile from '../../screens/Profile';
import Home from '../../screens/Home';
import Like from '../../screens/Like';
import Notification from '../../screens/Notification';

const HomeTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.WHITE,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                style={{
                  width: 21,
                  height: 21,
                  resizeMode: 'contain',
                }}
                source={focused ? IMAGES.HOME_ACTIVE : IMAGES.HOME_INACTIVE}
              />
            );
          },
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.LIGHT_GREY,
        }}
        name={SCREEN_NAME.HOME}
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                style={{
                  width: 21,
                  height: 21,
                  resizeMode: 'contain',
                }}
                source={focused ? IMAGES.LIKE_ACTIVE : IMAGES.LIKE_INACTIVE}
              />
            );
          },
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.LIGHT_GREY,
        }}
        name={SCREEN_NAME.LIKE}
        component={Like}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                style={{
                  width: 21,
                  height: 21,
                  resizeMode: 'contain',
                }}
                source={
                  focused
                    ? IMAGES.NOTIFICATION_ACTIVE
                    : IMAGES.NOTIFICATION_INACTIVE
                }
              />
            );
          },
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.LIGHT_GREY,
        }}
        name={SCREEN_NAME.NOTIFICATION}
        component={Notification}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                style={{
                  width: 21,
                  height: 21,
                  resizeMode: 'contain',
                }}
                source={
                  focused ? IMAGES.MESSAGE_ACTIVE : IMAGES.MESSAGE_INACTIVE
                }
              />
            );
          },
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.LIGHT_GREY,
        }}
        name={SCREEN_NAME.CHAT}
        component={Chat}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                style={{width: 21, height: 21, resizeMode: 'contain'}}
                source={
                  focused ? IMAGES.PROFILE_ACTIVE : IMAGES.PROFILE_INACTIVE
                }
              />
            );
          },
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.OFF_WHITE,
        }}
        name={SCREEN_NAME.PROFILE}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
