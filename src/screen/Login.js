import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import uuid from 'react-native-uuid'
import firestore, { collection } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()
    const Accountlogin = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('Signed in succesfully')
                loginuser()
                navigation.navigate('BOTTOM')
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    Alert.alert('No user found')
                }
                else if (error.code === 'auth/wrong-password') {
                    Alert.alert('Incorrect password')
                }
                else if (error.code === 'auth/invalid-email') {
                    Alert.alert('Invalid email adress')
                }
                else {
                    Alert.alert('Login failed', error.message)
                }
                console.error(error)
            })
    }
    const loginuser = () => {
        firestore().collection('User').
            where('email', '==', email)
            .get()
            .then(res => {
                if (!res.empty) {
                    console.log(JSON.stringify(res.docs[0].data()))
                    gotonext(res.docs[0].data().name,
                    res.docs[0].data().email,
                    res.docs[0].data().userid
                )
                } else (
                    Alert.alert('User not found')
                )
          })
}

const gotonext = async (name,email,userid)=>{
await AsyncStorage.setItem('NAME',name),
    await AsyncStorage.setItem('EMAIL',email),
    await AsyncStorage.setItem('USERID',userid)
navigation.navigate('BOTTOM')
}
useEffect(()=>{
  checkLogin()
},[])
const checkLogin= async ()=>{
    const id = await AsyncStorage.getItem('USERID')
    if (id !== null){
        navigation.navigate('BOTTOM')
    }else (
        navigation.navigate('LOGIN')
    )
}
    return (
        <View style={styles.header}>
            <ImageBackground style={styles.img} source={require('../assets/img.png')} />


            <View style={styles.view}>
                <TouchableOpacity style={styles.touch} onPress={() => navigation.goBack()} >
                    <Icon name='arrowleft' size={30} />
                </TouchableOpacity>
                <Text style={styles.Text}>Hello! Welcome back</Text>
                <Text style={styles.text}>
                    Happy to see you again , to use{'\n'}  your account please Login first
                </Text>
                <Text style={[styles.text, { marginTop: 57, paddingHorizontal: 20 }]}>Email Address</Text>
                <TextInput style={styles.input}
                    placeholder=""
                    value={email}
                    onChangeText={setEmail} />
                <Text style={[styles.text, { marginTop: 30, paddingHorizontal: 20 }]}>password</Text>
                <TextInput style={styles.input}
                    placeholder=""
                    value={password}
                    onChangeText={setPassword} />
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={Accountlogin} >
                    <Text style={styles.Textt}>Login</Text>
                </TouchableOpacity>

                <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>Or Login with</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.Icons}>
                    <TouchableOpacity>
                        <FontAwesome name="google" size={28} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="apple" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="facebook-square" size={28} color="blue" />
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 17 }}>Dont have a account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SIGN')}>
                        <Text style={{ fontSize: 17, color: '#771F98',paddingHorizontal:8 }}>Register now</Text>
                    </TouchableOpacity>
                </View>
            </View>



        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row'
    },
    view: {
        flex: 1,
        paddingHorizontal: 10

    },
    img: {
        position: 'absolute',
        right: 0,
        width: 130,
        height: 200,
        resizeMode: 'cover',
        marginTop: 43,
    }
    , touch: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        marginTop:10
        
    },
    Text: {
        fontSize: 25,
        fontFamily: 'Poppins-Bold',
        marginTop: 15
    },
    text: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    },
    input: {
        borderWidth: 1,
        color: 'grey',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
        padding: 15,
        height: 50
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        color: '#993F3F',
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 20
    },
    line: {
        flex: 1,
        height: 1.3,
        backgroundColor: 'gray',
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray',
    },
    Icons: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 50,
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
    Textt: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',

    },
})
