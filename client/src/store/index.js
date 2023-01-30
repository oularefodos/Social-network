import userReducer from "../reducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, REGISTER, PURGE } from 'redux-persist'
import storage from "redux-persist/lib/storage";


const persistConfig = {key: "root", storage, version: 1};
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer : persistedReducer,
    // middleware: (getDefaultMiddleware) => {
    //     getDefaultMiddleware({
    //         serializableCheck : {
    //             ignoreActions : [PURGE, REGISTER]
    //         }
    //     })
    // }
});

export const persistor =  persistStore(store);

