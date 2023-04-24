import { StyleSheet, Text, View , SafeAreaView, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { Icon } from 'react-native-elements';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { selectUserInfo } from '../slices/userSlice';


const NavigateCard = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { username } = useSelector(selectUserInfo);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Text style={tw`text-xl text-center py-5`}>Hello , {username}</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
      <View>
          <GooglePlacesAutocomplete
          styles={toInputBoxStyles}
              query={{
                key:GOOGLE_MAPS_APIKEY,
                language: "il"
              }}
              onPress={(data , details = null) => {
                dispatch(setDestination({
                    location:details.geometry.location,
                    description: data.description
                }))
                navigation.navigate('RideOptionsCard')
              }}
              fetchDetails={true}
              enablePoweredByContainer={false}
              minLength={2}
             placeholder='Where To?'
             nearbyPlacesAPI='GooglePlacesSearch'
             debounce={400}
          />
        </View>
        <NavFavourites />
        <View
        style={tw`flex-row bg-white justify-evenly py-2
         mt-auto border-t border-gray-100`}>
       
          <TouchableOpacity 
          onPress={() => navigation.navigate('RideOptionsCard')}
          style={tw`bg-black flex flex-row justify-between w-32 px-4 py-3 rounded-full `}>
            <Icon
             name='motorcycle'
             type='font-awesome' 
             color="white"
             size={16} />
            <Text style={tw`text-white text-center`}>Shipping</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full `}>
            <Icon
             name='fast-food-outline'
              type='ionicon'
               color="black"
                size={16} />
            <Text style={tw`text-center`} >Eats</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex:0,
},
textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
},
textInputContainer: {
   paddingHorizontal:20,
   paddingBottom:0,
}
})