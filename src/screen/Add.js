import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import uuid from 'react-native-uuid'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Add = () => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const navigation = useNavigation()
  const Accountlogin = async () => {
    if (!email || !name || !password) {
      Alert.alert('Error', 'Please fill all fields before signing up');
      return;
    }
try{
    const Registeruser = await auth()
      .createUserWithEmailAndPassword(email, password)
    const user = Registeruser.user
    const userid = uuid.v4()
    await firestore().collection('User').doc(userid).set({
      name: name,
      number: password,
      email: email,
      userid: userid
    })
    navigation.goBack()
    Alert.alert('User created sucessfully')
  //   await AsyncStorage.setItem('NAME', name),
  //     await AsyncStorage.setItem('EMAIL', email),
  //     await AsyncStorage.setItem('USERID', userid)
      
  // const savedName = await AsyncStorage.getItem('NAME');
  // const savedEmail = await AsyncStorage.getItem('EMAIL');
  // const savedUserId = await AsyncStorage.getItem('USERID');
  // console.log("Saved Name:", savedName);
  // console.log("Saved Email:", savedEmail);
  // console.log("Saved User ID:", savedUserId)



  }
    catch (error){
    console.error(error) 
  if (error.code === 'auth/email-already-in-use') {
    Alert.alert('That email adress is already in use!')
  }
  else if (error.code === 'auth/invalid-email') {
    Alert.alert('That email adress is invalid')
  }
  else {
    Alert.alert('Error', 'Something went wrong. Please try again.');
}
    }
    }
  

return (
  <ImageBackground style={styles.main} source={require('../assets/pic.png')}>
    <View style={styles.overlay}>
      <Text style={styles.Textt}>
        Add your Contacts Here
      </Text>
      <Text style={[styles.text, { marginTop: 30, paddingHorizontal: 20 }]}>Enter Name</Text>
      <TextInput style={styles.input}
        placeholder=""
        value={name}
        onChangeText={setName} />
      <Text style={[styles.text, { marginTop: 10, paddingHorizontal: 20 }]}>Email Address</Text>
      <TextInput style={styles.input}
        placeholder=""
        value={email}
        onChangeText={setEmail} />
      <Text style={[styles.text, { marginTop: 10, paddingHorizontal: 20 }]}>Mobile Number</Text>
      <TextInput style={styles.input}
        placeholder=""
        value={password}
        onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={Accountlogin} >
        <Text style={styles.Text}>Add</Text>
      </TouchableOpacity>

    </View>
  </ImageBackground>
)
}

export default Add

const styles = StyleSheet.create({
  main: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: 500

  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(240, 216, 238, 0.62)', // Slight white overlay for better visibility
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold'

  },
  input: {
    borderWidth: 1.5,
    color: 'grey',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 15,
    height: 50,
    backgroundColor: 'white'

  },
  button: {
    backgroundColor: '#771F98',
    borderRadius: 15,
    width: '90%',
    margin: 20,
    marginBottom: 50,
    padding: 10,
    alignSelf: 'center'
  },
  Text: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',

  },
  Textt: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    marginTop: 80
  },
}) 