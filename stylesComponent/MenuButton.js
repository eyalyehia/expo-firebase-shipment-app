import { StyleSheet ,  View , TouchableOpacity} from 'react-native'
import {  Menu  , Divider } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserToken } from '../slices/userSlice';
import { useNavigation } from '@react-navigation/native';

const MenuButton = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const logout = async() => {
        try {
          await AsyncStorage.clear()
          dispatch(setUserToken(null)) 
          
        } catch (error) {
          console.log(`clear local not work clear :${error}`)
        }
      }

    const [visible, setVisible] = useState(true);

    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);
  return (
    <View style={tw`absolute right-7`}>
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={ <TouchableOpacity
        onPress={openMenu}
        style={tw`rounded-full bg-white p-2 shadow-lg`}>
         <Icon name='menu'/> 
        </TouchableOpacity>}>
          <View style={tw`flex-row items-center justify-center`}>
          <Icon
        name='users'
        type='font-awesome'
        style={tw`ml-3`}
        size={20}
        />
          <Menu.Item onPress={() => {
       navigation.navigate('ControllUser')
       closeMenu() 
        }} title="Users" />
          </View>
      <Menu.Item onPress={() => {
       navigation.navigate('RealTimeOrders')
       closeMenu() 
        }} leadingIcon="shopping" title="Orders" />
       <Menu.Item onPress={() => {
         navigation.navigate('AnalyticalToll')
         closeMenu() 
       }} leadingIcon="pencil" title="Analytical Tool" />
      <Divider />
      <Menu.Item onPress={logout} leadingIcon="logout" title="Log out" />
    </Menu>
  </View>
  )
}

export default MenuButton

const styles = StyleSheet.create({})