import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfilePicUploadComponent from './ProfileUpload'
import { stateNames } from '../Data/Data'
import TextField from '../InputComponents/TextField'
import TextArea from '../InputComponents/TextArea'
import BottomNavigation from './BottomNavigation'
import { updateStateweb, updateErrorMessages, updateImageWeb } from '../../ReduxManager/WebDataStore'
import { Link } from 'react-router-dom'

//this component renders Personal Info page inside the details filling page.
function PersonalInfo(props) {
  const Images= useSelector(state=> state.WebStore.Images)
  const personalHeads = useSelector(state => state.WebStore) //this state is used to store personalInfo object of dataStoreSlice.
  const dispatch = useDispatch();
  const onChangeHandler = (key, value, errorMessage = undefined) => {
    //this function is called each time when the user provides input to the targeted'TextField'
    dispatch(updateStateweb({
      //this function updates the targeted key of the personalInfo element of dataStore in dataStoreSlice.js //
      key: key,
      value: value
    }))
    if (errorMessage !== undefined) {
      dispatch(updateErrorMessages({
        // this function is called each time when there is a validatin check applied on the 'TextField' component and it inserts án object {key: errorMessage} into the errorMessages of dataStoreSlice.
        key: key,
        value: errorMessage
      }))
    }
  }

  function handleChange(index,e) {
    let file = e.target.files[0]
    const fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (validImageTypes.includes(fileType)) {
      let temp = URL.createObjectURL(file)
      console.log(file)
      console.log(temp);

      dispatch(updateImageWeb({
        key: 'image',
        value: file,
        index: index,
      }))
      dispatch(updateImageWeb({
        key: 'imageFile',
        value: temp,
        index: index,
      }))

    }
    else {
      alert('Uploaded file type should be jpg/png!')
    }
  }
  return (
    <div style={{ padding: "15px", textAlign: "left", }}>
      <div>
        <div>
          {/* ProfilePicUploadComponent is to show the selected profileImage in the resume uploaded by the user*/}
          <ProfilePicUploadComponent />
        </div>
        <div className="row font" >
          <div className="col-lg-6 col-12 pt-5 px-4">
            <div className='row '>
              <div className='col-sm-2  col-12'>
                <label htmlFor="firstname" className="col-form-label ">First Name*</label>
              </div>
              <div className='col-sm-10 col-12'>
                {/* TextField basically serves the purpose of validating the details filled by the user by calling updateErrorMessages function and also updates the value of targeted key by using onChange function */}
                <TextField type="text" elementId="firstname" placeholder="First name"
                  value={personalHeads.firstName}
                  onChange={
                    // this onChange will be called by TextField component as props.onChange when the user gives input to the targeted field and,
                    //the user given input will be send as value alongwith errorMessage , if there is any .
                    (value, errorMessage) => {
                      //this function calls back onChangeHandler which will update targeted key of 'PersonalInfo' and 'errorMessages' in dataStoreSlice as per the value and errorMessage respectively.
                      onChangeHandler('firstName', value, errorMessage)
                    }
                  }
                  validation={{
                    //this attribute is used to check whether there is any validation check on the 'TextField' or not.
                    required: true,
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
                <TextField type="text" elementId="lastname" placeholder="Last name"
                  value={personalHeads.lastName}
                  onChange={(value) => { onChangeHandler('lastName', value) }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row font" >
          <div className="col-lg-6 col-12 pt-5 px-4">
            <div className='row '>
              <div className='col-sm-2  col-12'>
                <label htmlFor="Experience" className="col-sm-1 col-form-label">Experince*</label>
              </div>
              <div className="col-sm-10  col-12">
                <TextField type="text" elementId="Experience" placeholder='10'
                  validation={
                    { required: true }
                  }
                  value={personalHeads.Experience}
                  onChange={(value, errorMessage) => { onChangeHandler('Experience', value, errorMessage) }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row font">
          <div className="col-lg-6 col-12 pt-5 px-4">
            <div className='row '>
              <div className='col-sm-2  col-12'>
                <label htmlFor="Project" className="col-sm-1 col-form-label">Project*</label>
              </div>
              <div className="col-sm-10  col-12">
                <TextField type="text" elementId="Project"
                  validation={
                    { required: true }
                  }
                  value={personalHeads.Project}
                  onChange={(value, errorMessage) => { onChangeHandler('Project', value, errorMessage) }}
                />
              </div>
            </div>
          </div>
        </div>


        <div className="row font">
          <div className="col-lg-6 col-12 pt-5 px-4">
            <div className='row '>
              <div className='col-sm-2  col-12'>
                <label htmlFor="Client" className="col-sm-1 col-form-label">Client*</label>
              </div>
              <div className="col-sm-10 col-12">
                <TextField type="text" elementId="Client"
                  validation={
                    { required: true, }
                  }
                  value={personalHeads.Client}
                  onChange={(value, errorMessage) => { onChangeHandler('Client', value, errorMessage) }}
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
                <TextArea elementId="Textarea" rows="3" value={personalHeads.Objective}
                  onChange={(value) => { onChangeHandler('Objective', value) }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container">

          <h2>Upload your projects</h2>
          <div className="row">
            <div>
              <div className="row">
                <img style={{ height: '150px', width: '100px', background: 'grey', padding: 0 }} src={Images[0].imageFile} alt='profile' />
              </div>
              <div className="row">
                <input type="file" onChange={(e)=>{handleChange('0',e)}} />
              </div>
            </div>
            <div>
              <div className="row">
                <img style={{ height: '150px', width: '100px', background: 'grey', padding: 0 }} src={Images[1].imageFile} alt='profile' />
              </div>
              <div className="row">
                <input type="file" onChange={(e)=>{handleChange('1',e)}}/>
              </div>
            </div>
            <div>
              <div className="row">
                <img style={{ height: '150px', width: '100px', background: 'grey', padding: 0 }} src={Images[2].imageFile} alt='profile' />
              </div>
              <div className="row">
                <input type="file" onChange={(e)=>{handleChange('2',e)}}/>
              </div>
            </div>
            <div>
              <div className="row">
                <img style={{ height: '150px', width: '100px', background: 'grey', padding: 0 }} src={Images[3].imageFile} alt='profile' />
              </div>
              <div className="row">
                <input type="file" onChange={(e)=>{handleChange('3',e)}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* this BottomNavigation component displays 'previous' and 'next' button below the details fill form and will redirect the user to the 'previous page Path' and the 'nextPagePath' respectively. */}
      <Link to='/WebTemplate'>
        <button className="btn btn-primary">Preview</button>
      </Link>

    </div>
  )
}

export default PersonalInfo