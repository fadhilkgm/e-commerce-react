import { compose, applyMiddleware } from "redux";
import { loggerMiddleware } from "./middleware/logger";
import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./root-reducer";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
// import { logger } from 'redux-logger';
//root reducer

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "development" && loggerMiddleware,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== "development" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: [
     ...middleWares
    ],
  },
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
