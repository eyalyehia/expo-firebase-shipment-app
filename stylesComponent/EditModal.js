import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSingleUser } from "../slices/adminSlice";
import { setCompleteOrderForUser , selectIsCompleteOrder } from "../slices/adminOrderSlice";

const details = {
  email: "",
  displayName: "",
};

const data = [
  { label: "Order Completed ✔", value: true },
  { label: "Order In Process", value: false },
];

const EditModal = ({ modalVisible, setEditModalVisible, uid, orderId, userId ,setUseModalVisible}) => {
  const [form, setForm] = useState(details);
  const [value, setValue] = useState(true);
  const [price, setPrice] = useState(null);
  const dispath = useDispatch();
  const isCompleteOrder = useSelector(selectIsCompleteOrder)

  const editUserDetail = () => {
    dispath(editSingleUser({ id: uid, details: form }));
  };

  const completeOrder = () => {
   dispath(setCompleteOrderForUser([userId,orderId,value,price]))
   setEditModalVisible(false)
   setUseModalVisible(false)
   alert(isCompleteOrder)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={tw`m-auto ${
          orderId ? "h-2/5 bg-gray-200 w-72" : "h-1/2 bg-white w-80"
        }  rounded-xl`}
      >
        <View style={[tw`flex-row justify-center
        ${orderId ? 'h-1/4' : 'h-1/3'}
        w-80  items-center`]}>
          <Text style={[tw`font-semibold text-3xl`]}>
            {orderId ? "Edit Order" : "Edit Details"}
          </Text>
          <TouchableOpacity
            style={tw`p-1.5 rounded-full shadow-xl absolute top-2 left-2`}
            onPress={() => setEditModalVisible(!modalVisible)}
          >
            <Icon name="cancel" type="iconic" color="black" size={30} />
          </TouchableOpacity>
        </View>
        <View style={tw`w-64 mx-auto flex ${orderId ? 'h-40' : 'h-52'}  justify-between`}>
          {uid && (
            <>
              <TextInput
                label="Email"
                value={form.email}
                onChangeText={(e) => setForm({ ...form, email: e })}
              />
              <TextInput
                label="Name"
                value={form.displayName}
                onChangeText={(e) => setForm({ ...form, displayName: e })}
              />
            </>
          )}

          {orderId && (
            <>
              <View style={[tw`items-end w-full`, styles.container]}>
                <Dropdown
                  style={[tw`w-full border rounded-lg
                  ${value && 'border-green-700 bg-green-100' }`, styles.dropdown]}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={[styles.inputSearchStyle]}
                  data={data}
                  labelField="label"
                  onChange={(item) => {
                    setValue(item.value);
                  }}
                />
              </View>
              <TextInput
              style={tw`mb-2`}
                label="Price"
                value={price}
                onChangeText={(e) => setPrice(e)}
                mode="outlined"
                keyboardType="numeric"
                maxLength={4}
              />
            </>
          )}

          <TouchableOpacity
            style={tw`w-full bg-black py-3 rounded `}
            onPress={() => {
              orderId ? completeOrder() : editUserDetail();
            }}
          >
            <Text
              style={tw`text-white text-center
          text-xl font-semibold`}
            >
             {orderId ? 'Complete an order' : 'Edit' } 
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
