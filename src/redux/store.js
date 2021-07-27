import { applyMiddleware, createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
import { authReducer } from "./reducer/authReducer";
import { snackbarReducer } from "./reducer/snackbar";

const middleWare = [thunk];

const reducer = persistReducer(
  {
    key: "persistedStore", // key is required
    storage, // storage is now required

    whitelist: ["auth"],
  },
  combineReducers({
    authReducer,
    snackbarReducer,
  })
);

const configStore = (initialState = {}) => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare, logger))
  );

  return {
    persistor: persistStore(store),
    store,
  };
};

const { store, persistor } = configStore();

global.store = store;
export { store, persistor };
