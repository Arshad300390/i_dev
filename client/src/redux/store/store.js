import userReducer from '../slices/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],  // Only persist the 'user' slice
};


const rootReducer = combineReducers({
  user: userReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Turn off serializable check
    }),
});
const persistor = persistStore(store);

export { store, persistor };
