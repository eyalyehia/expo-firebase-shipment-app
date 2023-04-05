import { Text, View , ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React from 'react'

const Loading = ({ styling }) => {
  return (
    <View style={tw`${styling}`}>
      <ActivityIndicator  size="large" />
      <Text style={tw`mt-4 text-xl font-semibold`}>program in process...</Text>
    </View>
  )
}

export default Loading