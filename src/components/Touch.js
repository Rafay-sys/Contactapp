import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Touch = () => {
    const navigation= useNavigation()
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={Accountlogin} >
                      <Text style={styles.Text}>Login</Text>
                  </TouchableOpacity>
    </View>
  )
}

export default Touch

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#771F98',
        borderRadius: 15,
        width: '90%',
        margin: 20,
        marginBottom: 50,
        padding:10,
        alignSelf:'center'
    },
    Text: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',

    },
})