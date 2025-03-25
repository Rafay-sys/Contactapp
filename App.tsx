// import { Button, StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import Todo from './src/screen/Todo';
// import Mytodo from './src/screen/Mytodo';
// const App = () => {


//   useEffect(()=>{
//     getData()
//   },[])
//   const [firestoreData,setFirestoreData] = useState([])
//   const getData = async()=>{
//     const data = firestore().collection('Users').doc('ABC')
//     const json = await data.get()
//     console.log(data)
    
//     console.log(json._data)
//     setFirestoreData(json._data)
//   }

//   const addData = async() =>{
//    const response = await firestore().collection('Users').add({
//       name: 'Rafay',
//       age: 30,
//     });
//     console.log(response)
//   }

//   const update = async() =>{
//     const response = await firestore().collection('Users').doc('ABC').set({
//        name: 'Rafay',
//        age: 31,
//      });
//      console.log(response)
//    }


//    const createAccount = ()=>{
//     auth()
//   .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
//   .then(() => {
//     console.log('User account created & signed in!');
//   })
//   .catch(error => {
//     if (error.code === 'auth/email-already-in-use') {
//       console.log('That email address is already in use!');
//     }

//     if (error.code === 'auth/invalid-email') {
//       console.log('That email address is invalid!');
//     }

//     console.error(error);
//   });
//    }

//   return (

// <View style={{flex:1}}>
//   <Text>{firestoreData?.name}</Text>
//   <Text>{firestoreData?.age}</Text>

//   <Button onPress={update} title='Save Data'/>
//   <Button onPress={createAccount} title='Create User'/>


// </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({})
// // import { StyleSheet, Text, View } from 'react-native'
// // import React from 'react'
// // import Geolocation from '@react-native-community/geolocation';
// // Geolocation.getCurrentPosition(info => console.log(info));

// // const App = () => {
// //   return (
// //     <View>
// //     <Text></Text>
// //     </View>
// //   )
// // }

// // export default App

// // const styles = StyleSheet.create({})
// import { ImageBackground, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import StackNavigator from './src/navigation/Stacknavigator'

// const App = () => {
//   return (
//     <NavigationContainer>
//       <StackNavigator/>
//     </NavigationContainer>
 
//   )
// }

// export default App

// const styles = StyleSheet.create({})
// import React from 'react';
// import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons'


// });
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import firestore from '@react-native-firebase/firestore';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const ChatScreen = () => {
//   const [chats, setChats] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const unsubscribe = firestore()
//       .collection('Users')
//       .onSnapshot(snapshot => {
//         const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setChats(users);
//       });
//     return () => unsubscribe();
//   }, []);

//   const filteredChats = chats.filter(chat => 
//     chat.name && chat.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="gray" />
//         <TextInput 
//           placeholder="Search Chat" 
//           style={styles.searchInput} 
//           value={searchQuery} 
//           onChangeText={setSearchQuery} 
//         />
//         <Ionicons name="scan-outline" size={24} color="gray" />
//       </View>

//       <View style={styles.tabs}>
//         <Text style={styles.activeTab}>Chats</Text>
//         <Text style={styles.inactiveTab}>Friends</Text>
//         <Text style={styles.inactiveTab}>Calls</Text>
//       </View>

//       <FlatList
//         data={filteredChats}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.chatItem}>
//             <Image source={{ uri: item.avatar || 'https://via.placeholder.com/50' }} style={styles.avatar} />
//             <View style={styles.chatContent}>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.message}>{item.message}</Text>
//             </View>
//             <View style={styles.chatMeta}>
//               <Text style={styles.time}>{item.time}</Text>
//               {item.unread && <View style={styles.unreadBadge}><Text style={styles.unreadText}>{item.unread}</Text></View>}
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const HomeScreen = () => <ChatScreen />;
// const AddScreen = () => <View style={styles.screen}><Text>Add Contact</Text></View>;
// const SettingsScreen = () => <View style={styles.screen}><Text>Settings</Text></View>;

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator screenOptions={{ headerShown: false }}>
//         <Tab.Screen 
//           name="Home" 
//           component={HomeScreen} 
//           options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} 
//         />
//         <Tab.Screen 
//           name="Add" 
//           component={AddScreen} 
//           options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person-add-outline" size={size} color={color} /> }} 
//         />
//         <Tab.Screen 
//           name="Settings" 
//           component={SettingsScreen} 
//           options={{ tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} /> }} 
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: 'white', padding: 10 },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f2f2f2',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginBottom: 10,
//   },
//   searchInput: { flex: 1, marginLeft: 10 },
//   tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
//   activeTab: { fontWeight: 'bold', color: 'purple', textDecorationLine: 'underline' },
//   inactiveTab: { color: 'gray' },
//   chatItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     marginBottom: 8,
//     borderWidth: 2,
//     borderColor: 'purple',
//     borderRadius: 10,
//   },
//   avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
//   chatContent: { flex: 1 },
//   name: { fontWeight: 'bold', fontSize: 16 },
//   message: { color: 'gray' },
//   chatMeta: { alignItems: 'flex-end' },
//   time: { color: 'gray' },
//   unreadBadge: { backgroundColor: 'purple', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
//   unreadText: { color: 'white', fontWeight: 'bold' },
//   screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });

// export default AppNavigator;




import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigator from './src/navigation/Stacknavigator'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
      </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})