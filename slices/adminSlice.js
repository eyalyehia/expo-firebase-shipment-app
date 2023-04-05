import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase_config";
import { collection, getDocs , doc , deleteDoc, updateDoc } from "firebase/firestore";
import axios from "axios";

const initialState = {
  users: [],
  userData: {
    userdata : {},
    userOrders : {}
  },
  panelAdminErrors: null,
  isLoading: false,
};

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://192.168.1.29:3001");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSingleUser = createAsyncThunk(
  "admin/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const order_ar = [];
      const refCollection = collection(db, `users/${id}/orders`);
      const response = await axios.get(`http://192.168.1.29:3001/user/${id}`);
      const querySnapshot = await getDocs(refCollection);
      querySnapshot.forEach((doc) => {
        order_ar.push({
          order: doc.data(),
          orderId: doc.id,
        });
      });
      return { response, order_ar };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editSingleUser = createAsyncThunk(
  'admin/editUserFromDB',
  async(userDetails,{ rejectWithValue }) => {
    try {
      const {id , details} = userDetails;
      const response = await axios.put(`http://192.168.1.29:3001`,{
        uid:id,
        details
      });
      const {displayName , email} = details
      const docRef = doc(db,"users",id)
      await updateDoc(docRef,{displayName , email})
      return response;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const deleteSingleUser = createAsyncThunk(
  'admin/deleteUserFromDB',
  async(id,{rejectWithValue}) => {
    try {
      const docRef = doc(db,`users`,id)
      await deleteDoc(docRef)
      await axios.delete(`http://192.168.1.29:3001/user/${id}`)
     const response = await axios.get("http://192.168.1.29:3001");
      return response;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.users = payload.data;
      state.isLoading = false;
    });
    builder.addCase(getAllUsers.rejected, (state, { payload }) => {
      state.panelAdminErrors = payload.message;
      state.isLoading = false;
      console.log(payload);
    });
    builder.addCase(getSingleUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleUser.fulfilled, (state, { payload }) => {
      state.userData = { 
        userdata : payload.response.data,
        userOrders : payload.order_ar
      }
      state.isLoading = false;
    });
    builder.addCase(getSingleUser.rejected, (state, { payload }) => {
      state.panelAdminErrors = payload.message;
      state.isLoading = false;
      console.log(payload);
    });
    builder.addCase(deleteSingleUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSingleUser.fulfilled, (state, { payload }) => {
    console.log(payload)
    state.users = payload.data;
      state.isLoading = false;
    });
    builder.addCase(deleteSingleUser.rejected, (state, { payload }) => {
      state.panelAdminErrors = payload.message;
      state.isLoading = false;
      console.log(payload);
    });
    builder.addCase(editSingleUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editSingleUser.fulfilled, (state, action) => {
      state.userData.userdata = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(editSingleUser.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action)
    });
  },
});

export const selectUsers = (state) => state.admin.users;
export const selectPanelAdminErrors = (state) => state.admin.panelAdminErrors;
export const selectIsLoading = (state) => state.admin.isLoading;
export const selectUserData = (state) => state.admin.userData;

export default adminSlice.reducer;
