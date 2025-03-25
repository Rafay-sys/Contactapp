import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import uuid from 'react-native-uuid'
import firestore from '@react-native-firebase/firestore';
const Sign = () => {
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const navigation = useNavigation()
    const Accountlogin = () => {
        if (!email || !password || !name || !number) {
            Alert.alert('Error', 'Please fill all fields before signing up');
            return;
        }

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('user acoount created  ')
                Registeruser()
                navigation.navigate('LOGIN')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email adress is already in use!')
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('That email adress is invalid')
                }
                console.error(error)
            })
        const Registeruser = async () => {
            const userid = uuid.v4()
            await firestore().collection('User').doc(userid).set({
                name: name,
                number: number,
                email: email,
                password: password,
                userid: userid
            }).then(res => {
                console.log('User created')
            })
                .catch(error => {
                    console.log(error)
                })

        }
    }

    return (
        <ImageBackground style={styles.main} source={require('../assets/pic.png')}>
            <View style={styles.overlay}>
                <Text style={styles.Textt}>
                    Welcome! Create your Account to get Started
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
                    value={number}
                    onChangeText={setNumber} />
                <Text style={[styles.text, { marginTop: 10, paddingHorizontal: 20 }]}>Enter Password</Text>
                <TextInput style={styles.input}
                    placeholder=""
                    value={password}
                    onChangeText={setPassword} />
                <TouchableOpacity style={styles.button} onPress={Accountlogin} >
                    <Text style={styles.Text}>Register</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: 17 }}>Already have a account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LOGIN')}>
                        <Text style={{ fontSize: 17, color: '#771F98' }}>Login now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Sign

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