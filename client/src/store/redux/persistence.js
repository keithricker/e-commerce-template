import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { combineReducers } from '@reduxjs/toolkit'
import { rootReducer } from './store'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: storage
}
export const rootReducers = combineReducers(rootReducer)
const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([thunk]),
})

setupListeners(store.dispatch)

let persistor = persistStore(store)

export default function Persistence({children}) {
  return (
    <PersistGate persistor={persistor}>
      {children}
    </PersistGate>
  )
}