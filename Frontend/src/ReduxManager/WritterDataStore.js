import { createSlice } from '@reduxjs/toolkit'

export const dataStoreSlice = createSlice({
  name: 'dataStore',
  initialState: {
    firstName: "",
    lastName: "",
    Email: "",
    Mobile: "",
    Web: "",
    Facebook: "",
    Linkdin: "",
    Twitter: "",
    Objective: "",
    education: [
      {
        Type: "Graduation",
        University: "",
        Degree: "",
        Start: "",
        Objective: ""
      }
    ],
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
    selectedTemplate: "",
    imageFile: null,
    image: null,
    errorMessages: {},
    showErrorMessages: false,
  },


  reducers: {
    updateEducationWritten: (state, action) => {
      const { index, key, value } = action.payload;

      if (state.education[index]) {
        state.education[index][key] = value;
      } else {
        // If the index doesn't exist, create a new object in the array
        state.education[index] = { [key]: value };
      }
    },
    updateWrittenState: (state, action) => {
      //this function can be called to update any targeted element of dataStore //
      state[action.payload.key] = action.payload.value
    },
    updateImageWritter: (state, action) => {
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
    addArrayElementcode: (state, action) => {
      const key = action.payload.key;
      if (!state.hasOwnProperty(key) || !Array.isArray(state[key])) {
        console.error(`Invalid key or state structure for ${key}`);
        return;
      }
      
      state[key].push(action.payload.element);
    },
    removeArrayElementcode: (state, action) => {
      const key = action.payload.key;
      if (!state.hasOwnProperty(key) || !Array.isArray(state[key])) {
        console.error(`Invalid key or state structure for ${key}`);
        return;
      }
    
      state[key].pop();
    },
    
    

  }
})

export const { updateEducationWritten, updateErrorMessages, updateWrittenState, addArrayElementcode, removeArrayElementcode,updateImageWritter } = dataStoreSlice.actions

export default dataStoreSlice.reducer