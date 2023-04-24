import { Text, View ,SafeAreaView , TouchableOpacity, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import React, { useState } from 'react';
import { submitUserDetails , loginUserDetails, selectError } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const initialForm = {
  fullname:'',
  email: '',
  phone_number:'',
  user_password:'',
  confirmPassword:''
}


const AuthScreen = () => {

  const [signUp,setSignUp] = useState(true);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [confirmIsPasswordSecure, setConfirmIsPasswordSecure] = useState(true);
  const dispatch = useDispatch();

  const error = useSelector(selectError)
  
  const [form,setForm] = useState(initialForm)

    const submitForm = async() => {
          try {
          signUp ?
           dispatch(submitUserDetails(form)) :
           dispatch(loginUserDetails(form));
          } catch (error) {
            console.log(error)
          }
    }


  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
        <View style={tw`w-full`}>
        <Text style={tw`text-4xl mb-4 mt-4 mx-4 font-semibold p-2`} >NirosX</Text>
        </View>
        {signUp && (
        <View style={tw`flex w-72 mr-6 mb-4`}>
        <TextInput
         onChangeText={e => setForm({...form, fullname : e})}
         maxLength={20}
         label='Full Name'/>
          </View>
        )}

     <View style={tw`flex w-72 mr-6 mb-4`}>
      <TextInput
       keyboardType='email-address'
       onChangeText={e => setForm({...form, email : e})}
       maxLength={30}
       label="Email"
      />
     </View>

      {signUp && (
           <View style={tw`flex w-72 mr-6 mb-4`}>
           <TextInput
           keyboardType='numeric'
            onChangeText={e => setForm({...form, phone_number : e})}
            maxLength={10}
            label='PhoneNumber'
           
            />
          </View>
      )}
  
     <View style={tw`flex w-72 mr-6 mb-4`}>
      <TextInput
       right={<TextInput.Icon icon="eye" onPress={() => setIsPasswordSecure(prev => !prev)} />}
       secureTextEntry={isPasswordSecure}
       onChangeText={e => setForm({...form, user_password : e})}
       maxLength={20}
       label='Password'
      
       />
     </View>

     {signUp && (
     <View style={tw`flex w-72 mr-6`}>
     <TextInput
       right={<TextInput.Icon icon="eye" onPress={() => setConfirmIsPasswordSecure(prev => !prev) } />}
      secureTextEntry={confirmIsPasswordSecure}
      onChangeText={e => setForm({...form, confirmPassword : e})}
      maxLength={20}
      label='Confirm Password'
      disabled={form?.user_password.length? false : true}
      />
    </View>
     )}


      <Text style={tw`text-red-400 text-lg m-2 font-semibold`}>{error}</Text>
     <TouchableOpacity     
      style={tw`w-72 bg-black p-2 rounded-xl ${!error && `mt-2`}`}
      >
        <Button
        onPress={submitForm}
         title={signUp ? "Sign Up" : "Sign In"}
         style={tw`text-center
          text-xl font-semibold`}
          color='white'
         />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => setSignUp(prev => !prev)}
      >
      <Text 
        style={tw`mt-4 text-indigo-600`}
       >{signUp ? "Already have an account?" : "Don't have an account?"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AuthScreen