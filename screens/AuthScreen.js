import { StyleSheet, Text, View ,SafeAreaView , TextInput , TouchableOpacity, Button } from 'react-native';
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
         placeholder='full name...'
         style={[tw`bg-gray-300 w-72 p-3 rounded-xl`,styles.textInput,styles.textInputContainer]}/>
          </View>
        )}

     <View style={tw`flex w-72 mr-6 mb-4`}>
      <TextInput
       keyboardType='email-address'
       onChangeText={e => setForm({...form, email : e})}
       maxLength={30}
       placeholder='email...'
       style={[tw`bg-gray-300 w-72 p-3 rounded-xl`,styles.textInput,styles.textInputContainer]}/>
     </View>

      {signUp && (
           <View style={tw`flex w-72 mr-6 mb-4`}>
           <TextInput
           keyboardType='numeric'
            onChangeText={e => setForm({...form, phone_number : e})}
            maxLength={10}
            placeholder='phoneNumber...'
            style={[tw`bg-gray-300 w-72 p-3 rounded-xl`,styles.textInput,styles.textInputContainer]}
            />
          </View>
      )}
  
     <View style={tw`flex w-72 mr-6 mb-4`}>
      <TextInput
       secureTextEntry
       onChangeText={e => setForm({...form, user_password : e})}
       maxLength={20}
       placeholder='password...'
       style={[tw`bg-gray-300 w-72 p-3 rounded-xl`,styles.textInput,styles.textInputContainer]}
       />
     </View>

     {signUp && (
     <View style={tw`flex w-72 mr-6`}>
     <TextInput
      secureTextEntry
      onChangeText={e => setForm({...form, confirmPassword : e})}
      maxLength={20}
      placeholder='password...'
      style={[tw`bg-gray-300 w-72 p-3 rounded-xl`,styles.textInput,styles.textInputContainer]}
      />
    </View>
     )}


      <Text style={tw`text-red-400 text-lg m-2 font-semibold`}>{error}</Text>
     <TouchableOpacity     
      style={tw`w-40 bg-black p-3 rounded-2xl ${!error && `mt-2`}`}
      >
        <Button
        onPress={submitForm}
         title={signUp ? "Sign Up" : "Sign In"}
         style={tw`text-white text-center
          text-xl font-semibold`}
         />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => setSignUp(prev => !prev)}
      >
      <Text 
        style={tw`text-gray-500 mt-3`}
       >{signUp ? "Already have an account?" : "Don't have an account?"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
       paddingHorizontal:20,
    }    
})