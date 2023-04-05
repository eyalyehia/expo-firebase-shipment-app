import {createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile} from 'firebase/auth';
import {collection , setDoc , doc , serverTimestamp , getDoc  } from "firebase/firestore";
import { auth , db } from '../firebase_config';





const initialState = {
    isLoading:false,
    userToken:null,
    userInfo: {username:'guest'},
    error:null,
    role:'regular',
}

export const loginUserDetails = createAsyncThunk(
    'user/loginUserDetails',
    async(form , { rejectWithValue }) => {
      try{
       const { email , user_password } = form;
       if(!email || !user_password){
        throw {code:'all field require'}
       }
      let user;
      //sign in user
      await signInWithEmailAndPassword(auth,email,user_password)
      .then((userCredential) => {
        console.log('Account Logging')
         user = userCredential.user;
        })
      //get data from fireStore
       const docSnap =  await getDoc(doc(db,'users',user.uid));
       const data = docSnap.data();
       
     await AsyncStorage.setItem('token',user.stsTokenManager.accessToken)
     await AsyncStorage.setItem('userId',user.uid)
     return { user , data }
     }
     catch(error){
    return rejectWithValue(error)
     }
    }
);

export const submitUserDetails = createAsyncThunk(
    'user/submitUserDetails',
    async(form , { rejectWithValue }) => {
     try{
       const { email , user_password , confirmPassword , phone_number , fullname} = form;
     //check if all Credential ✔
       if(!email || !user_password || !confirmPassword || !phone_number || !fullname){
        throw {code:'all field require'}
      }
      if(user_password !== confirmPassword){
        throw {code:'password must to be match'}
      }
      let user;
      const users = collection(db, "users");

      //createUser
      await createUserWithEmailAndPassword(auth,email,user_password)
        .then((userCredential) => {
          console.log('Account Created')
          user = userCredential.user;
        })
      //save info in fireStore
      await setDoc(doc(users,user.uid), {
        displayName: fullname,
        phoneNumber: phone_number,
        role:'regular',
        created: serverTimestamp(),
        email
      });

        await updateProfile(user,{
          displayName:fullname
        })
        await AsyncStorage.setItem('token',user.stsTokenManager.accessToken)
        await AsyncStorage.setItem('userId',user.uid)
        return user
   
     }
     catch(error){
      return rejectWithValue(error)
     }
    }
);

export const userCheckRole = createAsyncThunk(
  'user/userCheckRoles',
  async(id , { rejectWithValue }) => {
      try {
       const docRef = doc(db,'users',id)
       const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        return data
      } catch (error) {
          return rejectWithValue(error)
      }
  }
);



export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserToken: (state,action) => {
        state.userToken = action.payload
        }
    },
     extraReducers: builder => {
    builder.addCase(loginUserDetails.pending,( state )  => {
            state.isLoading = true;
          })
    builder.addCase(loginUserDetails.fulfilled, (state , action) => {
      console.log(action)
          state.userInfo = {
          username:action.payload.user.displayName,
          userId:action.payload.user.uid }
          state.userToken = action.payload.user.stsTokenManager.accessToken;
          state.role = action.payload.data.role;
          state.isLoading = false;
        })
    builder.addCase(loginUserDetails.rejected,( state , { payload } )  => {
            state.isLoading = false;
            state.error = payload.code;
          })
    builder.addCase(submitUserDetails.pending,( state )  => {
            state.isLoading = true;
          })
    builder.addCase(submitUserDetails.fulfilled, (state , action) => {
         state.userInfo = {
          username:action.meta.arg.fullname,
          userId:action.payload.uid
        }
         state.userToken = action.payload.accessToken;
         state.role = 'regular';
         state.isLoading = false;
        })
    builder.addCase(submitUserDetails.rejected,( state , action )  => {
            state.isLoading = false;
            state.error = action.payload.code;
          })
    builder.addCase(userCheckRole.pending,( state )  => {
            state.isLoading = true;
          })
    builder.addCase(userCheckRole.fulfilled, (state , action) => {
                state.isLoading = false;
                state.userInfo = {
                  username:action.payload.displayName
                }
                state.role = action.payload.role;
        })
    builder.addCase(userCheckRole.rejected,( state , action )  => {
            state.isLoading = false;
            state.error = action.payload.code;
          })
      }
});

//Actions
export const { setUserToken } = userSlice.actions;

//Selectors
export const selectIsLoading = (state) => state.user.isLoading;
export const selectUserToken = (state) => state.user.userToken;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectError = (state) => state.user.error;
export const selectRole = (state) => state.user.role;

export default userSlice.reducer