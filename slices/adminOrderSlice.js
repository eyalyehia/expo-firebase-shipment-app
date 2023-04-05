import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  doc , getDoc } from "firebase/firestore";
import { db } from '../firebase_config';


const initialState = {
  realTimeOrders:[],
  singleOrder:null,
  userinfo:null,
    isLoading: false,
    thisIsLoading:false,
  };


  export const getSingleOrder = createAsyncThunk(
    'admin_order/getSingleOrderFromDB',
    async(selectOrder , { rejectWithValue }) => {
        try {
          const [orderId , uid] = selectOrder;
          const docRef = doc(db,`users/${uid}/orders`,orderId)
          const docRefForName = doc(db,'users',uid)
          const docSnap = await getDoc(docRef);
          const docSnapForName = await getDoc(docRefForName);
          if(docSnap.exists() && docSnapForName.exists()){
            const data = docSnap.data();
            const name = docSnapForName.data();
            return {data , name}
          }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
  );



  export const adminOrderSlice = createSlice({
    name:'admin_order',
    initialState,
    reducers:{
      setOrders: (state,action) => {
        console.log(action)
        state.realTimeOrders = action.payload
        }
    },
    extraReducers: (builder) => {
      builder.addCase(getSingleOrder.pending,(state) => {
   state.thisIsLoading = true
      })
      builder.addCase(getSingleOrder.fulfilled, (state , action) => {
       state.singleOrder = action.payload.data;
       state.userinfo = action.payload.name;
       state.thisIsLoading = false
        })
        builder.addCase(getSingleOrder.rejected,( state , { payload } )  => {
          state.thisIsLoading = false
           console.log(payload)
        })
    }
  })


  export const { setOrders } = adminOrderSlice.actions;

  export const selectThisIsLoading = (state) => state.adminOrder.isLoading;
  export const selectSingleOrder = (state) => state.adminOrder.singleOrder;
  export const selectLoading = (state) => state.adminOrder.thisIsLoading;
  export const selectRealTimeOrders = (state) => state.adminOrder.realTimeOrders;
  export const selectUserInfoForModal = (state) => state.adminOrder.userinfo;

  export default adminOrderSlice.reducer;
