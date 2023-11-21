import { configureStore } from '@reduxjs/toolkit'
import dataStoreReducer from './dataStoreSlice'
import WebDataStore from './WebDataStore'
import WritterDataStore from './WritterDataStore'

export default configureStore({
  reducer: {
    dataStore: dataStoreReducer,
    WebStore:WebDataStore,
    WrittenStore:WritterDataStore
  }
})