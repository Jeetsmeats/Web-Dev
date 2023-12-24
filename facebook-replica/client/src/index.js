import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import authReducer from './state';    // authentication reducer (for login)
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
// import the following redux persist items for configuration
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';     // allows the storage of user info in the local state - no resigning in
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// the following code is from standard persist documentation
// All to avoid persist warnings
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
