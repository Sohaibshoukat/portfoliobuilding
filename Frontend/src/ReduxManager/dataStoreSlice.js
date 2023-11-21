import { createSlice } from '@reduxjs/toolkit'

export const dataStoreSlice = createSlice({
  name: 'dataStore',
  initialState: {
        personalInfo:{
                firstName:"",
                lastName:"",
                Email:"",
                Mobile:"",
                Address1:"",
                Address2:"",
                City:"",
                State:"",
                Pin:"",
                Objective:""
        },
        workEx: [
                {
                    title:"",
                    orgName:"",
                    startYear:"",
                    endYear:"",
                    jobDescription:"",
                }
        ],
        education:[
          {
                Type:"Graduation",
                University:"",
                Degree:"",
                Start:"",
                End:""
        }],
        skills:[{skillName:""}] ,
        selectedTemplate:"",
        imageFile:null,
        image:null,
        errorMessages:{},
        showErrorMessages:false,
  },


  reducers: {
    
    updatePersonalInfo: (state,action) => { 
      //this function updates the targeted key of the personalInfo element of dataStore //
        state.personalInfo[action.payload.key] =action.payload.value
    },

    updateWorkEx: (state, action) => {
      const { index, key, value } = action.payload;
    
      if (state.workEx[index]) {
        state.workEx[index][key] = value;
      } else {
        // If the index doesn't exist, create a new object in the array
        state.workEx[index] = { [key]: value };
      }
    },
    
    updateEducation: (state,action) =>{
      const { index, key, value } = action.payload;
    
      if (state.education[index]) {
        state.education[index][key] = value;
      } else {
        // If the index doesn't exist, create a new object in the array
        state.education[index] = { [key]: value };
      }
    },
    updateKeySkills: (state,action) =>{
      const { index, key, value } = action.payload;
    
      if (state.skills[index]) {
        state.skills[index][key] = value;
      } else {
        // If the index doesn't exist, create a new object in the array
        state.skills[index] = { [key]: value };
      }
    },
    updateState: (state,action) =>{
      //this function can be called to update any targeted element of dataStore //
      state[action.payload.key]=action.payload.value
    },
    updateErrorMessages: (state,action) =>{
      //this function updates errorMessages element of dataStore //
      let key = action.payload.key
      if(action.payload.index){
        key+='_'+action.payload.index
      }
      state.errorMessages[key]=action.payload.value
    },
    addArrayElement:(state,action) =>{
      //this function is used to push a blank object in the array of elements(workEx,education& keySkills)
      //when the user clicks on the Add-new button to add more related details//
      state[action.payload.key].push(action.payload.element)
    },
    removeArrayElement:(state,action) =>{
      //this function deletes the latest saved details in the array of elements(workEx,education& keySkills), when the user clicks on the remove button// 
      state[action.payload.key].pop()
    },

  }
})

export const { updatePersonalInfo, updateWorkEx,updateEducation,updateKeySkills,
  updateErrorMessages, updateState,addArrayElement,removeArrayElement } = dataStoreSlice.actions

export default dataStoreSlice.reducer