import {configureStore} from '@reduxjs/toolkit';
import apiSlice from '../slices/apiSlice';
import registerFormSlice from '../slices/registerFormSlice';

export const store = configureStore({
  reducer: {
    API: apiSlice,
    registerFormData: registerFormSlice,
  },
});
