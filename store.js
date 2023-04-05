import { configureStore } from "@reduxjs/toolkit"
import navReducer  from './slices/navSlice';
import userReducer from './slices/userSlice';
import userDetailsReducer from "./slices/userDetailsSlice";
import adminReducer from './slices/adminSlice';
import adminOrderReducer from "./slices/adminOrderSlice";


export const store = configureStore({
    reducer:{
     nav:navReducer,
     user:userReducer,
     userDetails:userDetailsReducer,
     admin:adminReducer,
     adminOrder:adminOrderReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
       serializableCheck: false,
    }),
})