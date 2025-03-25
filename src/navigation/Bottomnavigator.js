import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../screen/Main';
import Add from '../screen/Add';
import Seting from '../screen/Seting';
import Icon from 'react-native-vector-icons/Octicons'
import Icons from 'react-native-vector-icons/Ionicons'

const Bottomnavigator = () => {
  const Bottom = createBottomTabNavigator()
  return (
    <Bottom.Navigator screenOptions={{
      headerShown: (false),
      tabBarStyle: { height: 70, width: '100%', backgroundColor: '#fff', paddingBottom: 20 }, tabBarItemStyle: {

      }, tabBarShowLabel: (false)
    }}>
      <Bottom.Screen



        name='HOME' component={Main} options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.View}>
              <Icon name="home" size={40} color={focused ? '#771F98' : 'gray'} />
            </View>
          ),
        }}
      />
      <Bottom.Screen name='ADD' component={Add}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.View}>
              <Icon name="person-add" size={40} color={focused ? '#771F98' : 'gray'} />
            </View>
          ),
        }} />
      <Bottom.Screen name='SETTING' component={Seting}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.View}>
              <Icons name="settings-outline" size={40} color={focused ? '#771F98' : 'gray'} />
            </View>
          ),
        }} />

    </Bottom.Navigator>
  )
}

export default Bottomnavigator

const styles = StyleSheet.create({
  View: {
    width: 100,
    height: 70,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: "flex-end"
  }

})