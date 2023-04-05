import { FlatList, Text, View , TouchableOpacity , Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React , { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleUser, selectIsLoading, selectUserData } from '../slices/adminSlice';
import moment from "moment";
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import Loading from '../stylesComponent/Loading';
import UseModal from '../stylesComponent/UseModal';
import { getSingleOrder, selectSingleOrder } from '../slices/adminOrderSlice';
import EditModal from '../stylesComponent/EditModal';


const ProfileSettings = ({displayName , email , uid , creationTime , lastRefreshTime , lastSignInTime}) => {

  const dispath = useDispatch();
  const navigation = useNavigation();
  const [visible , setVisible] = useState(false);

  const handleDelete = (id) => {
    Alert.alert("Hi Admin","are you sure delete user?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress:() => {
          try {
            dispath(deleteSingleUser(id))
            Alert.alert('✔','המשתמש הוסר בהצלחה!')
            navigation.navigate('ControllUser')
          } catch (error) {
            console.log(error)
          }
        },
      },
    ]);
  };


  return(
    <View style={tw`flex items-center w-80 mx-auto mt-3`}>
      <EditModal modalVisible={visible} setModalVisible={setVisible} uid={uid}/>
    <Icon
    name="user"
    color='gray'
    type="font-awesome"
    size={40}
    />
    <Text style={tw`font-bold text-xl`}>User Details</Text>
    <View style={tw`flex items-start w-80 h-96 justify-evenly`}>
    <Text><Text style={tw`font-semibold text-lg`}>Name</Text> : {displayName}</Text>
    <Text><Text style={tw`font-semibold text-lg`}>Email</Text> : {email}</Text>
    <Text><Text style={tw`font-semibold text-lg`}>PhoneNumber</Text> : 052534933</Text>
    <Text><Text style={tw`font-semibold text-lg`}>Id</Text> : {uid}</Text>
    <Text><Text style={tw`font-semibold text-lg`}>creationTime</Text> : {moment(creationTime).format('LLL')}</Text>
    <Text><Text style={tw`font-semibold text-lg`}>lastRefreshTime</Text> : {moment(lastRefreshTime).format('LLL')}</Text>
    <Text><Text style={tw`font-semibold text-lg`}>lastSignInTime</Text> : {moment(lastSignInTime).format('LLL')}</Text>
    </View>
    <View
   style={tw`p-3 flex-row justify-between w-40`}
    >
    <TouchableOpacity
    style={tw`bg-white p-3 rounded-full shadow-lg`}
    >
      <Icon
      name="delete"
      color='gray'
      size={30}
      onPress={() => handleDelete(uid)}
      />
     </TouchableOpacity>
     <TouchableOpacity
     style={tw`bg-white p-3 rounded-full shadow-lg`}
     >
     <Icon
      name="edit"
      color='gray'
      type="font-awesome"
      size={30}
      onPress={() => setVisible(true)}
      />
     </TouchableOpacity>
    </View>
    </View>
  )

}


const OrderList = ({uid, userOrders }) => { 

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState();
  const singleOrder = useSelector(selectSingleOrder);

  const dispath = useDispatch();

  const getReviewToOrder = (orderId) =>{
    dispath(getSingleOrder([orderId , uid]))
    setId(orderId)
    setModalVisible(true);
  }

  return(
    <View style={tw`flex justify-center items-center mt-3 w-full`}>
    <Text style={tw`font-bold text-xl`}>Orders</Text>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Origin</DataTable.Title>
        <DataTable.Title>Destination</DataTable.Title>
        <DataTable.Title style={tw`flex-row justify-center`}>Price</DataTable.Title>
        <DataTable.Title style={tw`flex-row justify-center`}>Action</DataTable.Title>
      </DataTable.Header>
      <FlatList
     data={userOrders}
     keyExtractor={(item) => item.orderId}
     renderItem={({ item  : { order , orderId }}) => (
      <DataTable.Row>
      <DataTable.Cell>{order?.origin?.description}</DataTable.Cell>
      <DataTable.Cell style={tw`flex-row justify-end`}>{order?.destination?.description}</DataTable.Cell>
      <DataTable.Cell style={tw`flex-row justify-center`}>{order?.price}</DataTable.Cell>
      <DataTable.Cell style={tw`flex-row justify-center`}>
        <TouchableOpacity
        style={tw`p-2`}
        onPress={() => getReviewToOrder(orderId)}
        >
        <Icon 
       name='eye'
       type='font-awesome'
       />
        </TouchableOpacity>
      </DataTable.Cell>
      </DataTable.Row>
     )}
     />
     <UseModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      order={singleOrder}
      id={id}
      />
    </DataTable>
  </View>
  )
     }


const UserDetails = () => {

   const [selected,setSelected] = useState(false);
   const isLoading = useSelector(selectIsLoading);

  const {userdata , userOrders} = useSelector(selectUserData)
  const {uid , email , displayName , metadata} = userdata;


  if(isLoading){
    return(
      <Loading styling='flex justify-center items-center h-1/2' />
    )
  }

  return (
    <View style={tw`w-full`}>
         <View style={tw`flex-row justify-center w-full mt-1`}>
        <TouchableOpacity
         style={tw`bg-gray-800 w-36 h-8 flex items-center justify-center rounded-xl mr-3`}
         onPress={() => setSelected(false)}
         >
        <Text
         style={tw`text-white font-semibold`}
          >Profile Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={tw`bg-gray-800 w-36 h-8 flex items-center justify-center rounded-xl`}
        onPress={() => setSelected(true)}>
        <Text
         style={tw`text-white font-semibold`}
         >Order List</Text>
        </TouchableOpacity>
      </View>
 {selected ?
<OrderList
userOrders={userOrders}
uid={uid}
/>
   : 
   <ProfileSettings
   displayName={displayName}
   email={email}
   uid={uid}
   creationTime={metadata?.creationTime}
   lastRefreshTime={metadata?.lastRefreshTime}
   lastSignInTime={metadata?.lastSignInTime}/>
   }
    </View>
  )
}

export default UserDetails


