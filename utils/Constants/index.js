// MARK: Screen Names
export const SCREEN_NAME = {
  LANDING_SCREEN: 'LandingScreen',
  LOGIN: 'Login',
  FORGOT_PASSWORD: 'ForgotPassword',
  VERIFY_OTP: 'VerifyOTP',
  RESET_PASSWORD: 'ResetPassword',
  REGISTRATION: 'Registration',
  VERIFY_EMAIL: 'VerifyEmail',
  GENDER: 'Gender',
  DOB: 'Dob',
  HEIGHT: 'Height',
  PREFERENCES: 'Preferences',
  LOOKING_FOR: 'LookingFor',
  ABOUT_YOU: 'ABoutYou',
  INTEREST: 'Interest',
  ADD_PHOTO: 'AddPhoto',
  SUBSCRIPTION: 'Subscription',
  PROFILE: 'Profile',
  CHAT: 'Chat',
  HOME_TABS: 'HomeTabs',
  NOTIFICATION: 'Notification',
  LIKE: 'Like',
  HOME: 'Home',
  EDIT_PROFILE: 'EditProfile',
  DELETE_PROFILE: 'DeleteProfile',
  EDIT_PHOTOS: 'EditPhotos',
  CHANGE_PASSWORD: 'ChangePassword',
};

// MARK: Fonts' Names
export const FONTS = {
  REGULAR: 'Raleway-Regular',
  MEDIUM: 'Raleway-Medium',
  SEMI_BOLD: 'Raleway-SemiBold',
  BOLD: 'Raleway-Bold',
};

// MARK: Colors' Names
export const COLORS = {
  PRIMARY: 'rgba(223, 32, 36, 1)',
  LIGHT_PRIMARY: 'rgba(223, 32, 36, 0.06)',
  SECONDARY: 'rgba(242, 60, 158, 1)',
  LIGHT_SECONDARY: 'rgba(242, 60, 158, 0.06)',
  BLACK: '#121212',
  LIGHT_BLACK: '#464646',
  WHITE: '#FFFFFF',
  OFF_WHITE: 'rgba(255, 255, 255, 0.4)',
  LIGHT_GREY: '#E5E5E5',
};

// MARK: API Endpoints
export const ENDPOINTS = {
  REGISTER: '/api/user/registration',
  LOGIN: '/api/user/login',
  RESEND_OTP: '/api/user/resendOtp',
  VERIFY_OTP: '/api/user/verifyOtp',
  EDIT_PROFILE: '/api/user/editProfile',
  GET_PROFILE: '/api/user/getUserProfile',
  DELETE_PHOTO: '/api/user/deleteImage',
  UPDATE_PASSWORD: '/api/user/changePassword',
  FORGOT_PASSWORD: '/api/user/forgetPassword',
  RESET_PASSWORD: '/api/user/resetPassword',
  EDIT_EMAIL: '/api/user/emailVerify',
  EDIT_PHONE_NUMBER: '/api/user/phoneOtpVerify',
};
