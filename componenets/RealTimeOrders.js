import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React , { useState } from 'react';
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrder, selectRealTimeOrders, selectSingleOrder, selectUserInfoForModal } from '../slices/adminOrderSlice';
import UseModal from '../stylesComponent/UseModal';



const TableOrder = ({ order , setVisible , setUserid , setOrderid }) => {


  const dispath = useDispatch();

  const getRealTimeDataOrder = (userId,orderId) => {
    try {
      dispath(getSingleOrder([orderId , userId ]))
      setUserid(userId)
      setOrderid(orderId)
      setVisible(true)
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <DataTable style={tw`p-2`}>
    <DataTable.Header style={tw`bg-gray-300`}>
      <DataTable.Title>origin</DataTable.Title>
      <DataTable.Title>destination</DataTable.Title>
      <DataTable.Title style={tw`flex-row justify-center`}>distance</DataTable.Title>
      <DataTable.Title style={tw`flex-row justify-center`}>price</DataTable.Title>
    </DataTable.Header>
    <FlatList
    data={order}
    renderItem={({ item  : { order , orderId , sender }}) => (
      <TouchableOpacity
      style={tw`p-0.5`}
      onPress={() => getRealTimeDataOrder(sender , orderId)}
      >
      <DataTable.Row >
        <DataTable.Cell>{order?.origin?.description}</DataTable.Cell>
      <DataTable.Cell style={tw`flex-row justify-end`}>{order?.destination?.description}</DataTable.Cell>
      <DataTable.Cell style={tw`flex-row justify-center`}>{order?.trevelTimeInformation?.distance?.text}</DataTable.Cell>
      <DataTable.Cell style={tw`flex-row justify-center`}>{order?.price}</DataTable.Cell>
      </DataTable.Row>
      </TouchableOpacity>
    )}
    />

  </DataTable>
  )

}


const RealTimeOrders = () => {

  const realTimeOrders = useSelector(selectRealTimeOrders)
  const singleOrder = useSelector(selectSingleOrder)
  const userinfo = useSelector(selectUserInfoForModal)

  const [visible , setVisible] = useState(false);
  const [userid , setUserid] = useState(false);
  const [orderid , setOrderid] = useState(false);

  return (
      <View>
    <View style={tw`flex-row justify-evenly`}>
      <Text style={tw`text-xl font-semibold`}>RealTimeOrders</Text>
      <UseModal
       modalVisible={visible}
       setModalVisible={setVisible}
       userId={userid}
       orderId={orderid}
       order= {singleOrder}
       userinfo = {userinfo}
       />
    </View>
      <TableOrder
       order = {realTimeOrders}
       setVisible={setVisible}
       setUserid={setUserid}
       setOrderid={setOrderid}
       />
    </View>
  )
}

export default RealTimeOrders