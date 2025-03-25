import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Splash from '../screen/Splash'
import Login from '../screen/Login'
import Sign from '../screen/Sign'
import Main from '../screen/Main'
import Bottomnavigator from './Bottomnavigator'
import Message from '../screen/Message'

const StackNavigator = () => {
  const Stack = createNativeStackNavigator()
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
 <Stack.Screen name='SPLASH' component={Splash}/>
 <Stack.Screen name='LOGIN' component={Login}/>
 <Stack.Screen name='SIGN' component={Sign}/>
  <Stack.Screen name='BOTTOM' component={Bottomnavigator}/>
  <Stack.Screen name='MESSAGE' component={Message}/>
  </Stack.Navigator>




  )
}

export default StackNavigator

const styles = StyleSheet.create({})


// {logedin ? (
//   <Stack.Screen name="Mytodo" component={Mytodo} />
// ) : (
//   <>
//     <Stack.Screen name="Signin" component={Signin} />
//     <Stack.Screen name="Login" component={Login} />
//     <Stack.Screen name="Todo" component={Todo} />
//   <Stack.Screen name="Mytodo" component={Mytodo} />

//   </>
// )}
// const [logedin,setLogedin]=useState(false)
// const Stack = createNativeStackNavigator()
// useEffect(() => {
//   const checkLoginStatus = async () => {
//     const isLoggedIn = await AsyncStorage.getItem('@LOGIN')
//     setLogedin(isLoggedIn === 'true')
//   };
//   checkLoginStatus()
// }, [])