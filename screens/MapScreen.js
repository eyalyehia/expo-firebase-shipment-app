import { StyleSheet, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Map, NavigateCard , RideOptionsCard } from '../componenets';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
const Stack = createNativeStackNavigator();
const navigation = useNavigation();


  return (
    <View>
      <TouchableOpacity
      onPress={()=> navigation.navigate('HomeScreen')}
      style={tw`z-50 absolute top-16 left-8 rounded-full bg-white p-2 shadow-lg`}>
       <Icon name='menu'/>
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
          name='NavigateCard'
          component={NavigateCard}
          options={{
            headerShown:false
          }}
          />
          <Stack.Screen
          name='RideOptionsCard'
          component={RideOptionsCard}
          options={{
            headerShown:false
          }}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})
