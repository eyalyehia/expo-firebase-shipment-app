import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc , getDoc, setDoc } from "firebase/firestore";
import { ref , remove } from 'firebase/database';
import { db , rtdb } from '../firebase_config';


const initialState = {
  realTimeOrders:[],
  singleOrder:null,
  userinfo:null,
    isLoading: false,
    thisIsLoading:false,
    isCompleteOrder:null,
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

  export const setCompleteOrderForUser = createAsyncThunk(
    'admin_order/setOrderFromDB',
    async(details,{ rejectWithValue }) => {
      try {
       const [userId, orderId , isDone , price] = details;
        const docRef = collection(db,`users/${userId}/orders`)
        const orderRef = ref(rtdb,`orders/${orderId}`)
          //  update fireStore
        if(isDone === false && price == null || ""){
         return rejectWithValue('No changes were made')
        }
        else if(price == null || ""){
          await setDoc(doc(docRef,orderId),{
            isDone:isDone
          },{ merge: true })
          await remove(orderRef);
        }
        else{
          await setDoc(doc(docRef,orderId),{
            isDone:isDone,
            price:price,
          },{ merge: true })
          await remove(orderRef);
        }
        return {message:'The order is complete'}
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  )



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
      builder.addCase(setCompleteOrderForUser.fulfilled, (state , action) => {
        state.isCompleteOrder = action.payload.message
        })
        builder.addCase(setCompleteOrderForUser.rejected,( state , { payload } )  => {
           state.isCompleteOrder = payload
        })
    }
  })


  export const { setOrders } = adminOrderSlice.actions;

  export const selectThisIsLoading = (state) => state.adminOrder.isLoading;
  export const selectSingleOrder = (state) => state.adminOrder.singleOrder;
  export const selectLoading = (state) => state.adminOrder.thisIsLoading;
  export const selectRealTimeOrders = (state) => state.adminOrder.realTimeOrders;
  export const selectUserInfoForModal = (state) => state.adminOrder.userinfo;
  export const selectIsCompleteOrder = (state) => state.adminOrder.isCompleteOrder;

  export default adminOrderSlice.reducer;
