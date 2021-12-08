import { createStore, combineReducers, applyMiddleware } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import storageSession from "redux-persist/es/storage/session";

import { persistStore, persistReducer } from "redux-persist"; // app kapatılınca verileri tutar

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productsReducer } from "./products";
import { authReducer } from "./auth";
import { usersReducer } from "./users";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  products: productsReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
export default store;
