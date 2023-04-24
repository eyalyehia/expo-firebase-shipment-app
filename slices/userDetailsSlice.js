import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc , getDoc, query , getDocs , where , setDoc , serverTimestamp , deleteDoc , orderBy, limit  } from "firebase/firestore";
import { ref , set , remove } from 'firebase/database';
import { db , rtdb } from '../firebase_config';

const initialState = {
    getUserDetails:null,
    userOrders:null,
    statusOrder:false,
}

export const getUserData = createAsyncThunk(
    'userdetails/getUserDetailsFromDB',
    async(id,{ rejectWithValue  }) => {
        try {
            const docRef = doc(db,"users",id);
            const docSnap = await getDoc(docRef);
           if(docSnap.exists()){
            const data = docSnap.data()
               return data
           }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
  );

  export const addUserOrder = createAsyncThunk(
 'userdetails/addUserOrderForDB',
  async(id,{ getState , rejectWithValue }) => {
    try {
        const { nav } = getState();
        const {destination , origin , trevelTimeInformation , orderDone , priceForTravel} = nav;
           const orderDoc = collection(db,`users/${id}/orders`);
           const q = query(collection(db,`users/${id}/orders`),where('isDone',"==",false),orderBy("created","desc"),limit(1));
           //update fireStore
           await setDoc(doc(orderDoc), {
            destination , origin , trevelTimeInformation,
            created: serverTimestamp(),
            isDone:orderDone,
            price:priceForTravel,
           });
           //update realTimeDataBase
           await getDocs(q)
           .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
              set(ref(rtdb,`orders/` + doc.id), {
                sender:id,
                order:doc.data(),
                orderId:doc.id
               })
           })
          })
           return nav;
    } catch (error) {
        return rejectWithValue(error)
    }
  });

  export const getUserOrders = createAsyncThunk(
    'userdetails/getUserOrdersFromDB',
    async(selectOrder , { rejectWithValue }) => {
        try {
         const {userId: id,isDone} = selectOrder;
         const order_ar = [];
         const q = 
         query(collection(db,`users/${id}/orders`),where('isDone',"==",isDone),orderBy("created","desc"));
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
            order_ar.push({
              order:doc.data(),
              orderId:doc.id
            })
           })
         return {isDone, order_ar} 
        } catch (error) {
            return rejectWithValue(error)
        }
    }
  );

  export const deleteOrder = createAsyncThunk(
    'userdetails/deleteOrderFromDB',
    async(userOrder,{rejectWithValue}) => {
      try {
        const [ orderId , userId ] = userOrder;
        const docRef = doc(db,`users/${userId}/orders`,orderId)
        const orderRef = ref(rtdb,`orders/${orderId}`)
        await deleteDoc(docRef);
        await remove(orderRef);
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  );



export const userDetailsSlice = createSlice({
    name:'userdetails',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getUserData.pending,(state) => {
            
        })
        builder.addCase(getUserData.fulfilled, (state , action) => {
         state.getUserDetails = action.payload
          })
          builder.addCase(getUserData.rejected,( state , { payload } )  => {
             console.log(payload)
          })
          builder.addCase(addUserOrder.fulfilled, (state , action) => {
            console.log(action)
          })
          builder.addCase(addUserOrder.rejected,( state , { payload } )  => {
            console.log(payload)
         })
          builder.addCase(getUserOrders.fulfilled, (state,{ payload }) => {
            state.userOrders = payload.order_ar;
            state.statusOrder = payload.isDone;
          })
          builder.addCase(getUserOrders.rejected,( state , { payload } )  => {
            console.log(payload)
         })
          builder.addCase(deleteOrder.fulfilled, (state,action) => {
            console.log(action)
          })
          builder.addCase(deleteOrder.rejected,( state , { payload } )  => {
            console.log(payload)
         })
    }
});


//Selectors
export const selectGetUserDetails = (state) => state.userDetails.getUserDetails;
export const selectUserOrders = (state) => state.userDetails.userOrders;
export const selectStatusOrder = (state) => state.userDetails.statusOrder;

export default userDetailsSlice.reducer;