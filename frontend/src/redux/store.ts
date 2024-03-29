import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './authSlice';
import languageReducer from './languageSlice';
import courseReducer from './courseSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedLanguageReducer = persistReducer(persistConfig, languageReducer);
const persistedCourseReducer = persistReducer(persistConfig, courseReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    language: persistedLanguageReducer,
    course: persistedCourseReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
