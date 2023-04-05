import React, { useEffect } from 'react';
import { HomeScreen , MapScreen , AuthScreen , ProfileScreen, AdminScreen } from './screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { selectIsLoading, selectRole, selectUserToken, userCheckRole } from './slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from './slices/userSlice'
import Loading from './stylesComponent/Loading';




export default function App() {

  const Stack = createNativeStackNavigator();
  
  const dispath = useDispatch();
  const token = useSelector(selectUserToken);
  const role = useSelector(selectRole);
  const loading = useSelector(selectIsLoading);

  const isLoggedIn = async() => {
    try {
        let userToken = await AsyncStorage.getItem('token');
        dispath(setUserToken(userToken));
    } catch (error) {
        console.log(`isLoggedIn ${error}`)
    }
}

const checkRoleUser = async() => {
  try {
    let userId = await AsyncStorage.getItem('userId');
    dispath(userCheckRole(userId))
  } catch (error) {
    console.log(`checkRole ${error}`)
  }
}

  useEffect(() => {
    isLoggedIn()
  },[])

  useEffect(() => {
    checkRoleUser()
  },[])

  if(loading){
    return(
      <Loading styling='flex-1 items-center justify-center' />
    )
  }

  return (
  
      <NavigationContainer>
      <SafeAreaProvider>
       <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={{ flex : 1 }}
       keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
       >
        <Stack.Navigator>
       { token === null ?
        <Stack.Screen
       name='AuthScreen'
       component={AuthScreen}
       options={{
        headerShown: false,
       }}
       /> :
       role === 'admin' ? 
       <Stack.Screen
       name='AdminScreen'
       component={AdminScreen}
       options={{
        headerShown: false,
       }}
       /> :
       <>
       <Stack.Screen
       name='HomeScreen'
       component={HomeScreen}
       options={{
        headerShown: false,
       }}
       />
       <Stack.Screen
       name='MapScreen'
       component={MapScreen}
       options={{
        headerShown: false,
       }}
       />
       <Stack.Screen
       name='ProfileScreen'
       component={ProfileScreen}
       options={{
        headerShown: false,
       }}
       />
       </>
       }
       </Stack.Navigator>
       </KeyboardAvoidingView>
      </SafeAreaProvider>
      </NavigationContainer>
  );
}

