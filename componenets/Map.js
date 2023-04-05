import { StyleSheet } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import React, { useEffect , useRef } from 'react'
import MapView , { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTrevelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';


const Map = () => {
const origin = useSelector(selectOrigin);
const destination = useSelector(selectDestination);
const dispath = useDispatch();

const mapRef = useRef(null);

const URL=`https://maps.googleapis.com/maps/api/distancematrix/json?
units=metric&origins=${origin.description}&destinations=
${destination?.description}&key=${GOOGLE_MAPS_APIKEY}`;

useEffect(() => {
if(!origin || !destination) return;

mapRef.current.fitToSuppliedMarkers(["origin","destination"], {
  edgePadding: {top:50 , right: 50 , bottom:50 ,left:50},
});

},[origin , destination]);

useEffect(() => {
  if(!origin || !destination) return;


const getTrevelTime = async() => {
   fetch(URL)
  .then((res) => res.json())
  .then(data => {
    dispath(setTrevelTimeInformation(data.rows[0].elements[0]))
  });
};

getTrevelTime();

},[origin , destination , GOOGLE_MAPS_APIKEY])

  return (
    <MapView
    ref={mapRef}
    style={tw`flex-1`}
    mapType="mutedStandard"
    initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}
  >
    {origin && destination &&
    (
      <MapViewDirections
        origin={origin.description}
        destination={destination.description}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="black"
      />
      )
    }
      
    {origin?.location && 
    <Marker
    coordinate={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
    }}
    title="מיקום"
    description={origin.description}
    identifier="origin"
    />}

    {destination?.location && 
    <Marker
    coordinate={{
      latitude: destination.location.lat,
      longitude: destination.location.lng,
    }}
    title="יעד"
    description={destination.description}
    identifier="destination"
    />}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})