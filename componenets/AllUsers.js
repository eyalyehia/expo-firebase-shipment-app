import { StyleSheet, Text, View ,FlatList , TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, selectUsers } from '../slices/adminSlice';


const AllUsers = () => {
    const navigation = useNavigation();
    const dispath = useDispatch();
 

   const { users } = useSelector(selectUsers);

   const getUserData = async(id) => {
    try {
      dispath(getSingleUser(id))
      navigation.navigate('UserDetails');
      
    } catch (error) {
      console.log(error)
    }  
  }

   if(!users){
    return(
      <View style={tw`flex h-2/4 items-center justify-center`}>
      <Text  style={tw`font-bold text-xl`}>None Users exists!</Text>
    </View>
    )
  }

  return (
      <FlatList
     style={tw`flex-row `}
     data={users}
     keyExtractor={(item) => item.uid}
     numColumns={2}
     renderItem={({item : {email , uid , displayName }}) => (
      <TouchableOpacity
      style={tw`flex items-center justify-center bg-gray-300 m-1 p-2 w-36`}
      onPress={() => getUserData(uid)}
      >
      <Icon
      name="user"
      color='gray'
      type="font-awesome"
      size={30}
       />
       <Text style={tw`font-semibold`}>{displayName}</Text>
       <Text style={tw`font-thin`}> { email }  </Text>
     </TouchableOpacity>
     )}

     />
  )
}

export default AllUsers

const styles = StyleSheet.create({})