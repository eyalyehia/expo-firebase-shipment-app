import { FlatList, Text, TouchableOpacity, View , Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
    {
        id: "123",
        title:"Get a ride",
        image:"https://links.papareact.com/3pn",
        screen: "MapScreen",
    },
    {
        id: "456",
        title:"Order food",
        image:"https://links.papareact.com/28w",
        screen: "EatsScreen",
    }
]

const NavOptions = () => {
const origin = useSelector(selectOrigin)
const navigation = useNavigation();

  return (
  <FlatList
  data={data}
  keyExtractor={(item) => item.id}
  horizontal
  renderItem={({ item }) => (
<TouchableOpacity
 onPress={() => {item.screen === 'EatsScreen' ? {} : navigation.navigate(item.screen)}}
style={tw`p-2 pl-6 pb-8 pt-4 ${origin ? `bg-gray-200` : `opacity-20`}  m-2 w-40`}
disabled={!origin}
>
    <View>
<Image source={{uri:item.image}} style={{ width:120 , height:120 , resizeMode:'contain'}} />
<Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
     <Icon
        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
        color='white'
        name='arrowright'
        type='antdesign'
        />
    </View>
</TouchableOpacity>
  )
}
  />
  )
}

export default NavOptions