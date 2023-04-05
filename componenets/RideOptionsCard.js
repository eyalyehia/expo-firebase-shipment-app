import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { selectTravelTimeInformation } from "../slices/navSlice";
import { setPriceForTravel } from "../slices/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { addUserOrder } from "../slices/userDetailsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectUserInfo } from "../slices/userSlice";

const data = [
  {
    id: "NirosX",
    title: "NirosX",
    multiplier: 1.7,
    image: "",
  },
  {
    id: "NirosH",
    title: "NirosH",
    multiplier: 1.3,
    image: "",
  },
  {
    id: "NirosD",
    title: "NirosD",
    multiplier: 1,
    image: "",
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState();
   const { username } = useSelector(selectUserInfo);
  const dispath = useDispatch();
  
  const setOrderAlert = () => {
    Alert.alert(`${username} שלום`, "האם אתה בטוח שברצונך לבצע את ההזמנה", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: setUserOrder,
      },
    ]);
  };

  const setUserOrder = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      dispath(addUserOrder(userId));
      Alert.alert('✔','!ההזמנה בוצעה בהצלחה')
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error)
    }
  };

  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <TouchableOpacity
        onPress={() => navigation.navigate("NavigateCard")}
        style={tw`absolute left-5 top-3 p-3 z-50 rounded-full`}
      >
        <Icon name="chevron-left" type="fontawesome" />
      </TouchableOpacity>

      <Text style={tw`text-xl text-center py-5`}>
        Select a Shipping -{" "}
        <Text style={tw`font-semibold`}>
          {travelTimeInformation?.distance?.text}
        </Text>
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(item);
              dispath(
                setPriceForTravel(
                  new Intl.NumberFormat("en-gb", {
                    style: "currency",
                    currency: "ILS",
                  }).format(
                    (travelTimeInformation?.duration?.value * 7 * multiplier) /
                      100
                  )
                )
              );
            }}
            style={tw`flex-row justify-evenly ${
              selected?.id === item.id && "bg-gray-300"
            } items-center p-2`}
          >
            <Icon name="motorcycle" type="font-awesome" size={60} />
            <View>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text style={tw`font-semibold`}>
                {travelTimeInformation?.duration?.text} Travel Time
              </Text>
            </View>
            <Text style={tw`text-lg`}>
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "ILS",
              }).format(
                (travelTimeInformation?.duration?.value * 7 * multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        disabled={!selected}
        style={tw`w-full bg-black py-3 rounded ${!selected && "bg-gray-300"} `}
        onPress={setOrderAlert}
      >
        <Text
          style={tw`text-white text-center
          text-xl font-semibold`}
        >
          Choose {selected?.title}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
