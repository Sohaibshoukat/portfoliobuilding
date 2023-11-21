import { createSlice } from '@reduxjs/toolkit'

export const WebDataStore = createSlice({
  name: 'dataStore',
  initialState: {
    firstName: "",
    lastName: "",
    Experience:"",
    Project:"",
    Client:"",
    Objective: "",
    selectedTemplate: "",
    imageFile: null,
    image: null,
    errorMessages: {},
    showErrorMessages: false,
    Images: [
      {
        imageFile: null,
        image: null,
      },
      {
        imageFile: null,
        image: null,
      },
      {
        imageFile: null,
        image: null,
      },
      {
        imageFile: null,
        image: null,
      }
    ],
  },


  reducers: {

    updateStateweb: (state, action) => {
      //this function can be called to update any targeted element of dataStore //
      state[action.payload.key] = action.payload.value
    },
    updateImageWeb: (state, action) => {
      const { index, key, value } = action.payload;

      if (state.Images[index]) {
        state.Images[index][key] = value;
      } else {
        // If the index doesn't exist, create a new object in the array
        state.Images[index] = { [key]: value };
      }
    },
    updateErrorMessages: (state, action) => {
      //this function updates errorMessages element of dataStore //
      let key = action.payload.key
      if (action.payload.index) {
        key += '_' + action.payload.index
      }
      state.errorMessages[key] = action.payload.value
    },

  }
})

export const {  updateErrorMessages, updateStateweb,updateImageWeb } = WebDataStore.actions

export default WebDataStore.reducer