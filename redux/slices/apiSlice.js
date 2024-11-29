import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../utils/Axios';
import {ENDPOINTS} from '../../utils/Constants';
import CustomAlert from '../../components/CustomAlert';

const initialState = {
  data: {
    registration: [],
    loginResponse: [],
    resendOTPResponse: [],
    verifyOTPResponse: [],
    editProfileResponse: [],
    getProfileResponse: [],
    deletePhotoResponse: [],
    updatePasswordResponse: [],
    editEmailResponse: [],
    editPhoneNumberResponse: [],
  },
  loading: false,
  error: null,
};

// MARK: Registration API
export const registration = createAsyncThunk('api/registration', async data => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.REGISTER, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error in registration:', error);
  }
});

// MARK: Login API
export const login = createAsyncThunk('api/login', async data => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.LOGIN, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const token = response.data.data.token;
    await AsyncStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.log('Error in login:', error);
    CustomAlert({message: error?.response?.data?.message});
  }
});

// MARK: Resend OTP API
export const resendOTP = createAsyncThunk('api/resendOTP', async ({data}) => {
  try {
    console.log(data, 'in api');
    const response = await axiosInstance.post(ENDPOINTS.RESEND_OTP, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // await AsyncStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.log('Error in resend otp:', error);
  }
});

// MARK: Verify OTP API
export const verifyOTP = createAsyncThunk('api/verifyOTP', async data => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.VERIFY_OTP, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const token = response.data.data.token;
    data.type != 1 && (await AsyncStorage.setItem('token', token));
    return response.data;
  } catch (error) {
    CustomAlert({message: error?.response?.data?.message});
    console.log('Error in verify otp:', error?.response?.data?.message);
  }
});

// MARK: Edit Profile API
export const editProfile = createAsyncThunk(
  'api/editProfile',
  async ({data, token}) => {
    try {
      const response = await axiosInstance.put(ENDPOINTS.EDIT_PROFILE, data, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      CustomAlert({message: error?.response?.data?.message});
      console.log('Error in edit profile:', error?.response?.data);
    }
  },
);

// MARK: Get Profile API
export const getProfile = createAsyncThunk('api/getProfile', async token => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GET_PROFILE, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    CustomAlert({message: error?.response?.data?.message});
    console.log('Error in get profile:', error?.response?.data);
  }
});

// MARK: Delete photo API
export const deletePhoto = createAsyncThunk(
  'api/deletePhoto',
  async ({data, token}) => {
    try {
      const response = await axiosInstance.delete(
        ENDPOINTS.DELETE_PHOTO + '?imageName=' + data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return response.data;
    } catch (error) {
      CustomAlert({message: error?.response?.data?.message});
      console.log('Error in delete photo:', error?.response?.data);
    }
  },
);

// MARK: Update password API
export const updatePassword = createAsyncThunk(
  'api/updatePassword',
  async ({data, token}) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.UPDATE_PASSWORD,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      CustomAlert({message: response?.data?.message});
      return response.data;
    } catch (error) {
      CustomAlert({message: error?.response?.data?.message});
      console.log('Error in update password:', error?.response?.data);
    }
  },
);

// MARK: Forgot password API
export const forgotPassword = createAsyncThunk(
  'api/forgotPassword',
  async data => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.FORGOT_PASSWORD,
        data,
      );
      return response.data;
    } catch (error) {
      CustomAlert({message: error?.response?.data?.message});
      console.log('Error in forgot password:', error?.response?.data);
    }
  },
);

// MARK: Reset password API
export const resetPassword = createAsyncThunk(
  'api/resetPassword',
  async data => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.RESET_PASSWORD, data);
      CustomAlert({message: response?.data?.message});
      return response.data;
    } catch (error) {
      CustomAlert({message: error?.response?.data?.message});
      console.log('Error in reset password:', error?.response?.data);
    }
  },
);

// MARK: Edit/Verify email API
export const editEmail = createAsyncThunk(
  'api/editEmail',
  async ({data, token}) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.EDIT_EMAIL, data, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      CustomAlert({message: error?.response?.data?.message});
      console.log('Error in edit email:', error?.response?.data);
    }
  },
);

// MARK: Edit Phone Number API
export const editPhoneNumber = createAsyncThunk(
  'api/editPhoneNumber',
  async ({data, token}) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.EDIT_PHONE_NUMBER,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      CustomAlert({
        message: 'Your OTP is ' + response.data.data.phoneotp,
      });
      return response.data;
    } catch (error) {
      CustomAlert({message: error?.response?.data?.message});
      console.log('Error in edit email:', error?.response?.data);
    }
  },
);

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // MARK: Registration
      .addCase(registration.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.data.registrationResponse = action.payload;
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // MARK: Login
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data.loginResponse = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // MARK: Resend OTP
      .addCase(resendOTP.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.data.resendOTPResponse = action.payload;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // MARK: Verify OTP
      .addCase(verifyOTP.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.data.verifyOTPResponse = action.payload;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // MARK: Edit Profile
      .addCase(editProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data.editProfileResponse = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // MARK: Get Profile
      .addCase(getProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data.getProfileResponse = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // MARK: Delete Photo
      .addCase(deletePhoto.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.data.deletePhotoResponse = action.payload;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // MARK: Update Password
      .addCase(updatePassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.data.updatePasswordResponse = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // MARK: Edit/Verify Email
      .addCase(editEmail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.data.editEmailResponse = action.payload;
      })
      .addCase(editEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // MARK: Edit Phone
      .addCase(editPhoneNumber.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPhoneNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.data.editPhoneNumberResponse = action.payload;
      })
      .addCase(editPhoneNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
