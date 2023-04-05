import { Text, View } from 'react-native';
import React , { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, selectIsLoading } from '../slices/adminSlice';
import tw from 'tailwind-react-native-classnames';
import { AllUsers} from '../componenets';
import Loading from '../stylesComponent/Loading';



const ControllUser = () => {

  const dispath = useDispatch();
  const isLoading = useSelector(selectIsLoading)

  const getAllUsersFromServer = () =>{
    dispath(getAllUsers())
  }

  useEffect(() => {
    getAllUsersFromServer()
  },[])


  if(isLoading){
    return(
      <Loading styling='flex justify-center items-center h-1/2' />
    )
  }

  return (
    <View style={tw`w-80 mx-auto`}>
    <View style={tw`flex-row justify-evenly mb-2`}>
      <Text style={tw`text-xl font-semibold`}>All Users</Text>
    </View>
      <AllUsers/>
    </View>
  )
}

export default ControllUser