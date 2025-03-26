import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { StyleSheet, Text, View } from 'react-native'


const App = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])
  return (
    <View>
        <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import StackNavigator from './src/navigation/Stacknavigator'
// import { NavigationContainer } from '@react-navigation/native'
// // // const styles = StyleSheet.create({})
// const App = () => {
//   return (
//     <NavigationContainer>
//       <StackNavigator/>
//       </NavigationContainer>
//   )
// }

// export default App

// const styles = StyleSheet.create({})
// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect } from 'react'

// const App = () => {
//   const Callapi = async () =>{

  
//   const api = await fetch ('https://api.alquran.cloud/v1/quran')
//   const response = await api.json()
//   console.log(response)
//   }
//   useEffect(()=>{
//     Callapi()
//   },[])
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({})