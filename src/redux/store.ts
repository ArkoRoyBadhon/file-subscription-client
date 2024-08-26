import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/auth.slice";
import planReducer from "./features/plans/plan.slice";
import { api } from "./api/appSlice";


// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Configure persisted reducers
const persistedAuthReducer = persistReducer(
  { ...persistConfig, key: "auth" },
  authReducer
);
const persistedPlanReducer = persistReducer(
  { ...persistConfig, key: "plan" },
  planReducer
);


// Configure store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    plan: persistedPlanReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

// Configure persistor
const persistor = persistStore(store);

// Export types and store/persistor
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { persistor, store };
