import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';




const NavFavourites = () => {
 
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)

  const data = [
    {
        id:"123",
        icon:"home",
        location: "Home",
        destination: origin?.description
    },
    {
        id:"456",
        icon:"briefcase",
        location: "Work",
        destination: destination?.description
    }
]


  return (
<FlatList data={data}
 keyExtractor={(item) => item.id}
 ItemSeparatorComponent={() => 
<View style={[tw`bg-gray-400`, { height: 0.5}]} />}
 renderItem={({ item : { icon , destination , location} }) => 
<TouchableOpacity style={tw`flex-row p-5 items-center`}>
    <Icon
    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
    name={icon}
    type="ionicon"
    color="white"
    size={18}
    />
    <View>
      <Text style={tw`font-semibold text-lg`} >{location}</Text>
      <Text style={tw`text-gray-500`} >{destination}</Text>
    </View>
</TouchableOpacity>
} />
  )
}

export default NavFavourites

const styles = StyleSheet.create({})