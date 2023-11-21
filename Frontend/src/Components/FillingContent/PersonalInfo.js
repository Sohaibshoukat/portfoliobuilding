import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ProfilePicUploadComponent from './ProfileUpload'
import {stateNames} from '../Data/Data'
import TextField from '../InputComponents/TextField'
import TextArea from '../InputComponents/TextArea'
import BottomNavigation from './BottomNavigation'
import { updateWrittenState, updateErrorMessages } from '../../ReduxManager/WritterDataStore'

//this component renders Personal Info page inside the details filling page.
function PersonalInfo(props) {
  const dataStore= useSelector(state => state.WrittenStore) //this state is used to store personalInfo object of dataStoreSlice.
  const dispatch = useDispatch();
  const onChangeHandler= (key,value,errorMessage=undefined) =>{
    //this function is called each time when the user provides input to the targeted'TextField'
    dispatch(updateWrittenState({
      //this function updates the targeted key of the personalInfo element of dataStore in dataStoreSlice.js //
      key: key,
      value:value
   }))
   if(errorMessage!==undefined){
      dispatch(updateErrorMessages({
        // this function is called each time when there is a validatin check applied on the 'TextField' component and it inserts án object {key: errorMessage} into the errorMessages of dataStoreSlice.
        key:key,
        value:errorMessage
      }))
    }
  }
  return (
    <div style={{padding:"15px", textAlign:"left",}}>
        <div>
          <div>
            {/* ProfilePicUploadComponent is to show the selected profileImage in the resume uploaded by the user*/}
            <ProfilePicUploadComponent/>
          </div>
          <div className="row font" >
              <div className="col-lg-6 col-12 pt-5 px-4">
                <div className='row '>
                  <div className='col-sm-2  col-12'>
                    <label htmlFor="firstname" className="col-form-label ">First Name*</label>
                  </div>
                  <div className='col-sm-10 col-12'>
                      {/* TextField basically serves the purpose of validating the details filled by the user by calling updateErrorMessages function and also updates the value of targeted key by using onChange function */}
                      <TextField type="text" elementId="firstname"  placeholder="First name" 
                          value={dataStore.firstName}
                          onChange={
                            // this onChange will be called by TextField component as props.onChange when the user gives input to the targeted field and,
                            //the user given input will be send as value alongwith errorMessage , if there is any .
                            (value,errorMessage)=>{
                              //this function calls back onChangeHandler which will update targeted key of 'PersonalInfo' and 'errorMessages' in dataStoreSlice as per the value and errorMessage respectively.
                              onChangeHandler('firstName',value,errorMessage)
                            }
                          }
                          validation={{
                            //this attribute is used to check whether there is any validation check on the 'TextField' or not.
                            required:true,
                          }}
                      />
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-12 pt-5  px-4">
                  <div className='row'>
                    <div className='col-sm-2 col-12'>
                      <label htmlFor="lastname" className="col-form-label">Last Name</label>
                    </div>
                    <div className='col-sm-10 col-12'>
                      <TextField type="text" elementId="lastname"  placeholder="Last name" 
                            value={dataStore.lastName}
                            onChange={(value)=>{onChangeHandler('lastName',value)}}
                      />
                    </div>
                  </div>
              </div>
          </div>
          <div className="row font" >
              <div className="col-lg-6 col-12 pt-5 px-4">
                <div className='row '>
                  <div className='col-sm-2  col-12'>
                      <label htmlFor="staticEmail" className="col-sm-1 col-form-label">Email*</label>
                  </div>
                  <div className="col-sm-10  col-12">
                      <TextField type="text"  elementId="staticEmail" placeholder='users@example.com' 
                            validation={
                              {checkType:'email' , required:true}
                            }
                            value={dataStore.Email}
                            onChange={(value,errorMessage)=>{ onChangeHandler('Email',value,errorMessage) }}
                      />
                  </div>
                </div>
              </div>
          </div>
          <div className="row font">
              <div className="col-lg-6 col-12 pt-5 px-4">
                <div className='row '>
                  <div className='col-sm-2  col-12'>
                      <label htmlFor="mobile" className="col-sm-1 col-form-label">Mobile No.*</label>
                  </div>
                  <div className="col-sm-10  col-12">
                      <TextField type="number" elementId="Mobile" 
                            validation={
                              { 
                                maxLengthRequired:10 ,
                                required:true,
                              }
                            } 
                            value={dataStore.Mobile}
                            onChange={(value,errorMessage)=>{ onChangeHandler('Mobile',value,errorMessage) }}
                      />
                  </div>
                </div>
              </div>
          </div>

          <div className="row font" >
              <div className="col-lg-6 col-12 pt-5 px-4">
                <div className='row '>
                  <div className='col-sm-2  col-12'>
                      <label htmlFor="Web" className="col-sm-1 col-form-label">Your Website</label>
                  </div>
                  <div className='col-sm-10 col-12'>
                      <TextField type="text" elementId="Web" 
                            value={dataStore.Web}
                            onChange={(value)=>{ onChangeHandler('Web',value) }}
                      />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12 pt-5  px-4">
                <div className='row'>
                  <div className='col-sm-2 col-12'>
                    <label htmlFor="Facebook" className="col-sm-1 col-form-label">Your Facebook</label>
                  </div>
                  <div className='col-sm-10 col-12'>
                    <TextField type="text" elementId="Facebook" value={dataStore.Facebook}
                          onChange={(value)=>{ onChangeHandler('Facebook',value) }}
                    />
                  </div>
                </div>
              </div>
          </div>
    
          <div className="row font">
              <div className="col-lg-6 col-12 pt-5 px-4">
                <div className='row '>
                  <div className='col-sm-2  col-12'>
                    <label htmlFor="Linkdin" className="col-sm-1 col-form-label">Your Linkdin*</label>
                  </div>
                  <div className="col-sm-10 col-12">
                    <TextField type="text"  elementId="Linkdin" 
                          validation={
                            { required:true,}
                          } 
                          value={dataStore.Linkdin}
                          onChange={(value,errorMessage)=>{ onChangeHandler('Linkdin',value,errorMessage) }}
                    />
                  </div>
                </div>
              </div>
          </div>
          <div className=" row font">
              <div className="col-lg-6 col-12 pt-5 px-4">
                <div className='row '>
                  <div className='col-sm-2  col-12'>
                    <label htmlFor="Twitter" className="col-sm-1 col-form-label">Your Twitter</label>
                  </div>
                  <div className='col-sm-10  col-12'>
                    <TextField type="Twitter" className="form-control" id="Twitter" value={dataStore.Twitter}
                          onChange={(value)=>{ onChangeHandler('Twitter',value) }}
                    />
                  </div>
                </div>
              </div>
          </div>
          <div className=" row font">
              <div className="col-lg-12 col-12 pt-5 px-4">
                <div className='row '>
                  <div className='col-lg-1 col-sm-2 col-12'>
                    <label htmlFor="Textarea" className="col-sm-1 col-form-label">Objective</label>
                  </div>
                  <div className='col-lg-11 col-sm-10 col-12'>
                    <TextArea elementId="Textarea" rows="3" value={dataStore.Objective}
                              onChange={(value)=>{ onChangeHandler('Objective',value) }}
                    />
                  </div>
                </div>
              </div>
          </div>
        </div>
          {/* this BottomNavigation component displays 'previous' and 'next' button below the details fill form and will redirect the user to the 'previous page Path' and the 'nextPagePath' respectively. */}
        <BottomNavigation prevPagePath='/' nextPagePath='/fillingWritter/education' isFormValid={props.isFormValid}/>
        
    </div>
  )
}

export default PersonalInfo