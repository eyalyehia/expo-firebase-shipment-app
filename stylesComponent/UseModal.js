import { Text, View, Modal, TouchableOpacity , Alert } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../slices/adminOrderSlice";
import Loading from "./Loading";
import { deleteOrder } from "../slices/userDetailsSlice";

const UseModal = ({ modalVisible, setModalVisible, order, id, userId , userinfo , orderId }) => {

  const thisIsLoading = useSelector(selectLoading);
  const dispath = useDispatch();

  const handleDelete = () => {
    Alert.alert('האם אתה בטוח','?אתה בטוח שברצונך למחוק את ההזמנה',[
      {
        text:'No'
      },
      {
        text:'Yes',
        onPress:() => {
       try {
        dispath(deleteOrder([orderId,userId]))
        setModalVisible(!modalVisible)
       } catch (error) {
        console.log(error)
       }
        }
      }
    ]);
  
  }

  if (thisIsLoading) {
    return (
      <View style={tw`w-80 m-auto h-1/2 rounded-xl`}>
        <Loading styling="flex justify-center items-center h-1/2" />
      </View>
    );
  }

  const date = new Date();
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={tw`w-80 bg-white m-auto ${userinfo ? 'h-3/5' : 'h-1/2'} rounded-xl`}>
        <View style={[tw`flex-row justify-center w-80 ${userinfo ? 'h-1/4' : 'h-1/3'} items-center`]}>
          <Text style={[tw`font-semibold text-3xl`]}>Order Details</Text>
          <TouchableOpacity
            style={tw`p-1.5 rounded-full shadow-xl absolute top-2 left-2`}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Icon name="cancel" type="iconic" color="black" size={30} />
          </TouchableOpacity>
        </View>
        <View style={tw`flex mx-3 ${userinfo ? 'h-3/4' : 'h-2/3 '} justify-evenly`}>
          <Text>
            {userinfo?.displayName
              ? `Invited By:${userinfo?.displayName}`
              : `UID: ${id}`}
          </Text>
          {userinfo && <Text>PhoneNumber:{userinfo.phoneNumber}</Text>}
          <Text>Origin: {order?.origin?.description}</Text>
          <Text>Destination: {order?.destination?.description}</Text>
          <Text
            style={tw`${
              order?.isDone
                ? "bg-green-400 text-white"
                : "bg-red-400 text-white"
            }`}
          >
            Status: {order?.isDone ? "Completed!" : "In Progress"}
          </Text>
          <Text>Distance: {order?.trevelTimeInformation?.distance?.text}</Text>
          <Text>
            TravelTime: {order?.trevelTimeInformation?.duration?.text}
          </Text>
          <Text>Price: {order?.price}</Text>
          <Text style={tw`mb-4`}>
            Created: {moment(date - order?.created?.seconds).format("LLL")}
          </Text>
        
        {userinfo && 
        <View style={tw`p-3 flex-row justify-between w-40 mx-auto`}>
          <TouchableOpacity style={tw`bg-white p-3 rounded-full shadow-lg`}>
            <Icon
              name="delete"
              color="gray"
              size={30}
              onPress={() => handleDelete()}
            />
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-white p-3 rounded-full shadow-lg`}>
            <Icon
              name="edit"
              color="gray"
              type="font-awesome"
              size={30}
            />
          </TouchableOpacity>
        </View>}
        </View>
      </View>
    </Modal>
  );
};

export default UseModal;
