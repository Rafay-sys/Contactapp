import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Tabnavigator from '../navigation/Tabnavigator'
import Icon from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Main = () => {
  
const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared!');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <View style={styles.View}>

          <Icon name='search1' size={28} color='#252525' />
          <TextInput style={styles.text}
            placeholder='Search Chat' />
        </View>
        <TouchableOpacity style={styles.touch} onPress={clearAsyncStorage}>
          <Icons name='line-scan' size={30} color='black' />
        </TouchableOpacity>
      </View>

      <Tabnavigator/>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {

    flex: 1,
     backgroundColor: '#fff',
  },
  text: {
    fontSize: 23,
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#F1F1F1',
    padding: 5,
    paddingHorizontal:10,
    paddingTop:10


  },
  View: {
    flexDirection: 'row',
    alignItems: 'center',
   backgroundColor: '#F1F1F1',
    width: '80%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 14,
    paddingHorizontal: 15,
   
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    alignItems: 'center',
   margin:20,
    marginTop: 40,
  },
  touch:{
    backgroundColor:'#F1F1F1',
    padding:8,
    borderRadius:10
  }

})