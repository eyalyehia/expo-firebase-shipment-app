import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { db , auth } from "../firebase_config";
import { doc, updateDoc } from "firebase/firestore";
import tw from "tailwind-react-native-classnames";
import React, { useState } from "react";
import { updateEmail , reauthenticateWithCredential , EmailAuthProvider , updatePassword , updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectGetUserDetails } from "../slices/userDetailsSlice";




const upDateForm = {
  displayName: '',
  email:'',
  phoneNumber:'',
  user_password: "",
  newPassword: "",
};


const UserProfile = ({ userId , getUser}) => {

  const [userUpdate, setUserUpDate] = useState(upDateForm);


  const user = auth.currentUser;
  const userDetails = useSelector(selectGetUserDetails)

//בדיקת אוטנטיקציה חוזרת לשינוי אימיל וסיסמא
  const reAuthenticate = async() => {
    const credential = EmailAuthProvider.credential(
     user.email,
     userUpdate.user_password
 )
    const result = await reauthenticateWithCredential(user,credential)
    return result
  }

  const setUserDetails = async() => {
    try {
      if(userUpdate.email.length){
        if(userUpdate.user_password.length){
          await reAuthenticate();
           updateEmail(user,userUpdate.email)
           .then(() => Alert.alert('email changed successfully'))
           .catch((error) => console.log(error))
        }
        else throw Alert.alert('you must insert password')
      }
     else if(userUpdate.newPassword.length && userUpdate.user_password.length){
        await reAuthenticate();
        updatePassword(user,userUpdate.newPassword)
        .then(() => Alert.alert('Password updated!'))
        .catch((error) => console.log(error))
      }
      userUpdate.email.length? userUpdate.email : userUpdate.email = userDetails.email;
      userUpdate.phoneNumber.length? userUpdate.phoneNumber : userUpdate.phoneNumber = userDetails.phoneNumber;
      userUpdate.displayName.length? userUpdate.displayName : userUpdate.displayName = userDetails.displayName;
      const {email , phoneNumber , displayName} = userUpdate;
      const docRef = doc(db,"users",userId);
      await updateProfile(user,{
        displayName:displayName
      })
      await updateDoc(docRef ,{email,phoneNumber,displayName})
      .then(() => Alert.alert('✔','הנתונים השתנו בהצלחה!'));
      userUpdate.email = ''
      userUpdate.phoneNumber = ''
      userUpdate.displayName = ''
      userUpdate.newPassword = ''
      userUpdate.user_password = ''
      getUser()
    } catch (error) {
      console.log(error)
    }
  };






  return (
    <View>
      <Text style={tw`font-bold text-2xl text-center p-4`}>User Details</Text>
      <View style={tw`w-4/5 mx-auto`}>
        <Text style={tw`text-gray-800 mb-2 text-lg font-extralight`}>
          Full Name
        </Text>
        <TextInput
          onChangeText={(e) => setUserUpDate({ ...userUpdate, displayName: e })}
          value={userUpdate.displayName}
          maxLength={20}
          placeholder={userDetails?.displayName}
          placeholderTextColor='black'
          style={[
            tw`bg-gray-300 w-72 p-3 rounded-xl`,
            styles.textInput,
            styles.textInputContainer,
          ]}
        />
      </View>
      <View style={tw`w-4/5 mx-auto`}>
        <Text style={tw`text-gray-800 my-2 text-lg font-extralight`}>
          Email Address
        </Text>
        <TextInput
          onChangeText={(e) => setUserUpDate({ ...userUpdate, email: e })}
          value={userUpdate.email}
          keyboardType="email-address"
          placeholder={userDetails?.email}
          placeholderTextColor='black'
          maxLength={20}
          style={[
            tw`bg-gray-300 w-72 p-3 rounded-xl`,
            styles.textInput,
            styles.textInputContainer,
          ]}
        />
      </View>
      <View style={tw`w-4/5 mx-auto`}>
        <Text style={tw`text-gray-800 my-2 text-lg font-extralight`}>
          Phone Number
        </Text>
        <TextInput
          onChangeText={e => setUserUpDate({...userUpdate, phoneNumber : e})}
          keyboardType="numeric"
          value={userUpdate.phoneNumber}
          placeholder={userDetails?.phoneNumber}
          placeholderTextColor='black'
          maxLength={10}
          style={[
            tw`bg-gray-300 w-72 p-3 rounded-xl`,
            styles.textInput,
            styles.textInputContainer,
          ]}
        />
      </View>
      <View style={tw`w-4/5 mx-auto`}>
        <Text style={tw`text-gray-800 my-2 text-lg font-extralight`}>
          Password
        </Text>
        <TextInput
          secureTextEntry
          onChangeText={e => setUserUpDate({...userUpdate, user_password : e})}
          maxLength={20}
          placeholder="******"
          value={userUpdate.user_password}
          placeholderTextColor='black'
          style={[
            tw`bg-gray-300 w-72 p-3 rounded-xl`,
            styles.textInput,
            styles.textInputContainer,
          ]}
        />
      </View>
      <View style={tw`w-4/5 mx-auto`}>
        <Text style={tw`text-gray-800 my-2 text-lg font-extralight`}>
          new Password
        </Text>
        <TextInput
          secureTextEntry
          placeholder="******"
          value={userUpdate.newPassword}
          placeholderTextColor='black'
          onChangeText={e => setUserUpDate({...userUpdate, newPassword : e})}
          maxLength={20}
          style={[
            tw`bg-gray-300 w-72 p-3 rounded-xl`,
            styles.textInput,
            styles.textInputContainer,
          ]}
        />
      </View>
      <TouchableOpacity
       style={tw`w-80 mx-auto bg-black p-1 rounded-xl mt-6`}
       onPress={setUserDetails}
       >
        <Text style={tw`text-lg font-semibold text-white text-center p-1`}>
          UPDATE PROFILE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
    fontStyle:'italic',
  },
  textInputContainer: {
    paddingHorizontal: 20,
  },

});
