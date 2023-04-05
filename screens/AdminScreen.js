import { StyleSheet, Text, View , SafeAreaView, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ControllUser , RealTimeOrders , UserDetails , AnalyticalToll , Loading} from '../componenets';
import MenuButton from '../stylesComponent/MenuButton';
import tw from 'tailwind-react-native-classnames';
import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectThisIsLoading, setOrders } from '../slices/adminOrderSlice';
import { ref , onValue } from 'firebase/database';
import { rtdb } from "../firebase_config";
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const AdminScreen = () => {

  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const isLoading = useSelector(selectThisIsLoading);

  const dispath = useDispatch();

  const getRealTimeOrders = () => {


    try {
      const orderRef = ref(rtdb,"orders")
      onValue(orderRef , (snapshot) => {
         let order_ar = [];
         snapshot.forEach((item) => {
           let data = item.val();
           order_ar.push({"order":data.order
           ,"orderId":data.orderId,
           "sender":data.sender})
        })
        dispath(setOrders(order_ar))
      })
        } catch (error) {
          return console.log(error)
        }
      }

    useEffect(() => {
    getRealTimeOrders()
    },[])

    if(isLoading){
      return(
        <Loading styling='flex justify-center items-center h-1/2' />
      )
    }

  return (
    <SafeAreaView>
      <View style={tw`h-24 flex justify-center items-center`}>
    
      <TouchableOpacity
         style={tw`absolute top-9 left-9`}
         onPress={() => navigation.goBack()}
        >
       <Icon  name="chevron-left" type="fontawesome" size={30}/>
        </TouchableOpacity>
   
        <Text style={tw`text-2xl font-bold`}>Admin Dashboard</Text>
        <MenuButton />
      </View>
      <View style={tw`h-full`}>
      <Stack.Navigator>
          <Stack.Screen
          name='RealTimeOrders'
          component={RealTimeOrders}
          options={{
            headerShown:false
          }}
          />
          <Stack.Screen
          name='ControllUser'
          component={ControllUser}
          options={{
            headerShown:false
          }}
          />
          <Stack.Screen
          name='UserDetails'
          component={UserDetails}
          options={{
            headerShown:false
          }}
          />
          <Stack.Screen
          name='AnalyticalToll'
          component={AnalyticalToll}
          options={{
            headerShown:false
          }}
          />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  )
}

export default AdminScreen

const styles = StyleSheet.create({})