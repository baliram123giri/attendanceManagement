import { createStore, combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { layoutReducer } from "./layout.reducer";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

//  create persit config
const persistConfig = {
    key: "root",
    storage,
    expire: 10 * 1000
}


const rootreducer = combineReducers({ layoutReducer })
//create persist reducer 
const persistedReducer = persistReducer(persistConfig, rootreducer)
//create store 
export const store = createStore(persistedReducer)

// Persist and rehydrate the store
export const persistor = persistStore(store);