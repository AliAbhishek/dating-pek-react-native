import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  gender: null,
  dob: null,
  height: null,
  prefer: null,
  lookingFor: null,
  occupation: null,
  designation: null,
  highestQualification: null,
  about: null,
  interest: [],
  images: [],
};

const registerFormSlice = createSlice({
  name: 'registerForm',
  initialState,
  reducers: {
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setDob: (state, action) => {
      state.dob = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setPrefer: (state, action) => {
      state.prefer = action.payload;
    },
    setLookingFor: (state, action) => {
      state.lookingFor = action.payload;
    },
    setOccupation: (state, action) => {
      state.occupation = action.payload;
    },
    setDesignation: (state, action) => {
      state.designation = action.payload;
    },
    setHighestQualification: (state, action) => {
      state.highestQualification = action.payload;
    },
    setAbout: (state, action) => {
      state.about = action.payload;
    },
    setInterest: (state, action) => {
      state.interest = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
  },
});

export const {
  setGender,
  setDob,
  setHeight,
  setPrefer,
  setLookingFor,
  setOccupation,
  setDesignation,
  setAbout,
  setInterest,
  setImages,
  setHighestQualification,
} = registerFormSlice.actions;

export default registerFormSlice.reducer;
