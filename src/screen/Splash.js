import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
const Splash = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{margin:20}}>
            <Text style={styles.main}>Get Closer To{'\n'}Everyone</Text>
            <Text style={styles.text}>Help you to contact everyone with{'\n'} just easy way</Text> 
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       
                <Onboarding
                    showSkip={false}
                    showNext={false}
                    showDone={false}
                    bottomBarHeight={1}
                    bottomBarColor="white"
                    pages={[
                        {
                            backgroundColor: '#fff',

                            image: <Image style={{ width: 400, height: 350, alignSelf: 'center', resizeMode: 'contain', marginBottom: 200 }} source={require('../assets/avatar.png')} />,

                        },
                        {
                            backgroundColor: '#fff',
                            image:  <LottieView
                            source={require('../assets/animation/animation.json')} 
                            autoPlay
                            loop
                            style={styles.animation}
                          />,

                        },
                        {
                            backgroundColor: '#fff',
                            image:  <LottieView
                            source={require('../assets/animation/animations.json')} 
                            autoPlay
                            loop
                            style={styles.animation}
                          />,

                        },
                        {
                            backgroundColor: '#fff',
                            image:  <LottieView
                            source={require('../assets/animation/animation.json')} 
                            autoPlay
                            loop
                            style={styles.animation}
                          />,

                        },
                    ]}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('LOGIN')}>
                <Text style={styles.Text}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    main: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color:'black'
        
    },
    button: {
        backgroundColor: '#771F98',
        borderRadius: 15,
        width: '80%',
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
    text:{
        fontSize:20,
        fontFamily:'Popins-Regular'
    },
    animation: {
        width: 200,
        height: 200,
        marginBottom:200,
        alignSelf:'center',
        resizeMode:'contain',
        
      }
})