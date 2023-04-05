import { StyleSheet, Text, SafeAreaView, View  } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { NavFavourites, NavOptions } from '../componenets';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';


const HomeScreen = () => {
const dispatch = useDispatch();
const navigation = useNavigation();

  return (
    <SafeAreaView style={tw `bg-white h-full`}>
      <View style={tw `p-5`}>
        <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-4xl mb-4 mt-4 font-semibold p-2`} >NirosX</Text>
        <Icon
           reverse
           name='settings'
           type='ionicon'
           color='#353939'
           size={18}
           onPress={() => navigation.navigate('ProfileScreen')}
        />
        </View>
        <GooglePlacesAutocomplete
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
        onPress={(data, details = null) => {
          dispatch(setOrigin({
            location:details.geometry.location,
            description: data.description
          }))
          dispatch(setDestination(null))
          navigation.navigate('MapScreen')
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        minLength={2}
        query={{
          key:GOOGLE_MAPS_APIKEY,
          language: "il"
        }}
        placeholder='Where From?'
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={400}
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})