import { configureStore } from '@reduxjs/toolkit'
import cryptoReducer from './cryptoSlice'

// This creates our main store that holds all application state
export const store = configureStore({
  reducer: {
    crypto: cryptoReducer, // crypto state will be managed by cryptoSlice
  },
})
