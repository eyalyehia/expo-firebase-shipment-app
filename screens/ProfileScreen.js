import { StyleSheet, Text, View , SafeAreaView ,TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { UserProfile , UserOrders } from '../componenets';
import React, { useState , useEffect } from 'react'
import { Icon } from 'react-native-elements';
import { setUserToken } from '../slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch  } from 'react-redux';
import { getUserData, getUserOrders } from '../slices/userDetailsSlice';





const ProfileScreen = () => {

const [selected,setSelected] = useState(true);
const [userId,setUserId] = useState('');

const dispatch = useDispatch();


const clearLocalStorage = async() => {
  try {
    await AsyncStorage.clear()
    dispatch(setUserToken(null)) 
    
  } catch (error) {
    console.log(`clear local not work clear :${error}`)
  }
}

  const getUser = async() => {
  try {
    const getUserId = await AsyncStorage.getItem('userId')
    setUserId(getUserId)
    dispatch(getUserData(getUserId))
  } catch (error) {
    console.log(error)
  }
}

const getOrdersForUser = async(isDone) => {
  try {
    const getUserId = await AsyncStorage.getItem('userId')
    dispatch(getUserOrders({ userId:getUserId,isDone }))
  } catch (error) {
    console.log(error)
  }
};

useEffect(() => {
  getUser();
  }, [])

  useEffect(() => {
    getOrdersForUser(false);
  },[])


  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-row justify-center w-full mt-10`}>
        <TouchableOpacity
         style={tw`bg-gray-800 w-36 h-8 flex items-center justify-center rounded-xl mr-3`}
         onPress={() => setSelected(true)}
         >
        <Text
         style={tw`text-white font-semibold`}
          >Profile Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={tw`bg-gray-800 w-36 h-8 flex items-center justify-center rounded-xl`}
        onPress={() => setSelected(false)}>
        <Text
         style={tw`text-white font-semibold`}
         >Order List</Text>
        </TouchableOpacity>
      </View>
      {selected ?
       <UserProfile userId={userId} getUser={getUser}/> :
       <UserOrders userId={userId} getOrdersForUser={getOrdersForUser} />}
      <TouchableOpacity
      style={tw`absolute bottom-8 right-8`}
      onPress={clearLocalStorage}
      >
        <Icon
        name='logout'
        size={25}
        />
        <Text
         style={tw`font-semibold`}
         >Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})