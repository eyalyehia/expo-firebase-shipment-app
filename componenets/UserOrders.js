import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import tw from "tailwind-react-native-classnames";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "react-native-elements";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, selectStatusOrder, selectUserOrders } from "../slices/userDetailsSlice";

const data = [
  { label: "הזמנות שבוצעו", value: true },
  { label: "הזמנות בביצוע", value: false },
];

const UserOrders = ({ userId, getOrdersForUser }) => {
  const userOrders = useSelector(selectUserOrders);
  const statusOrder = useSelector(selectStatusOrder)
  const dispatch = useDispatch();

  const date = Date.now()

  const deleteUserOrder = async (orderId) => {
    Alert.alert('האם אתה בטוח','?אתה בטוח שברצונך למחוק את ההזמנה',[
      {
        text:'No'
      },
      {
        text:'Yes',
        onPress:() => {
          try {
            dispatch(deleteOrder([orderId, userId]));
            Alert.alert("ההזמנה נמחקה בהצלחה!");
          } catch (error) {
            console.log(error)
          }finally{
            getOrdersForUser(false)
          }
        }
      }
    ])
  };

  return (
    <View>
      <View style={[tw`items-end w-full`, styles.container]}>
        <Dropdown
          style={[
            tw`w-36 border rounded-2xl`,
            styles.dropdown,
          ]}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={[styles.inputSearchStyle]}
          data={data}
          labelField="label"
          valueField="value"
          onChange={(item) => {
            getOrdersForUser(item.value);
          }}
        />
      </View>
      {userOrders.length === 0 && (
        <View style={tw`items-center mt-8`}>
          <Text style={tw`font-semibold text-xl`}>No order Yet!</Text>
        </View>
      )}
      <FlatList
        data={userOrders}
        keyExtractor={(item) => item.orderId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: { order, orderId } }) => (
          <TouchableOpacity
            style={tw`border rounded-2xl mx-4 flex-row justify-between items-center p-4 mt-2`}
          >
            {!statusOrder && (
              <TouchableOpacity
                onPress={() => deleteUserOrder(orderId)}
                style={tw`p-2`}
              >
                <Icon name="delete" size={35} />
              </TouchableOpacity>
            )}
            <View style={tw`flex items-end ${statusOrder && "w-full items-center"}`}>
              <Text style={tw`font-semibold`}>
                מוצא:{order?.origin?.description}
              </Text>
              <Text style={tw`font-semibold`}>
                יעד:{order?.destination?.description}
              </Text>
              <Text style={tw`font-semibold`}>מחיר:{order?.price}</Text>
              <Text style={tw`font-semibold`}>
                ק"מ:{order?.trevelTimeInformation?.distance?.text}
              </Text>
              <Text style={tw`font-semibold`}>
                הזמנה נוצרה:{moment(date - order?.created?.nanoseconds).format('LLL')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default UserOrders;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
