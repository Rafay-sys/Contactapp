import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Chat from '../screen/Chat'
import Friends from '../screen/Friends'
import Calls from '../screen/Calls'

const Tabnavigator = () => {
    const Tab = createMaterialTopTabNavigator()
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle:{fontSize:20,fontFamily:'Poppins-Medium'},
    
    tabBarInactiveTintColor:'grey',tabBarActiveTintColor:'#771F98',
  
      tabBarIndicatorStyle: { backgroundColor: 'grey', height: 1.5 }
       
    ,}}>
                <Tab.Screen name='CHAT' component={Chat} />
                <Tab.Screen name='FRIENDS' component={Friends} />
                <Tab.Screen name='CALLS' component={Calls} />

      
        

    </Tab.Navigator>
  )
}

export default Tabnavigator

const styles = StyleSheet.create({})
