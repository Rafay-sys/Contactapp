import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore, { doc, onSnapshot }  from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

const Chat = () => {
  const navigation = useNavigation()
  const [user,setUser]=useState([])
  const [userid,SetUserid]=useState(null)
  useEffect(()=>{
getUsers()
getuserid()
  },[])
  const getUsers=async ()=>{
  const email = await AsyncStorage.getItem('EMAIL')
  
  
  if (!email) {
    console.log('No email found in AsyncStorage');
    return;
  }

   await    firestore().collection('User').where('email','!=',email)
 .onSnapshot((querysnapshot)=>{
  if (!querysnapshot.empty){
    const userlist = querysnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id, 
    }));
    setUser(userlist)
    console.log("User List:", userlist);
  }
 })

  
   
  
}
const getuserid = async ()=>{
  const id = AsyncStorage.getItem('USERID')
  SetUserid(id)

}

  return (
    <View style={{backgroundColor:'#fff',flex:1}}>
      <FlatList 
      data={user}
      renderItem={({item})=>{
        return(
          <TouchableOpacity onPress={()=>navigation.navigate('MESSAGE', {users:item,id:userid})}>
          <View style={styles.view}>
<Image source={require('../assets/default.png')} style={styles.img}   />
<Text style={styles.Text}>{item?.name}</Text>
          </View>
          </TouchableOpacity>
        )
      }}  />
      
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  view:{
    width:'90%',
    height:75,
    borderWidth:1.5,
    alignSelf:'center',
    marginTop:10,
    borderColor:'#771F98',
    borderRadius:10,
    flexDirection:"row"
  },
  img:{
    width:60,
    height:60,
    borderRadius:30,
    alignSelf:'center',
    margin:10
  },
  Text:{
    fontSize:20,
    textAlign:'center',
    fontFamily:'Poppins-SemiBold'
  }
})
