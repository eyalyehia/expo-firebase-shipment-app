import { Text, View , Modal , TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import React , { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editSingleUser } from '../slices/adminSlice';

const details = {
    email:'',
    displayName:'',
}

const EditModal = ({modalVisible , setModalVisible,uid}) => {

    const [form, setForm] = useState(details);
    const dispath = useDispatch();
    
    const editUserDetail = () => {
        dispath(editSingleUser({id:uid,details:form}))
    }

  return (
      <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    >
      <View style={tw`w-80 bg-white m-auto h-1/2 rounded-xl`}>
         <View style={[tw`flex-row justify-center w-80 h-1/3 items-center`]}>
         <Text style={[tw`font-semibold text-3xl`]}>Edit Details</Text>
           <TouchableOpacity
             style={tw`p-1.5 rounded-full shadow-xl absolute top-2 left-2`}
             onPress={() => setModalVisible(!modalVisible)}>
               <Icon
               name='cancel'
               type='iconic'
               color='black'
              size={30}
               />
           </TouchableOpacity>        
         </View>
         <View style={tw`w-64 mx-auto flex h-52 justify-between`}>
         <TextInput
      label="Email"
      value={form.email}
      onChangeText={e => setForm({...form,email:e})}
    />
         <TextInput
      label="Name"
      value={form.displayName}
      onChangeText={e => setForm({...form,displayName:e})}
    />
          <TouchableOpacity
        style={tw`w-full bg-black py-3 rounded `}
        onPress={() => editUserDetail()}
      >
        <Text
          style={tw`text-white text-center
          text-xl font-semibold`}
        >
          Edit
        </Text>
      </TouchableOpacity>
         </View>
       </View>
    </Modal>
  )
}

export default EditModal